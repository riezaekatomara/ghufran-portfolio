import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "./providers";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Ghufran Travel",
  description: "Umroh Berkesan bersama Ghufran Travel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
