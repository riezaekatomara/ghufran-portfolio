import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { order_id, transaction_status, fraud_status } = body;

    console.log("🔔 Midtrans Notify:", body);

    // Midtrans status yang dianggap berhasil
    const successStatus = ["capture", "settlement"];

    if (successStatus.includes(transaction_status) && fraud_status !== "deny") {
      // update status di Supabase
      const { error } = await supabase
        .from("pendaftar")
        .update({ status: "lunas" })
        .eq("id", order_id); // order_id harus sama dengan id pendaftar

      if (error) {
        console.error("❌ Supabase update error:", error.message);
        return NextResponse.json(
          { status: "error", message: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({ status: "ok", message: "Pembayaran sukses" });
    }

    // kalau pending / deny / cancel → biarkan apa adanya
    return NextResponse.json({ status: "ok", message: "Notifikasi diterima" });
  } catch (err) {
    console.error("Notify error:", err);
    return NextResponse.json(
      { status: "error", message: "Gagal memproses notifikasi" },
      { status: 500 }
    );
  }
}
