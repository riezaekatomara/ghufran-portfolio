import Link from "next/link";
import { notFound } from "next/navigation";
import { paketBulanan, PaketBulanan } from "@/lib/pricing";

export default function BulanPage({ params }: { params: { bulan: string } }) {
  const bulanData: PaketBulanan | undefined = paketBulanan.find(
    (b) => b.slug === params.bulan
  );

  if (!bulanData) return notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{bulanData.nama}</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bulanData.paket.map((p) => (
          <div
            key={p.slug}
            className="rounded-xl border p-4 shadow-sm bg-card hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{p.nama}</h3>
            <p className="text-sm mt-1">Durasi: {p.durasi}</p>
            <p className="text-sm mt-1">
              Maskapai:{" "}
              {Array.isArray(p.maskapai) ? p.maskapai.join(", ") : p.maskapai}
            </p>
            <p className="text-sm mt-1">Tanggal: {p.tanggal.join(", ")}</p>
            <p className="text-sm mt-1">
              Harga: {Array.isArray(p.harga) ? p.harga.join(" | ") : p.harga}
            </p>

            <div className="mt-3">
              <Link
                href={`/${bulanData.slug}/${p.slug}`}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90 transition"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/" className="text-sm underline">
          ← Kembali ke semua paket
        </Link>
      </div>
    </main>
  );
}
