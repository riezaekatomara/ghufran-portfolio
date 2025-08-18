"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import RippleButton from "@/components/RippleButton";

import { paketBulanan } from "@/lib/pricing";

export default function PaketBulananPage({
  params,
}: {
  params: { bulan: string };
}) {
  const bulan = paketBulanan.find((b) => b.slug === params.bulan);
  if (!bulan) return notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">{bulan.nama}</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bulan.paket.map((p, i) => (
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
              y: -6,
              scale: 1.02,
              boxShadow:
                "0px 8px 24px rgba(0,0,0,0.15), 0px 4px 12px rgba(0,0,0,0.1)",
            }}
            className="rounded-2xl border p-5 shadow-sm bg-card transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-2">{p.nama}</h3>
            <p className="text-sm">Durasi: {p.durasi}</p>
            <p className="text-sm">
              Harga: {Array.isArray(p.harga) ? p.harga.join(", ") : p.harga}
            </p>
            <p className="text-sm">
              Maskapai:{" "}
              {Array.isArray(p.maskapai) ? p.maskapai.join(", ") : p.maskapai}
            </p>
            <p className="text-sm">Tanggal: {p.tanggal.join(", ")}</p>
            {p.landing && (
              <p className="text-sm">
                Landing:{" "}
                {Array.isArray(p.landing) ? p.landing.join(", ") : p.landing}
              </p>
            )}

            <div className="mt-4 flex gap-2">
              <RippleButton>
                <Link href={`/paket/${bulan.slug}/${p.slug}`}>
                  Lihat Detail
                </Link>
              </RippleButton>
              <RippleButton>
                <Link href={`/daftar?paket=${p.slug}`}>Daftar</Link>
              </RippleButton>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8">
        <RippleButton>
          <Link href="/paket">← Kembali ke semua bulan</Link>
        </RippleButton>
      </div>
    </main>
  );
}
