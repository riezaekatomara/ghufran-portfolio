"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const paketList = [
  {
    id: "umroh-regular",
    nama: "Umroh Regular",
    harga: 28500000,
    fasilitas: [
      "Tiket Pesawat PP",
      "Hotel Madinah & Makkah",
      "Makan 3x sehari",
      "Visa Umroh",
      "Pembimbing Ibadah",
    ],
    keberangkatan: "Setiap bulan (jadwal menyesuaikan)",
    poster: "/images/paket/umroh-regular.jpg",
  },
  {
    id: "umroh-plus-turki",
    nama: "Umroh Plus Turki",
    harga: 35000000,
    fasilitas: [
      "Umroh Regular",
      "City Tour Istanbul",
      "Hotel Bintang 4/5 di Turki",
    ],
    keberangkatan: "Jadwal tertentu (hubungi admin)",
    poster: "/images/paket/umroh-plus-turki.jpg",
  },
  {
    id: "haji-khusus",
    nama: "Haji Khusus",
    harga: 8500, // USD (tampilkan teks manual di UI)
    fasilitas: [
      "Tiket Pesawat PP",
      "Hotel Makkah & Madinah",
      "Tenda Mina & Arafah VIP",
      "Makan 3x sehari",
      "Bimbingan Ibadah",
    ],
    keberangkatan: "Musim Haji 1446 H",
    poster: "/images/paket/haji-khusus.jpg",
  },
];

export default function PaketPage() {
  return (
    <section className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        Pilihan Paket Ghufran Travel
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {paketList.map((paket) => (
          <Card
            key={paket.id}
            className="shadow-lg hover:shadow-xl transition overflow-hidden"
          >
            {/* Poster */}
            <div className="relative w-full h-48 bg-muted">
              <Image
                src={paket.poster}
                alt={paket.nama}
                fill
                className="object-cover"
              />
            </div>

            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {paket.nama}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-lg font-bold text-primary mb-3">
                {paket.id === "haji-khusus"
                  ? "USD 8.500 (estimasi)"
                  : `Rp ${paket.harga.toLocaleString("id-ID")}`}
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 mb-3">
                {paket.fasilitas.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <p className="text-muted-foreground text-sm">
                Keberangkatan: {paket.keberangkatan}
              </p>
            </CardContent>

            <CardFooter>
              <Link
                href={{ pathname: "/daftar", query: { paket: paket.id } }}
                className="w-full"
              >
                <Button className="w-full">Daftar Sekarang</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
