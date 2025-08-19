import Image from "next/image";
import Link from "next/link";
import { paketBulanan } from "@/lib/pricing";

export default function HomePage() {
  // Ambil hanya 6 bulan utama (sesuai permintaanmu)
  const bulanUtama = [
    "september",
    "oktober",
    "oktober-plus-qatar",
    "november",
    "desember",
    "desember-akhir-tahun",
  ];

  const paketUtama = paketBulanan.filter((p) => bulanUtama.includes(p.slug));

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        Pilih Paket Umroh Anda
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paketUtama.map((p) => (
          <div
            key={p.slug}
            className="bg-card rounded-xl shadow hover:shadow-lg overflow-hidden transition"
          >
            <Image
              src={p.gambar}
              alt={p.nama}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-semibold">{p.nama}</h2>
              <p className="text-sm text-muted-foreground">
                {p.paket.length} pilihan subpaket tersedia
              </p>
              <Link
                href={`/${p.slug}`}
                className="inline-block px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
              >
                Lihat Paket
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
