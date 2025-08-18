"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Paket = {
  slug: string;
  nama: string;
  jadwal: string[];
  hotMakkah: string;
  hotMadinah: string;
  airlines: string[];
  bandara: string;
  hargaMulai?: number;
  sumber: string;
  gambar?: string;
};

const paketList: Paket[] = [
  {
    slug: "umrah-plus-al-ula-thaif",
    nama: "Umrah Plus Al Ula & Thaif",
    jadwal: ["06 Sep 2025", "21 Sep 2025", "06 Okt 2025"],
    hotMakkah: "Royal Majestic / setaraf",
    hotMadinah: "Sanabel / Le Meridien (setaraf)",
    airlines: ["Qatar Airways", "Oman Air"],
    bandara: "CGK – Soekarno-Hatta",
    hargaMulai: 30500000,
    sumber: "https://ghufrantravel.com/transaksi/paket-umrah",
    gambar: "/paket/umrah-plus-al-ula-thaif.jpg",
  },
  {
    slug: "umrah-hemat-pol",
    nama: "Umrah Hemat Pol",
    jadwal: ["Beberapa tanggal 2025–2026"],
    hotMakkah: "Grand Al Massa",
    hotMadinah: "Anshorul Madinah",
    airlines: ["Emirates", "Qatar Airways"],
    bandara: "CGK – Soekarno-Hatta",
    sumber:
      "https://ghufrantravel.com/transaksi/paket-umrah/detail/190/umrah-hemat-pol",
    gambar: "/paket/umrah-hemat-pol.jpg",
  },
];

function formatIDR(n?: number) {
  if (!n) return "Hubungi untuk harga terbaru";
  return n.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

export default function Home() {
  return (
    <main className="min-h-dvh">
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Paket Umrah Terbaru
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paketList.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow:
                  "0px 8px 24px rgba(0, 0, 0, 0.15), 0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              className="rounded-2xl border p-5 shadow-sm bg-card transition-all duration-300"
            >
              {p.gambar && (
                <motion.img
                  src={p.gambar}
                  alt={p.nama}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <h3 className="text-lg font-semibold">{p.nama}</h3>
              <p className="text-sm mt-1">Jadwal: {p.jadwal.join(", ")}</p>
              <p className="text-sm mt-1">
                Hotel: {p.hotMakkah} (Makkah) • {p.hotMadinah} (Madinah)
              </p>
              <p className="text-sm mt-1">Maskapai: {p.airlines.join(", ")}</p>
              <p className="text-sm mt-1">Bandara: {p.bandara}</p>
              <p className="text-base font-medium mt-2">
                {formatIDR(p.hargaMulai)}
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/paket/${p.slug}`}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                  Lihat Detail
                </Link>
                <a
                  href={p.sumber}
                  target="_blank"
                  className="px-4 py-2 rounded-xl border hover:bg-muted transition"
                >
                  Sumber Resmi
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
