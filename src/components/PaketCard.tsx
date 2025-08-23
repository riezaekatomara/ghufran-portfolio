// src/components/PaketCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

interface PaketCardProps {
  id: string;
  slug: string;
  bulan: string;
  title: string;
  description?: string;
  price: number;
  quota: number;
  image_url?: string; // opsional dari DB
}

export default function PaketCard({
  slug,
  bulan,
  title,
  description,
  price,
  quota,
  image_url,
}: PaketCardProps) {
  // Fallback logic untuk gambar
  const imgSrc =
    image_url ||
    `/paket/${slug}.jpg` || // cocokkan nama slug (misalnya oktober-manis-bonus-berlapis-qatar.jpg)
    `/paket/${bulan}.jpg` || // fallback bulan (misalnya september.jpg)
    `/paket/default.jpg`; // fallback terakhir

  return (
    <div className="bg-card rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 border">
      {/* Gambar Paket */}
      <div className="relative w-full h-48">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Konten */}
      <div className="p-6 space-y-3 text-left">
        <h3 className="text-xl font-bold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
        <p className="text-sm">
          <strong>Harga:</strong> Rp {Number(price).toLocaleString()}
        </p>
        <p className="text-sm">
          <strong>Kuota:</strong> {quota} jamaah
        </p>

        <Link
          href={`/paket/${bulan}/${slug}`}
          className="inline-block px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow hover:bg-primary/90 transition"
        >
          Lihat Detail Paket
        </Link>
      </div>
    </div>
  );
}
