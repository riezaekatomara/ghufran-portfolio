import { notFound } from "next/navigation";
import Link from "next/link";
import { paketBulanan, PaketBulanan, SubPaket } from "@/lib/pricing";

export default function PaketDetailPage({
  params,
}: {
  params: { bulan: string; slug: string };
}) {
  const bulanData: PaketBulanan | undefined = paketBulanan.find(
    (b) => b.slug === params.bulan
  );

  if (!bulanData) return notFound();

  const paket: SubPaket | undefined = bulanData.paket.find(
    (p) => p.slug === params.slug
  );

  if (!paket) return notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{paket.nama}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Gambar Paket */}
        <div>
          <img
            src={bulanData.gambar}
            alt={paket.nama}
            className="w-full h-72 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Detail Paket */}
        <div className="space-y-3 text-base">
          <p>
            <strong>Durasi:</strong> {paket.durasi}
          </p>
          <p>
            <strong>Maskapai:</strong>{" "}
            {Array.isArray(paket.maskapai)
              ? paket.maskapai.join(", ")
              : paket.maskapai}
          </p>
          <p>
            <strong>Tanggal Keberangkatan:</strong> {paket.tanggal.join(", ")}
          </p>
          {paket.landing && (
            <p>
              <strong>Landing:</strong>{" "}
              {Array.isArray(paket.landing)
                ? paket.landing.join(", ")
                : paket.landing}
            </p>
          )}
          <p>
            <strong>Harga:</strong>{" "}
            {Array.isArray(paket.harga) ? paket.harga.join(" | ") : paket.harga}
          </p>

          {/* Tombol Aksi */}
          <div className="mt-6 flex gap-3">
            <Link
              href={`/daftar?paket=${paket.slug}`}
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              Daftar Sekarang
            </Link>
            <Link
              href={`/${bulanData.slug}`}
              className="px-5 py-2 rounded-xl border hover:bg-muted transition"
            >
              Kembali ke {bulanData.nama}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
