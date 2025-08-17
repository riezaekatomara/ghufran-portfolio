"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-background">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Umroh Nyaman & <span className="text-primary">Berkesan</span> <br />
            bersama Ghufran Travel
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto md:mx-0">
            Pilihan paket terbaik untuk perjalanan ibadah yang aman, nyaman, dan
            penuh keberkahan. Bimbingan profesional, fasilitas terlengkap, harga
            terjangkau.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/paket"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow hover:opacity-90 transition"
            >
              Lihat Paket Umroh
            </Link>
            <Link
              href="/daftar"
              className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted transition"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>

        {/* Gambar Hero */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/hero-umroh.png"
            alt="Umroh Ghufran Travel"
            className="max-w-md w-full rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
