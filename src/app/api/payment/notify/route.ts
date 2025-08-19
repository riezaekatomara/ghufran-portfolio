import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id, transaction_status, fraud_status } = body;

    console.log("📩 Callback Midtrans:", body);

    let newStatus = "pending";
    if (
      transaction_status === "capture" ||
      transaction_status === "settlement"
    ) {
      newStatus = "lunas";
    } else if (
      transaction_status === "deny" ||
      transaction_status === "cancel" ||
      transaction_status === "expire"
    ) {
      newStatus = "failed";
    }

    // 🔹 1. Update status di Supabase
    const { data: pendaftar, error } = await supabase
      .from("pendaftar")
      .update({ status: newStatus })
      .eq("id", order_id)
      .select()
      .single();

    if (error || !pendaftar) {
      console.error("❌ Gagal update Supabase:", error);
      return NextResponse.json({ status: "error" }, { status: 500 });
    }

    // 🔹 2. Kalau sukses bayar → kirim email
    if (newStatus === "lunas") {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // ✉️ Email ke Jamaah
        await transporter.sendMail({
          from: `"Ghufran Travel" <${process.env.EMAIL_USER}>`,
          to: pendaftar.email,
          subject: "Konfirmasi Pembayaran Umroh",
          html: `
            <h2>Assalamu'alaikum ${pendaftar.nama},</h2>
            <p>Alhamdulillah, pembayaran Anda untuk paket <b>${pendaftar.paket_bulan} - ${pendaftar.paket_slug}</b> telah kami terima.</p>
            <p>Status: <b>LUNAS</b></p>
            <p>Terima kasih telah mempercayakan perjalanan umroh Anda bersama kami.</p>
            <br/>
            <p>Salam,</p>
            <p><b>Ghufran Travel</b></p>
          `,
        });

        // ✉️ Email ke Admin
        await transporter.sendMail({
          from: `"Ghufran Travel" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: "Pembayaran Baru Lunas",
          html: `
            <h2>📢 Ada pembayaran baru</h2>
            <p>Nama: <b>${pendaftar.nama}</b></p>
            <p>Email: ${pendaftar.email}</p>
            <p>Paket: ${pendaftar.paket_bulan} - ${pendaftar.paket_slug}</p>
            <p>Status: <b>LUNAS</b></p>
          `,
        });

        console.log("✅ Email konfirmasi berhasil terkirim");
      } catch (mailErr) {
        console.error("❌ Gagal kirim email:", mailErr);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("❌ Notify error:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
