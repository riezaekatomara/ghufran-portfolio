"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          Ghufran Travel
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/paket"
              className="hover:text-primary transition-colors"
            >
              Paket
            </Link>
          </li>
          <li>
            <Link
              href="/daftar"
              className="hover:text-primary transition-colors"
            >
              Daftar
            </Link>
          </li>
          <li>
            <Link
              href="/kontak"
              className="hover:text-primary transition-colors"
            >
              Kontak
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-4 space-y-3">
          <Link
            href="/"
            className="block hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/paket"
            className="block hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Paket
          </Link>
          <Link
            href="/daftar"
            className="block hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Daftar
          </Link>
          <Link
            href="/kontak"
            className="block hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Kontak
          </Link>
        </div>
      )}
    </header>
  );
}
