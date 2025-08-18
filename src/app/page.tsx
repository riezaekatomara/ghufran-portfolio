"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import RippleButton from "@/components/RippleButton"; // 🔥 ripple button

import { paketBulanan } from "@/lib/pricing";

export default function Home() {
  // tampilkan 4 paket bulan di halaman utama
  const paketEmpat = paketBulanan.slice(0, 4);

  return (
    <main className="min-h-dvh">
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Paket Umrah 2025
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paketEmpat.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.15,
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow:
                  "0px 8px 24px rgba(0,0,0,0.15), 0px 4px 12px rgba(0,0,0,0.1)",
              }}
              className="rounded-2xl border p-5 shadow-sm bg-card transition-all duration-300"
            >
              <motion.img
                src={p.gambar}
                alt={p.nama}
                className="w-full h-48 object-cover rounded-xl mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              <h3 className="text-lg font-semibold">{p.nama}</h3>

              <div className="mt-4 flex gap-2">
                <RippleButton>
                  <Link href={`/paket/${p.slug}`}>Lihat Detail</Link>
                </RippleButton>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
