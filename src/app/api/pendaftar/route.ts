import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// POST → simpan data pendaftar baru
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nama, email, telepon, paket_bulan, paket_slug, jumlah, catatan } =
      body;

    // simpan ke tabel `pendaftar`
    const { error } = await supabase.from("pendaftar").insert([
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
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Gagal menyimpan data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
