import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

type NotifyBody = {
  order_id: string;
  status: "success" | "pending" | "failed";
  email?: string | null;
  name?: string | null;
  payment_type?: string;
  gross_amount?: string;
  transaction_time?: string;
};

export async function POST(req: NextRequest) {
  try {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
      ADMIN_EMAIL,
      NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY,
    } = process.env as Record<string, string>;

    const body = (await req.json()) as NotifyBody;

    // Ambil info user dari DB kalau email/nama tidak dikirim
    let name = body.name || "";
    let email = body.email || "";

    if (!email) {
      const supabase = createClient(
        NEXT_PUBLIC_SUPABASE_URL!,
        NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: pend } = await supabase
        .from("pendaftar")
        .select("email,nama")
        .eq("order_id", body.order_id)
        .limit(1)
        .maybeSingle();

      if (pend) {
        email = pend.email || email;
        name = pend.nama || name;
      }
    }

    // Siapkan transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const subjectUser =
      body.status === "success"
        ? "Pembayaran Berhasil - Ghufran Travel"
        : body.status === "pending"
        ? "Menunggu Pembayaran - Ghufran Travel"
        : "Pembayaran Gagal/Dibatalkan - Ghufran Travel";

    const htmlUser = `
      <p>Assalamu'alaikum ${name || "Sahabat Ghufran"},</p>
      <p>Status pembayaran untuk Order <b>${
        body.order_id
      }</b>: <b>${body.status.toUpperCase()}</b>.</p>
      <ul>
        <li>Metode: ${body.payment_type || "-"}</li>
        <li>Jumlah: ${body.gross_amount || "-"}</li>
        <li>Waktu: ${body.transaction_time || "-"}</li>
      </ul>
      <p>Terima kasih telah mempercayakan perjalanan Anda kepada Ghufran Travel.</p>
    `;

    const htmlAdmin = `
      <p>Order <b>${
        body.order_id
      }</b> status: <b>${body.status.toUpperCase()}</b></p>
      <ul>
        <li>Nama: ${name || "-"}</li>
        <li>Email: ${email || "-"}</li>
        <li>Metode: ${body.payment_type || "-"}</li>
        <li>Jumlah: ${body.gross_amount || "-"}</li>
        <li>Waktu: ${body.transaction_time || "-"}</li>
      </ul>
    `;

    // Kirim email ke user (jika ada email)
    if (email) {
      await transporter.sendMail({
        from: SMTP_FROM || SMTP_USER,
        to: email,
        subject: subjectUser,
        html: htmlUser,
      });
    }

    // Kirim email ke admin
    if (ADMIN_EMAIL) {
      await transporter.sendMail({
        from: SMTP_FROM || SMTP_USER,
        to: ADMIN_EMAIL,
        subject: `[Admin] ${subjectUser} (${body.order_id})`,
        html: htmlAdmin,
      });
    }

    // (Opsional) Catat tracking
    try {
      const supabase = createClient(
        NEXT_PUBLIC_SUPABASE_URL!,
        NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      await supabase.from("tracking").insert({
        order_id: body.order_id,
        event: `payment_${body.status}`,
        meta: JSON.stringify({
          email,
          name,
          payment_type: body.payment_type,
          gross_amount: body.gross_amount,
          transaction_time: body.transaction_time,
        }),
        created_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn("Insert tracking failed:", (e as any)?.message);
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
