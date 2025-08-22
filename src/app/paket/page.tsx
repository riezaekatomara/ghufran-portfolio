import Image from "next/image";
import Link from "next/link";
import { paketBulanan } from "@/lib/pricing";

export default function PaketPage() {
  return (
    <main className="flex-grow">
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Semua Paket Umroh
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Temukan paket yang paling sesuai dengan kebutuhan dan impian
              perjalanan suci Anda.
            </p>
          </div>
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
