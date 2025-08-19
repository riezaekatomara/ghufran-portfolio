import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Midtrans butuh body raw JSON → jangan diubah
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { order_id, transaction_status } = body;

    console.log("🔔 Notifikasi Midtrans:", body);

    // Tentukan status internal kita
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

    // Update ke Supabase
    const { error } = await supabase
      .from("pendaftar")
      .update({ status: newStatus })
      .eq("id", order_id); // pastikan order_id sama dengan kolom `id`

    if (error) {
      console.error("❌ Gagal update status Supabase:", error);
      return NextResponse.json({ status: "error", error }, { status: 500 });
    }

    return NextResponse.json({ status: "ok", message: "Notifikasi diterima" });
  } catch (error) {
    console.error("❌ Error di notification:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
