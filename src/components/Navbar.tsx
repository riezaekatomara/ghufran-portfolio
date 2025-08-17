"use client";

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-primary">
          Ghufran Travel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/paket" className="hover:text-primary transition">
            Paket
          </Link>
          <Link href="/daftar" className="hover:text-primary transition">
            Daftar
          </Link>
          <DarkModeToggle />
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2 rounded-lg border border-border"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-t border-border bg-background">
          <Link
            href="/paket"
            className="hover:text-primary transition"
            onClick={() => setOpen(false)}
          >
            Paket
          </Link>
          <Link
            href="/daftar"
            className="hover:text-primary transition"
            onClick={() => setOpen(false)}
          >
            Daftar
          </Link>
          <DarkModeToggle />
        </div>
      )}
    </nav>
  );
}
