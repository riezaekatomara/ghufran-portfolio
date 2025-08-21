import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { paketBulanan } from "@/lib/pricing";

export default function PaketDetailPage({
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

      <Image
        src={bulan.gambar}
        alt={paket.nama}
        width={800}
        height={400}
        className="w-full max-h-96 object-cover rounded-xl mb-8"
      />

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
          <strong>Jadwal:</strong> {paket.tanggal.join(", ")}
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
        <Link
          href={`/daftar?bulan=${bulan.slug}&paket=${paket.slug}`}
          className="px-5 py-2 rounded-xl bg-primary text-primary-foreground"
        >
          Daftar Sekarang
        </Link>
        <Link
          href={`/paket/${bulan.slug}`}
          className="px-5 py-2 rounded-xl border"
        >
          Kembali ke {bulan.nama}
        </Link>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-sm underline">
          ← Kembali ke semua paket
        </Link>
      </div>
    </main>
  );
}
