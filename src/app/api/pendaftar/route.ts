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

    // cek user
    let { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (!user) {
      const { data: newUser, error: userError } = await supabase
        .from("users")
        .insert([{ name: nama, email, password: "default123", role: "user" }])
        .select("id")
        .single();

      if (userError || !newUser) {
        return NextResponse.json(
          { error: "Gagal membuat user" },
          { status: 500 }
        );
      }
      user = newUser;
    }

    // insert pendaftar
    const { data: pendaftar, error: insertError } = await supabase
      .from("pendaftar")
      .insert([{ user_id: user.id, paket_id, status: "pending" }])
      .select("id")
      .single();

    if (insertError || !pendaftar) {
      return NextResponse.json(
        { error: "Gagal menyimpan pendaftar" },
        { status: 500 }
      );
    }

    // insert detail
    await supabase
      .from("pendaftar_detail")
      .insert([{ pendaftar_id: pendaftar.id, telepon, jumlah, catatan }]);

    // ✅ return data supaya bisa dipakai ke Midtrans
    return NextResponse.json({
      id: pendaftar.id,
      nama,
      email,
      telepon,
      jumlah,
      paket_id,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
