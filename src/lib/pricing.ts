// Fungsi untuk ambil harga berdasarkan nama paket
export function getPrice(paket: string): number | null {
  switch (paket) {
    case "Umrah Plus Al Ula & Thaif":
      // contoh harga dari situs resmi Ghufran Travel
      return 36900000; // Rp 36.900.000
    case "Umrah Hemat Pol":
      // paket hemat pol biasanya dinamis / promo → null artinya belum fix
      return null;
    default:
      return null;
  }
}
