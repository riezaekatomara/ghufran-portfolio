// src/app/api/payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type CreatePaymentBody = {
  // kiriman dari client
  paketId: string;
  amount: number;
  quantity?: number;
  itemName: string;
  customer: {
    first_name: string;
    last_name?: string;
    email: string;
    phone?: string;
  };
  // optional: kalau kamu sudah buat pendaftar duluan dan punya id-nya
  pendaftarId?: string;
};

function getMidtransBaseUrl(isProd: boolean) {
  return isProd
    ? "https://app.midtrans.com"
    : "https://app.sandbox.midtrans.com";
}

export async function POST(req: NextRequest) {
  try {
    const {
      paketId,
      amount,
      quantity = 1,
      itemName,
      customer,
      pendaftarId,
    } = (await req.json()) as CreatePaymentBody;

    if (!amount || !itemName || !customer?.email) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const {
      MIDTRANS_SERVER_KEY,
      MIDTRANS_IS_PRODUCTION,
      APP_URL,
      NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY,
    } = process.env as Record<string, string>;

    if (!MIDTRANS_SERVER_KEY) {
      return NextResponse.json(
        { error: "Missing MIDTRANS_SERVER_KEY" },
        { status: 500 }
      );
    }

    const isProd = MIDTRANS_IS_PRODUCTION === "true";
    const baseUrl = getMidtransBaseUrl(isProd);

    // Init Supabase (anon key cukup kalau RLS diizinkan untuk insert/update pendaftar)
    const supabase = createClient(
      NEXT_PUBLIC_SUPABASE_URL!,
      NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Buat order_id yang unik
    const orderId = `GF-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const grossAmount = Math.round(amount); // Midtrans butuh integer

    // (Opsional) Catat "pendaftar" pending dulu kalau belum ada
    // Pastikan tabel & kolom sesuai schema kamu
    const insertPayload: any = {
      order_id: orderId,
      paket_id: paketId,
      email: customer.email,
      nama: [customer.first_name, customer.last_name].filter(Boolean).join(" "),
      jumlah: quantity,
      nominal: grossAmount,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    if (pendaftarId) insertPayload.id = pendaftarId;

    // Ganti 'pendaftar' ke tabel yang kamu pakai
    const { error: insertErr } = await supabase
      .from("pendaftar")
      .insert(insertPayload);
    if (insertErr) {
      // Kalau sudah ada record dengan order_id unique constraint, abaikan
      // atau fallback: update record existing agar idempotent
      console.warn("Insert pendaftar warning:", insertErr.message);
    }

    // Build payload ke Midtrans Snap
    const snapPayload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      item_details: [
        {
          id: paketId,
          price: grossAmount,
          quantity,
          name: itemName,
        },
      ],
      customer_details: {
        first_name: customer.first_name,
        last_name: customer.last_name || "",
        email: customer.email,
        phone: customer.phone || "",
      },
      credit_card: {
        secure: true,
      },
      callbacks: {
        // ini cuma halaman "finish" (setelah bayar), status final tetap dari webhook
        finish: `${APP_URL || ""}/daftar/success`,
      },
      // pastikan webhook ini juga terset di Midtrans Dashboard, tapi field ini menambah kejelasan
      notification_url: `${APP_URL || ""}/api/payment/notification`,
      expiry: {
        unit: "minutes",
        duration: 30,
      },
      enabled_payments: [
        "gopay",
        "shopeepay",
        "bank_transfer",
        "echannel",
        "qris",
        "credit_card",
      ],
    };

    const authHeader =
      "Basic " + Buffer.from(MIDTRANS_SERVER_KEY + ":").toString("base64");

    const resp = await fetch(`${baseUrl}/snap/v1/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(snapPayload),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Midtrans error:", errText);
      return NextResponse.json(
        { error: "Midtrans error", detail: errText },
        { status: 500 }
      );
    }

    const data = await resp.json();
    // data.token, data.redirect_url

    // Simpan token ke pendaftar (opsional)
    await supabase
      .from("pendaftar")
      .update({ snap_token: data.token, snap_redirect_url: data.redirect_url })
      .eq("order_id", orderId);

    return NextResponse.json({
      order_id: orderId,
      token: data.token,
      redirect_url: data.redirect_url,
      isProduction: isProd,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal error", detail: err?.message },
      { status: 500 }
    );
  }
}
