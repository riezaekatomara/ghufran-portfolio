"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { paketList } from "@/lib/pricing";
import { getHargaUtama } from "@/lib/utils";

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
              key={p.id}
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
              <p className="text-sm mt-1">Durasi: {p.durasi}</p>
              <p className="text-sm mt-1">
                Maskapai:{" "}
                {Array.isArray(p.maskapai) ? p.maskapai.join(", ") : p.maskapai}
              </p>
              <p className="text-sm mt-1">
                Tanggal:{" "}
                {Array.isArray(p.tanggal) ? p.tanggal.join(", ") : p.tanggal}
              </p>
              <p className="text-base font-medium mt-2">
                Harga mulai {getHargaUtama(p.harga)}
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/daftar?paket=${p.id}`}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                  Daftar
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
