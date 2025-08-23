import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

type MidtransNotification = {
  transaction_time: string;
  transaction_status:
    | "capture"
    | "settlement"
    | "pending"
    | "deny"
    | "expire"
    | "cancel"
    | "failure"
    | "refund"
    | "partial_refund"
    | "authorize"
    | "chargeback";
  transaction_id: string;
  status_code: string;
  signature_key: string;
  payment_type: string;
  order_id: string;
  gross_amount: string;
  fraud_status?: "accept" | "challenge" | "deny";
  va_numbers?: Array<{ bank: string; va_number: string }>;
  permata_va_number?: string;
  biller_code?: string;
  bill_key?: string;
  acquirer?: string;
  store?: string;
};

function computeSignature(
  order_id: string,
  status_code: string,
  gross_amount: string,
  serverKey: string
) {
  const raw = order_id + status_code + gross_amount + serverKey;
  return crypto.createHash("sha512").update(raw).digest("hex");
}

function mapMidtransStatus(
  t: MidtransNotification
): "success" | "pending" | "failed" {
  const s = t.transaction_status;
  if (s === "capture") {
    // credit_card only
    if (t.fraud_status === "challenge") return "pending";
    return "success";
  }
  if (s === "settlement") return "success";
  if (s === "pending" || s === "authorize") return "pending";
  if (s === "deny" || s === "expire" || s === "cancel" || s === "failure")
    return "failed";
  // refund/partial_refund/chargeback -> anggap failed (atau bikin status sendiri)
  return "failed";
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MidtransNotification;

    const {
      MIDTRANS_SERVER_KEY,
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

    // Verifikasi signature
    const expected = computeSignature(
      body.order_id,
      body.status_code,
      body.gross_amount,
      MIDTRANS_SERVER_KEY
    );
    if (expected !== body.signature_key) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const status = mapMidtransStatus(body);

    // Update Supabase
    const supabase = createClient(
      NEXT_PUBLIC_SUPABASE_URL!,
      NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const paymentInfo: any = {
      status,
      payment_type: body.payment_type,
      transaction_status: body.transaction_status,
      transaction_time: body.transaction_time,
      transaction_id: body.transaction_id,
      status_code: body.status_code,
      gross_amount: body.gross_amount,
      fraud_status: body.fraud_status || null,
      va_numbers: body.va_numbers ? JSON.stringify(body.va_numbers) : null,
      permata_va_number: body.permata_va_number || null,
      biller_code: body.biller_code || null,
      bill_key: body.bill_key || null,
      acquirer: body.acquirer || null,
      store: body.store || null,
      updated_at: new Date().toISOString(),
    };

    // Utama: update di tabel 'pendaftar' by order_id
    let { data: upd, error: updErr } = await supabase
      .from("pendaftar")
      .update(paymentInfo)
      .eq("order_id", body.order_id)
      .select("id,email,nama");

    // Fallback kalau tidak ada baris di 'pendaftar', coba 'pendaftar_detail'
    let recipientEmail: string | null = null;
    let recipientName: string | null = null;

    if (updErr || !upd || upd.length === 0) {
      const { data: upd2, error: updErr2 } = await supabase
        .from("pendaftar_detail")
        .update(paymentInfo)
        .eq("order_id", body.order_id)
        .select("id,email,nama");

      if (!updErr2 && upd2 && upd2.length > 0) {
        recipientEmail = upd2[0].email || null;
        recipientName = upd2[0].nama || null;
      }
    } else {
      recipientEmail = upd[0].email || null;
      recipientName = upd[0].nama || null;
    }

    // (Opsional) panggil internal /notify untuk kirim email
    if (APP_URL) {
      try {
        await fetch(`${APP_URL}/api/payment/notify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: body.order_id,
            status,
            email: recipientEmail,
            name: recipientName,
            payment_type: body.payment_type,
            gross_amount: body.gross_amount,
            transaction_time: body.transaction_time,
          }),
        });
      } catch (e) {
        console.warn("Notify call failed:", (e as any)?.message);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal error", detail: err?.message },
      { status: 500 }
    );
  }
}
