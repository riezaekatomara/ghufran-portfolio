import Image from "next/image";
import Link from "next/link";
import { paketBulanan } from "@/lib/pricing";

export default function PaketIndexPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Semua Paket Bulanan
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paketBulanan.map((b) => (
          <div
            key={b.slug}
            className="bg-card rounded-xl shadow hover:shadow-lg overflow-hidden transition"
          >
            <Image
              src={b.gambar}
              alt={b.nama}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-3">
              <h2 className="text-lg font-semibold">{b.nama}</h2>
              <p className="text-sm text-muted-foreground">
                {b.paket.length} pilihan subpaket tersedia
              </p>
              <Link
                href={`/paket/${b.slug}`}
                className="inline-block px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
              >
                Lihat Paket
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-4 justify-center">
        <Link href="/" className="text-sm underline">
          ← Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
