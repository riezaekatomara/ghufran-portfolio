// src/app/paket/[slug]/page.tsx
import { notFound } from "next/navigation";
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

export default function PaketDetail({ params }: { params: { slug: string } }) {
  const paket = paketList.find((p) => p.slug === params.slug);

  if (!paket) return notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{paket.nama}</h1>

      <div className="space-y-3 text-base">
        <p>
          <strong>Jadwal:</strong> {paket.jadwal.join(", ")}
        </p>
        <p>
          <strong>Hotel Makkah:</strong> {paket.hotMakkah}
        </p>
        <p>
          <strong>Hotel Madinah:</strong> {paket.hotMadinah}
        </p>
        <p>
          <strong>Maskapai:</strong> {paket.airlines.join(", ")}
        </p>
        <p>
          <strong>Bandara:</strong> {paket.bandara}
        </p>
        <p>
          <strong>Harga mulai:</strong> {formatIDR(paket.hargaMulai)}
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/daftar?paket=${paket.slug}`}
          className="px-5 py-2 rounded-xl bg-primary text-primary-foreground"
        >
          Daftar Sekarang
        </Link>
        <a
          href={paket.sumber}
          target="_blank"
          className="px-5 py-2 rounded-xl border"
        >
          Lihat Sumber Resmi
        </a>
      </div>

      <div className="mt-8">
        <Link href="/paket" className="text-sm underline">
          ← Kembali ke semua paket
        </Link>
      </div>
    </main>
  );
}
