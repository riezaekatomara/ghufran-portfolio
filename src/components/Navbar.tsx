"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Ghufran Travel
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden">
          ☰
        </button>
        <div className={`${open ? "block" : "hidden"} md:flex space-x-6`}>
          <Link href="/paket" className="hover:text-yellow-400">
            Paket
          </Link>
          <Link href="/daftar" className="hover:text-yellow-400">
            Daftar
          </Link>
          <Link href="/testimoni" className="hover:text-yellow-400">
            Testimoni
          </Link>
          <Link href="/tracking" className="hover:text-yellow-400">
            Tracking
          </Link>
        </div>
      </div>
    </nav>
  );
}
