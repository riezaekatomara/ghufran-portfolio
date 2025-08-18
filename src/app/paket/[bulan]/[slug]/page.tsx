import { notFound } from "next/navigation";
import Link from "next/link";
import RippleButton from "@/components/RippleButton"; // 🔥 ripple button

import { paketBulanan } from "@/lib/pricing";

export default function SubPaketDetail({
  params,
}: {
  params: { bulan: string; slug: string };
}) {
  const bulan = paketBulanan.find((b) => b.slug === params.bulan);
  if (!bulan) return notFound();

  const paket = bulan.paket.find((p) => p.slug === params.slug);
  if (!paket) return notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{paket.nama}</h1>

      <div className="space-y-3 text-base">
        <p>
          <strong>Durasi:</strong> {paket.durasi}
        </p>
        <p>
          <strong>Harga:</strong>{" "}
          {Array.isArray(paket.harga) ? paket.harga.join(", ") : paket.harga}
        </p>
        <p>
          <strong>Maskapai:</strong>{" "}
          {Array.isArray(paket.maskapai)
            ? paket.maskapai.join(", ")
            : paket.maskapai}
        </p>
        <p>
          <strong>Tanggal:</strong> {paket.tanggal.join(", ")}
        </p>
        {paket.landing && (
          <p>
            <strong>Landing:</strong>{" "}
            {Array.isArray(paket.landing)
              ? paket.landing.join(", ")
              : paket.landing}
          </p>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <RippleButton>
          <Link href={`/daftar?paket=${paket.slug}`}>Daftar Sekarang</Link>
        </RippleButton>
        <RippleButton>
          <Link href={`/paket/${params.bulan}`}>← Kembali</Link>
        </RippleButton>
      </div>
    </main>
  );
}
