"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-background w-full flex items-center min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-8 md:gap-12">
        {/* Kolom Teks */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug tracking-tight">
            {/* di mobile boleh wrap, di desktop dipaksa satu baris */}
            <span className="sm:whitespace-nowrap">
              Umroh Nyaman & <span className="text-primary">Berkesan</span>
            </span>
            <br />
            bersama Ghufran Travel
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto md:mx-0">
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

        {/* Kolom Gambar */}
        <div className="flex justify-center md:justify-end items-center">
          <img
            src="/hero/hero-umroh.jpg"
            alt="Umroh Ghufran Travel"
            className="h-auto max-h-[320px] sm:max-h-[400px] w-auto object-contain rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
