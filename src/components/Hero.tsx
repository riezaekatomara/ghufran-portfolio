"use client";

import Link from "next/link";

export default function Hero() {
  return (
    // PERUBAHAN UTAMA DI SINI:
    // 1. min-h-[calc(100vh-64px)]: Mengatur tinggi minimal section.
    // 2. flex items-center: Membuat konten di dalamnya (grid) menjadi vertikal di tengah.
    <section className="relative bg-background w-full flex items-center min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
        {/* Kolom Teks (tidak ada perubahan) */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Umroh Nyaman & <span className="text-primary">Berkesan</span> <br />
            bersama Ghufran Travel
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto md:mx-0">
            Pilihan paket terbaik untuk perjalanan ibadah yang aman, nyaman, dan
            penuh keberkahan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
            <Link
              href="/paket"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:opacity-90 transition-all hover:-translate-y-1"
            >
              Lihat Paket Umroh
            </Link>
            <Link
              href="/daftar"
              className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>

        {/* Kolom Gambar (tidak ada perubahan) */}
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-lg">
            <img
              src="/hero/hero-umroh.jpg"
              alt="Umroh Ghufran Travel"
              className="w-full h-auto object-cover rounded-2xl shadow-2xl aspect-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
