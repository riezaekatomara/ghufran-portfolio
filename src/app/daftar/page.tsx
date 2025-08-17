"use client";

import { useState } from "react";
import { getPrice } from "@/lib/pricing";

export default function DaftarPage() {
  const [form, setForm] = useState({
    nama: "",
    whatsapp: "",
    email: "",
    paket: "",
  });
  const [loading, setLoading] = useState(false);
  const [harga, setHarga] = useState<number | null>(null);

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "paket") {
      setHarga(getPrice(value));
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: "ORDER-" + Date.now(),
          grossAmount: harga ?? 0,
          customerName: form.nama,
          customerEmail: form.email,
        }),
      });

      const data = await res.json();

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert("Gagal membuat transaksi");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const isPriced = harga !== null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Form Pendaftaran Jamaah
        </h1>

        <input
          type="text"
          name="nama"
          placeholder="Nama Lengkap"
          value={form.nama}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="Nomor WhatsApp"
          value={form.whatsapp}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <select
          name="paket"
          value={form.paket}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        >
          <option value="">-- Pilih Paket --</option>
          <option value="Umrah Plus Al Ula & Thaif">
            Umrah Plus Al Ula & Thaif - Rp 36.900.000
          </option>
          <option value="Umrah Hemat Pol">
            Umrah Hemat Pol (Harga Dinamis)
          </option>
        </select>

        {/* Info harga */}
        <div className="mt-2 text-sm text-gray-700">
          {isPriced ? (
            <p>Harga estimasi: Rp {harga?.toLocaleString("id-ID")}</p>
          ) : form.paket ? (
            <p>Harga dinamis, admin akan menghubungi Anda</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={loading || (!isPriced && form.paket !== "")}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading
            ? "Memproses..."
            : isPriced
            ? "Daftar & Bayar"
            : "Kirim Data"}
        </button>
      </form>
    </main>
  );
}
