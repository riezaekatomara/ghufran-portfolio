import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, grossAmount, customerName, customerEmail } = body;

    // 🔹 1. Simpan data ke Supabase
    const { error: dbError } = await supabase.from("pendaftar").insert([
      {
        id: orderId, // orderId = id unik (pakai timestamp / uuid)
        nama: customerName,
        email: customerEmail,
        paket_bulan: body.paketBulan,
        paket_slug: body.paketSlug,
        jumlah: body.jumlah,
        status: "pending",
      },
    ]);

    if (dbError) {
      console.error("Gagal simpan ke Supabase:", dbError);
    }

    // 🔹 2. Jika harga dinamis (0 / null) → skip Midtrans
    if (!grossAmount || grossAmount <= 0) {
      return NextResponse.json({
        status: "manual",
        message: "Harga dinamis, admin akan menghubungi Anda.",
      });
    }

    // 🔹 3. Setup Midtrans Snap
    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey: process.env.MIDTRANS_SERVER_KEY as string,
      clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
    });

    // 🔹 4. Parameter transaksi
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: customerName,
        email: customerEmail,
      },
      callbacks: {
        finish: `${process.env.APP_URL}/daftar/success`,
      },
    };

    // 🔹 5. Buat transaksi Midtrans
    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      status: "ok",
      redirect_url: transaction.redirect_url,
      token: transaction.token,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { status: "error", message: "Gagal memproses pendaftaran" },
      { status: 500 }
    );
  }
}
