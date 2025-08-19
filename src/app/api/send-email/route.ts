import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, nama, paket, bulan } = body;

    // 🚀 Setup transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✉️ Kirim email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Konfirmasi Pendaftaran Umroh",
      html: `
        <h2>Assalamualaikum ${nama},</h2>
        <p>Terima kasih sudah mendaftar paket <b>${paket}</b> bulan <b>${bulan}</b>.</p>
        <p>Tim Ghufran Travel akan segera menghubungi Anda untuk konfirmasi lebih lanjut.</p>
        <br/>
        <p>Salam,</p>
        <p><b>Ghufran Travel</b></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal kirim email" },
      { status: 500 }
    );
  }
}
