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

    // 1️⃣ Simpan data pendaftar ke Supabase dulu
    const { data, error } = await supabase
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
      .select("id") // supaya dapat id auto increment
      .single();

    if (error) {
      console.error("❌ Gagal insert pendaftar:", error);
      return NextResponse.json(
        { status: "error", message: "Gagal simpan data pendaftar" },
        { status: 500 }
      );
    }

    const orderId = data.id; // gunakan id pendaftar sebagai order_id

    // 2️⃣ Jika harga 0 atau null → manual (tanpa Midtrans)
    if (!grossAmount || grossAmount <= 0) {
      return NextResponse.json({
        status: "manual",
        message: "Harga dinamis, admin akan menghubungi Anda.",
        orderId,
      });
    }

    // 3️⃣ Setup Midtrans Snap
    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey: process.env.MIDTRANS_SERVER_KEY as string,
      clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
    });

    // 4️⃣ Parameter transaksi
    const parameter = {
      transaction_details: {
        order_id: orderId.toString(), // harus string
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: nama,
        email,
        phone: telepon,
      },
    };

    // 5️⃣ Buat transaksi Midtrans
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
