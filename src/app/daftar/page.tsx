"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function DaftarPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paketBulan = searchParams.get("bulan") || "";
  const paketSlug = searchParams.get("paket") || "";

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [catatan, setCatatan] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/pendaftar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama,
        email,
        telepon,
        paket_bulan: paketBulan,
        paket_slug: paketSlug,
        jumlah,
        catatan,
      }),
    });

    if (res.ok) {
      router.push("/daftar/success"); // ✅ redirect ke halaman sukses
    } else {
      alert("Gagal menyimpan data. Coba lagi.");
    }
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Formulir Pendaftaran</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block mb-1 font-medium">Nama Lengkap</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Nomor HP/WA</label>
          <input
            type="text"
            value={telepon}
            onChange={(e) => setTelepon(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Jumlah Jamaah</label>
          <input
            type="number"
            min={1}
            value={jumlah}
            onChange={(e) => setJumlah(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Catatan</label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-primary text-primary-foreground"
        >
          Daftar Sekarang
        </button>
      </form>
    </main>
  );
}
