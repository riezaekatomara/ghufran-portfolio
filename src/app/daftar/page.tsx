"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { paketList } from "@/lib/pricing";

export default function DaftarPage() {
  const searchParams = useSearchParams();
  const paketQuery = searchParams.get("paket") || "";

  const selectedPaket = paketList[paketQuery] || { nama: "", harga: 0 };

  const [values, setValues] = useState({
    nama: "",
    email: "",
    telepon: "",
    paket: selectedPaket.nama, // ✅ nama paket otomatis
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Kirim ke Google Sheets
      await fetch(process.env.NEXT_PUBLIC_SHEETS_WEBAPP_URL as string, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      // ✅ Buat transaksi Midtrans sesuai harga paket
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: "ORDER-" + Date.now(),
          grossAmount: selectedPaket.harga, // ✅ harga dinamis
          customerName: values.nama,
          customerEmail: values.email,
        }),
      });

      const data = await res.json();
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert("Pendaftaran berhasil, tapi tidak ada redirect Midtrans.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Form Pendaftaran Jamaah
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nama Lengkap</label>
          <input
            type="text"
            name="nama"
            value={values.nama}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">No. Telepon</label>
          <input
            type="tel"
            name="telepon"
            value={values.telepon}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Paket yang Dipilih</label>
          <input
            type="text"
            name="paket"
            value={values.paket}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 bg-gray-50"
            readOnly
          />
        </div>

        {selectedPaket.harga > 0 && (
          <p className="text-lg font-semibold text-center">
            Harga: Rp {selectedPaket.harga.toLocaleString("id-ID")}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          {loading ? "Memproses..." : "Daftar & Bayar"}
        </button>
      </form>
    </div>
  );
}
