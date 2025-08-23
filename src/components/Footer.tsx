"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card text-sm text-muted-foreground">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-lg font-bold text-foreground">Ghufran Travel</h2>
          <p className="mt-2">
            Layanan Haji & Umroh terpercaya dengan pengalaman terbaik untuk
            perjalanan ibadah Anda.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-foreground">Menu</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/paket" className="hover:text-primary">
                Paket Umroh
              </Link>
            </li>
            <li>
              <Link href="/tentang" className="hover:text-primary">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="/testimoni" className="hover:text-primary">
                Testimoni
              </Link>
            </li>
            <li>
              <Link href="/tracking" className="hover:text-primary">
                Tracking
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold text-foreground">Kontak</h3>
          <p className="mt-2">Jl. Haji & Umroh No. 123, Jakarta</p>
          <p className="mt-1">Email: info@ghufrantravel.com</p>
          <p className="mt-1">Telp: +62 812 3456 7890</p>

          <div className="flex gap-4 mt-4">
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:text-primary" />
            </Link>
            <Link href="mailto:info@ghufrantravel.com" aria-label="Email">
              <Mail className="h-5 w-5 hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ghufran Travel. All rights reserved.
      </div>
    </footer>
  );
}
