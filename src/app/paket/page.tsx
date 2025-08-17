// src/app/paket/page.tsx
import Link from "next/link";

const paket = [
  {
    slug: "umrah-plus-al-ula-thaif",
    nama: "Umrah Plus Al Ula & Thaif",
    hargaMulai: 30500000,
  },
  { slug: "umrah-hemat-pol", nama: "Umrah Hemat Pol", hargaMulai: undefined },
];

export default function PaketIndex() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Semua Paket Umrah
      </h1>
      <ul className="space-y-3">
        {paket.map((p) => (
          <li
            key={p.slug}
            className="rounded-xl border p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{p.nama}</p>
              <p className="text-sm">
                {p.hargaMulai
                  ? p.hargaMulai.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  : "Hubungi untuk harga terbaru"}
              </p>
            </div>
            <Link
              href={`/paket/${p.slug}`}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
            >
              Lihat
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
