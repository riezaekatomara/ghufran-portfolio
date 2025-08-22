import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import { paketBulanan } from "@/lib/pricing";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />

      <section id="paket-unggulan" className="py-20 bg-muted/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Paket Umroh Unggulan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Pilih dari paket-paket terbaik kami yang dirancang khusus untuk
            memastikan perjalanan ibadah Anda nyaman, aman, dan penuh makna.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paketBulanan.map((p) => (
              <div
                key={p.slug}
                className="bg-card rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 border-gradient-primary"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={p.gambar}
                    alt={p.nama}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 space-y-3 text-left">
                  <h3 className="text-xl font-bold">{p.nama}</h3>
                  <p className="text-sm text-muted-foreground">
                    {p.paket.length} pilihan subpaket tersedia
                  </p>
                  <Link
                    href={`/paket/${p.slug}`}
                    className="inline-block px-6 py-2 rounded-lg bg-black/80 text-white text-sm font-semibold shadow hover:opacity-90 transition-opacity"
                  >
                    Lihat Detail Paket
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
