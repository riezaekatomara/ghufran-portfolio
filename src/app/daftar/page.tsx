"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DaftarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paketId = searchParams.get("paket_id");

  const [paket, setPaket] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paketId) return;
    supabase
      .from("paket")
      .select("id, title, bulan, price")
      .eq("id", paketId)
      .single()
      .then(({ data, error }) => {
        if (!error) setPaket(data);
      });
  }, [paketId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      nama: formData.get("nama"),
      email: formData.get("email"),
      telepon: formData.get("telepon"),
      jumlah: formData.get("jumlah"),
      catatan: formData.get("catatan"),
      paket_id: paket?.id, // ✅ kirim id, bukan slug
    };

    try {
      const res = await fetch("/api/pendaftar", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/daftar/success");
      } else {
        setError("Gagal menyimpan data. Coba lagi.");
      }
    } catch (err) {
      console.error("Error submit:", err);
      setError("Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Formulir Pendaftaran Umroh
      </h1>

      {paket && (
        <div className="mb-6 p-4 rounded bg-gray-50 border">
          <p>
            <strong>Paket:</strong> {paket.title} ({paket.bulan})
          </p>
          <p>
            <strong>Harga:</strong> Rp {Number(paket.price).toLocaleString()}
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama Lengkap</label>
          <input
            type="text"
            name="nama"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Nomor HP/WA</label>
          <input
            type="text"
            name="telepon"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Jumlah Jamaah</label>
          <input
            type="number"
            name="jumlah"
            required
            min={1}
            defaultValue={1}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Catatan Tambahan</label>
          <textarea
            name="catatan"
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-xl bg-primary text-primary-foreground"
        >
          {loading ? "Menyimpan..." : "Daftar Sekarang"}
        </button>
      </form>
    </main>
  );
}
