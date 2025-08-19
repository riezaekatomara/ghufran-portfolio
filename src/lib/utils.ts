import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper untuk gabung className dengan aman (dipakai di UI component)
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Ambil harga utama (kalau array ambil yang pertama)
export function getHargaUtama(harga: string | string[]) {
  if (Array.isArray(harga)) return harga[0];
  return harga;
}

// Convert harga string → number (contoh: "23,5 jt" → 23500000)
export function parseHargaToNumber(harga: string | string[]) {
  const h = Array.isArray(harga) ? harga[0] : harga;
  // Ambil hanya angka & koma
  const match = h.match(/([\d.,]+)/);
  if (!match) return 0;

  // Convert "23,5" → 23.5
  const clean = match[1].replace(/\./g, "").replace(",", ".");
  const num = parseFloat(clean);

  // Kalau ada kata "jt" berarti juta
  if (/jt/i.test(h)) {
    return Math.round(num * 1_000_000);
  }
  return Math.round(num);
}
