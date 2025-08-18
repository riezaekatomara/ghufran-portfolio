import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ghufran Travel",
  description: "Paket Umroh & Haji terpercaya bersama Ghufran Travel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col bg-background text-foreground font-sans antialiased">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
