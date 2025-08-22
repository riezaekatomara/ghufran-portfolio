import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { paketBulanan } from "@/lib/pricing";

export default async function BulanPage({
  params,
}: {
  params: Promise<{ bulan: string }>;
}) {
  const { bulan: bulanSlug } = await params;

  const bulan = paketBulanan.find((b) => b.slug === bulanSlug);
  if (!bulan) return notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{bulan.nama}</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bulan.paket.map((p) => (
          <div
            key={p.slug}
            className="bg-card rounded-xl shadow hover:shadow-lg overflow-hidden transition"
          >
            <Image
              src={bulan.gambar}
              alt={p.nama}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-3">
              <h2 className="text-lg font-semibold">{p.nama}</h2>
              <p className="text-sm text-muted-foreground">
                Durasi: {p.durasi}
              </p>
              <p className="text-sm text-muted-foreground">
                Harga: {Array.isArray(p.harga) ? p.harga.join(", ") : p.harga}
              </p>
              <Link
                href={`/paket/${bulan.slug}/${p.slug}`}
                className="inline-block px-5 py-2 rounded-xl bg-black/80 text-white text-sm font-medium hover:opacity-90"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-4">
        <Link href="/" className="text-sm underline">
          ← Kembali ke semua paket
        </Link>
      </div>
    </main>
  );
}
