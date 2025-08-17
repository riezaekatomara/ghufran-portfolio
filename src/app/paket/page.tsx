// src/app/paket/page.tsx
import Link from "next/link";

type Paket = {
  slug: string;
  nama: string;
  jadwal: string[];
  hotMakkah: string;
  hotMadinah: string;
  airlines: string[];
  bandara: string;
  hargaMulai?: number;
  sumber: string;
};

const paketList: Paket[] = [
  {
    slug: "umrah-plus-al-ula-thaif",
    nama: "Umrah Plus Al Ula & Thaif",
    jadwal: ["06 Sep 2025", "21 Sep 2025", "06 Okt 2025"],
    hotMakkah: "Royal Majestic / setaraf",
    hotMadinah: "Sanabel / Le Meridien (setaraf)",
    airlines: ["Qatar Airways", "Oman Air"],
    bandara: "CGK – Soekarno-Hatta",
    hargaMulai: 30500000,
    sumber: "https://ghufrantravel.com/transaksi/paket-umrah",
  },
  {
    slug: "umrah-hemat-pol",
    nama: "Umrah Hemat Pol",
    jadwal: ["Beberapa tanggal 2025–2026"],
    hotMakkah: "Grand Al Massa",
    hotMadinah: "Anshorul Madinah",
    airlines: ["Emirates", "Qatar Airways"],
    bandara: "CGK – Soekarno-Hatta",
    sumber:
      "https://ghufrantravel.com/transaksi/paket-umrah/detail/190/umrah-hemat-pol",
  },
];

function formatIDR(n?: number) {
  if (!n) return "Hubungi untuk harga terbaru";
  return n.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

export default function PaketList() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Semua Paket Umrah</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paketList.map((p) => (
          <article
            key={p.slug}
            className="rounded-2xl border p-5 shadow-sm bg-card"
          >
            <h3 className="text-lg font-semibold">{p.nama}</h3>
            <p className="text-sm mt-1">Jadwal: {p.jadwal.join(", ")}</p>
            <p className="text-sm mt-1">
              Hotel: {p.hotMakkah} • {p.hotMadinah}
            </p>
            <p className="text-sm mt-1">Maskapai: {p.airlines.join(", ")}</p>
            <p className="text-sm mt-1">Bandara: {p.bandara}</p>
            <p className="text-base font-medium mt-2">
              {formatIDR(p.hargaMulai)}
            </p>

            <div className="mt-4 flex gap-2">
              <Link
                href={`/paket/${p.slug}`}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground"
              >
                Lihat Detail
              </Link>
              <a
                href={p.sumber}
                target="_blank"
                className="px-4 py-2 rounded-xl border"
              >
                Sumber Resmi
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
