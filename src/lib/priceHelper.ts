/**
 * Ubah string harga (misal "23,5 jt", "32,9 jt (Quad)", "Rp 25.500.000")
 * menjadi number (contoh: 23500000).
 */
export function parseHargaToNumber(harga: string | undefined): number {
  if (!harga) return 0;

  // 1. Ambil hanya angka dan koma dari string
  let clean = harga.replace(/[^0-9,]/g, "").trim();

  // 2. Ganti koma jadi titik desimal
  clean = clean.replace(",", ".");

  let num = parseFloat(clean);

  // 3. Kalau ada "jt" dalam string → kalikan 1.000.000
  if (/jt/i.test(harga)) {
    num = num * 1_000_000;
  }

  return isNaN(num) ? 0 : Math.round(num);
}

/**
 * Ambil harga pertama dari array harga (kalau ada).
 * Berguna untuk paket dengan Quad/Triple/Double.
 */
export function getHargaUtama(harga: string | string[] | undefined): number {
  if (!harga) return 0;

  if (Array.isArray(harga)) {
    return parseHargaToNumber(harga[0]); // pakai harga pertama
  }

  return parseHargaToNumber(harga);
}
