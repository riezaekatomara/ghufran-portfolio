"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { paketList, type Paket } from "@/lib/pricing";

/** Ambil angka dari string harga (contoh: "32,9 jt (Double)" atau "Rp 30.500.000") */
function parseHargaStringToNumber(h: string): number | null {
  const s = h.toLowerCase();

  // Cari token angka (mendukung "35,9" / "30.500.000" / "23,5")
  const m = s.match(/(\d{1,3}(?:[.,]\d{1,3})*(?:[.,]\d+)?)/);
  if (!m) return null;

  // Normalisasi: hapus titik ribuan, ubah koma ke titik
  const numStr = m[1].replace(/\./g, "").replace(",", ".");
  const base = parseFloat(numStr);
  if (isNaN(base)) return null;

  // Jika mengandung "jt" -> juta
  const isJuta = s.includes("jt");
  const amount = isJuta ? base * 1_000_000 : base;

  // Midtrans butuh integer Rupiah
  return Math.round(amount);
}

/** Ambil nominal (IDR) paling aman dari harga: minimal bila array */
function hargaToNumber(harga: Paket["harga"]): number | null {
  if (Array.isArray(harga)) {
    const parsed = harga
      .map(parseHargaStringToNumber)
      .filter((v): v is number => typeof v === "number");
    if (parsed.length === 0) return null;
    return Math.min(...parsed);
  }
  return parseHargaStringToNumber(harga);
}

export default function DaftarPage() {
  const searchParams = useSearchParams();
  const paketQuery = searchParams.get("paket") || "";

  // ✅ cari paket berdasarkan `id`
  const selectedPaket: Paket | null = useMemo(
    () => paketList.find((p) => p.id === paketQuery) ?? null,
    [paketQuery]
  );

  // Nominal untuk Midtrans (fallback 0 jika gagal parse)
  const grossAmount = useMemo(() => {
    if (!selectedPaket) return 0;
    const n = hargaToNumber(selectedPaket.harga);
    return n ?? 0;
  }, [selectedPaket]);

  const [values, setValues] = useState({
    nama: "",
    email: "",
    telepon: "",
    paket: selectedPaket?.nama ?? "", // tampilkan nama paket jika ada
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
      const sheetsUrl = process.env.NEXT_PUBLIC_SHEETS_WEBAPP_URL as
        | string
        | undefined;

      if (!sheetsUrl) {
        console.warn("NEXT_PUBLIC_SHEETS_WEBAPP_URL belum di-set");
      } else {
        await fetch(sheetsUrl, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
      }

      // ✅ Buat transaksi Midtrans (gunakan nominal hasil parsing)
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: "ORDER-" + Date.now(),
          grossAmount: grossAmount, // bisa 0 jika tidak ter-parse → akan tampil alert di bawah
          customerName: values.nama,
          customerEmail: values.email,
        }),
      });

      const data = await res.json();
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        // Jika nominal 0 atau sandbox bermasalah, beri info
        alert(
          "Pendaftaran berhasil dicatat. Namun pembayaran belum diarahkan. " +
            (grossAmount === 0
              ? "Nominal harga belum bisa diproses otomatis dari format harga. Silakan hubungi admin."
              : "Silakan coba lagi atau hubungi admin.")
        );
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

      {!selectedPaket ? (
        <div className="rounded-lg border p-4 bg-amber-50 text-amber-800">
          Paket tidak ditemukan. Silakan kembali ke halaman paket dan pilih
          ulang.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ringkasan paket */}
          <div className="rounded-xl border p-4 bg-muted/30">
            <div className="font-semibold">{selectedPaket.nama}</div>
            <div className="text-sm mt-1">
              Durasi: {selectedPaket.durasi} • Maskapai:{" "}
              {Array.isArray(selectedPaket.maskapai)
                ? selectedPaket.maskapai.join(", ")
                : selectedPaket.maskapai}
            </div>
            <div className="text-sm mt-1">
              Tanggal: {selectedPaket.tanggal.join(", ")}
            </div>
            <div className="text-sm mt-1">
              Landing:{" "}
              {Array.isArray(selectedPaket.landing)
                ? selectedPaket.landing.join(", ")
                : selectedPaket.landing || "-"}
            </div>
            <div className="text-sm mt-1">
              Harga:{" "}
              {Array.isArray(selectedPaket.harga)
                ? selectedPaket.harga.join(" • ")
                : selectedPaket.harga}
            </div>
            {grossAmount > 0 ? (
              <div className="mt-2 font-semibold">
                Estimasi ditagihkan: Rp {grossAmount.toLocaleString("id-ID")}
              </div>
            ) : (
              <div className="mt-2 text-amber-700">
                *Nominal otomatis belum bisa dipastikan dari format harga. Admin
                akan konfirmasi jumlah saat pembayaran.
              </div>
            )}
          </div>

          {/* Form data jamaah */}
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
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            {loading ? "Memproses..." : "Daftar & Lanjut Bayar"}
          </button>
        </form>
      )}
    </div>
  );
}
