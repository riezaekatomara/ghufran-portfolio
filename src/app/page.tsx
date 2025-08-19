"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { paketBulanan } from "@/lib/pricing";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Paket Umrah 2025
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paketBulanan.map((b, i) => (
            <motion.article
              key={b.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-2xl border p-5 shadow-sm bg-card"
            >
              <motion.img
                src={b.gambar}
                alt={b.nama}
                className="w-full h-48 object-cover rounded-xl mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <h3 className="text-lg font-semibold">{b.nama}</h3>
              <p className="text-sm mt-1">
                {b.paket.length} pilihan paket tersedia
              </p>

              <div className="mt-4">
                <Link
                  href={`/${b.slug}`}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                  Lihat Detail
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
