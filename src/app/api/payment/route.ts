import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nama,
      email,
      telepon,
      paket_bulan,
      paket_slug,
      jumlah,
      catatan,
      grossAmount,
    } = body;

    // 🔹 1. Simpan data ke Supabase → status pending
    const { data: pendaftar, error } = await supabase
      .from("pendaftar")
      .insert([
        {
          nama,
          email,
          telepon,
          paket_bulan,
          paket_slug,
          jumlah,
          catatan,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error || !pendaftar) {
      console.error("❌ Gagal simpan pendaftar:", error);
      return NextResponse.json(
        { status: "error", message: "Gagal simpan data pendaftar" },
        { status: 500 }
      );
    }

    const orderId = pendaftar.id; // ✅ orderId = id dari Supabase

    // 🔹 2. Simpan juga ke Google Sheets (opsional)
    try {
      await fetch(process.env.GSHEET_WEBAPP_URL as string, {
        method: "POST",
        body: JSON.stringify({
          orderId,
          nama,
          email,
          grossAmount,
          paket_bulan,
          paket_slug,
          jumlah,
          createdAt: new Date().toISOString(),
        }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (sheetErr) {
      console.error("⚠️ Gagal simpan ke Google Sheets:", sheetErr);
    }

    // 🔹 3. Kalau harga tidak ada → manual follow-up
    if (!grossAmount || grossAmount <= 0) {
      return NextResponse.json({
        status: "manual",
        message: "Harga dinamis, admin akan menghubungi Anda.",
      });
    }

    // 🔹 4. Setup Midtrans Snap
    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey: process.env.MIDTRANS_SERVER_KEY as string,
      clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
    });

    // 🔹 5. Parameter transaksi Midtrans
    const parameter = {
      transaction_details: {
        order_id: orderId.toString(), // ✅ pakai id dari Supabase
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: nama,
        email,
        phone: telepon,
      },
    };

    // 🔹 6. Buat transaksi Midtrans
    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      status: "ok",
      redirect_url: transaction.redirect_url,
      orderId,
    });
  } catch (error) {
    console.error("❌ Payment error:", error);
    return NextResponse.json(
      { status: "error", message: "Gagal memproses pendaftaran" },
      { status: 500 }
    );
  }
}
