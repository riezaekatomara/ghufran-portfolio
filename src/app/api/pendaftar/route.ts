import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, email, telepon, paket_id, jumlah, catatan } = body;

    if (!paket_id) {
      return NextResponse.json(
        { error: "paket_id wajib diisi" },
        { status: 400 }
      );
    }

    // 1. cari atau buat user berdasarkan email
    let { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (!user) {
      const { data: newUser, error: userError } = await supabase
        .from("users")
        .insert([
          {
            name: nama,
            email,
            password: "default123", // nanti bisa diganti Supabase Auth
            role: "user",
          },
        ])
        .select("id")
        .single();

      if (userError || !newUser) {
        console.error("User insert error:", userError);
        return NextResponse.json(
          { error: "Gagal membuat user" },
          { status: 500 }
        );
      }
      user = newUser;
    }

    // 2. insert ke tabel pendaftar
    const { data: pendaftar, error: insertError } = await supabase
      .from("pendaftar")
      .insert([
        {
          user_id: user.id,
          paket_id: paket_id,
          status: "pending",
          payment_id: null,
        },
      ])
      .select("id")
      .single();

    if (insertError || !pendaftar) {
      console.error("Supabase error:", insertError);
      return NextResponse.json(
        { error: "Gagal menyimpan pendaftar" },
        { status: 500 }
      );
    }

    // 3. insert ke tabel pendaftar_detail
    const { error: detailError } = await supabase
      .from("pendaftar_detail")
      .insert([
        {
          pendaftar_id: pendaftar.id,
          telepon,
          jumlah,
          catatan,
        },
      ]);

    if (detailError) {
      console.error("Supabase error (detail):", detailError);
      return NextResponse.json(
        { error: "Gagal menyimpan detail pendaftar" },
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
