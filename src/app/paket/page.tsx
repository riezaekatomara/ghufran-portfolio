import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// tipe data paket
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

// daftar paket yang sama dengan app/page.tsx
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
    slug: "umrah-hemat",
    nama: "Umrah Hemat",
    jadwal: ["Beberapa tanggal 2025–2026"],
    hotMakkah: "Grand Al Massa",
    hotMadinah: "Anshorul Madinah",
    airlines: ["Emirates", "Qatar Airways"],
    bandara: "CGK – Soekarno-Hatta",
    sumber:
      "https://ghufrantravel.com/transaksi/paket-umrah/detail/190/umrah-hemat-pol",
  },
  {
    slug: "umrah-ramadhan",
    nama: "Umrah Ramadhan",
    jadwal: ["Maret 2026"],
    hotMakkah: "Setaraf Bintang 5",
    hotMadinah: "Setaraf Bintang 5",
    airlines: ["Saudia", "Qatar Airways"],
    bandara: "CGK – Soekarno-Hatta",
    hargaMulai: 45000000,
    sumber: "https://ghufrantravel.com/transaksi/paket-umrah",
  },
  {
    slug: "umrah-akhir-tahun",
    nama: "Umrah Akhir Tahun",
    jadwal: ["Des 2025"],
    hotMakkah: "Swissotel Makkah",
    hotMadinah: "Anwar Al Madinah Movenpick",
    airlines: ["Garuda Indonesia"],
    bandara: "CGK – Soekarno-Hatta",
    hargaMulai: 36000000,
    sumber: "https://ghufrantravel.com/transaksi/paket-umrah",
  },
  {
    slug: "umrah-liburan-sekolah",
    nama: "Umrah Liburan Sekolah",
    jadwal: ["Juni 2026"],
    hotMakkah: "Royal Dar Al Eiman",
    hotMadinah: "Rawdat Al Aqeeq",
    airlines: ["Emirates"],
    bandara: "CGK – Soekarno-Hatta",
    hargaMulai: 33500000,
    sumber: "https://ghufrantravel.com/transaksi/paket-umrah",
  },
  {
    slug: "umrah-vvip",
    nama: "Umrah VVIP / Premium",
    jadwal: ["Custom Request"],
    hotMakkah: "Fairmont Makkah",
    hotMadinah: "Madinah Oberoi",
    airlines: ["Qatar Airways", "Emirates"],
    bandara: "CGK – Soekarno-Hatta",
    hargaMulai: 70000000,
    sumber: "https://ghufrantravel.com/transaksi/paket-umrah",
  },
  {
    slug: "umrah-haji-khusus",
    nama: "Haji Khusus / Plus",
    jadwal: ["2026 – Kuota Terbatas"],
    hotMakkah: "Pullman ZamZam",
    hotMadinah: "Shaza Madinah",
    airlines: ["Saudia"],
    bandara: "CGK – Soekarno-Hatta",
    hargaMulai: 120000000,
    sumber: "https://ghufrantravel.com/transaksi/paket-umrah",
  },
];

function formatIDR(n?: number) {
  if (!n) return "Hubungi untuk harga terbaru";
  return n.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

export default function PaketDetail({ params }: { params: { slug: string } }) {
  const paket = paketList.find((p) => p.slug === params.slug);

  if (!paket) {
    notFound();
  }

  return (
    <main className="min-h-dvh container mx-auto px-4 py-12">
      <Link href="/" className="text-sm underline">
        ← Kembali
      </Link>

      <div className="mt-6 rounded-xl border p-6 bg-card shadow-md">
        {/* gambar sesuai slug */}
        <Image
          src={`/paket/${paket.slug}.jpg`}
          alt={paket.nama}
          width={800}
          height={450}
          className="rounded-lg object-cover w-full h-72"
        />

        <h1 className="text-2xl md:text-3xl font-semibold mt-4">
          {paket.nama}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Jadwal Keberangkatan: {paket.jadwal.join(", ")}
        </p>

        <ul className="mt-4 space-y-1 text-sm">
          <li>Hotel Makkah: {paket.hotMakkah}</li>
          <li>Hotel Madinah: {paket.hotMadinah}</li>
          <li>Maskapai: {paket.airlines.join(", ")}</li>
          <li>Bandara Keberangkatan: {paket.bandara}</li>
        </ul>

        <p className="text-lg font-medium mt-4">
          Harga Mulai: {formatIDR(paket.hargaMulai)}
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href={`/daftar?paket=${paket.slug}`}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground"
          >
            Daftar Sekarang
          </Link>
          <a
            href={paket.sumber}
            target="_blank"
            className="px-5 py-2 rounded-lg border"
          >
            Sumber Resmi
          </a>
        </div>
      </div>
    </main>
  );
}
