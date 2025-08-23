// src/components/PaketCard.tsx
"use client";

import Link from "next/link";

interface PaketCardProps {
  id: string;
  slug: string;
  bulan: string;
  title: string;
  description?: string;
  price: number;
  quota: number;
}

export default function PaketCard({
  slug,
  bulan,
  title,
  description,
  price,
  quota,
}: PaketCardProps) {
  return (
    <div className="bg-card rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 border">
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
          className="inline-block px-6 py-2 rounded-lg bg-black/80 text-white text-sm font-semibold shadow hover:opacity-90 transition-opacity"
        >
          Lihat Detail Paket
        </Link>
      </div>
    </div>
  );
}
