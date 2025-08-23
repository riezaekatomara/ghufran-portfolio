export default function FailedPage() {
  return (
    <main className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        ❌ Pembayaran Gagal
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Maaf, transaksi Anda tidak berhasil. Silakan coba lagi atau hubungi
        admin Ghufran Travel jika masalah berlanjut.
      </p>
      <a
        href="/daftar"
        className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all"
      >
        Coba Lagi
      </a>
    </main>
  );
}
