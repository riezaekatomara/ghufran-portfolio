// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Ghufran Travel",
  description: "Website Travel Haji & Umroh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-gray-50">
        {/* Navbar selalu ada */}
        <Navbar />

        {/* Konten halaman */}
        <main className="flex-1">{children}</main>

        {/* Footer opsional */}
        <footer className="text-center py-4 border-t bg-white text-sm text-gray-500">
          © {new Date().getFullYear()} Ghufran Travel. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
