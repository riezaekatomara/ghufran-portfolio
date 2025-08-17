import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, grossAmount, customerName, customerEmail } = body;

    // 🔹 1. Simpan data ke Google Sheets (pakai Web App URL dari Apps Script kamu)
    try {
      await fetch(process.env.GSHEET_WEBAPP_URL as string, {
        method: "POST",
        body: JSON.stringify({
          orderId,
          customerName,
          customerEmail,
          grossAmount,
          createdAt: new Date().toISOString(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (sheetErr) {
      console.error("Gagal simpan ke Google Sheets:", sheetErr);
    }

    // 🔹 2. Jika harga dinamis (0 / null) → tidak buat transaksi Midtrans
    if (!grossAmount || grossAmount <= 0) {
      return NextResponse.json({
        status: "manual",
        message: "Harga dinamis, admin akan menghubungi Anda.",
      });
    }

    // 🔹 3. Setup Midtrans Snap
    const snap = new midtransClient.Snap({
      isProduction: false, // Sandbox dulu
      serverKey: process.env.MIDTRANS_SERVER_KEY as string,
      clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
    });

    // 🔹 4. Parameter transaksi Midtrans
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: customerName,
        email: customerEmail,
      },
    };

    // 🔹 5. Buat transaksi Midtrans
    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      status: "ok",
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { status: "error", message: "Gagal memproses pendaftaran" },
      { status: 500 }
    );
  }
}
