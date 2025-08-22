// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Pastikan Footer di-import jika ada

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
      {/* Menggunakan bg-background dari CSS baru */}
      <body className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        {/* Menggunakan komponen Footer jika ada, jika tidak, bisa pakai footer sederhana ini */}
        <footer className="text-center py-4 border-t bg-card text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ghufran Travel. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
