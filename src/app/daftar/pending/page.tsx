export default function PendingPage() {
  return (
    <main className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-yellow-500 mb-4">
        ⏳ Pembayaran Sedang Diproses
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Transaksi Anda sedang menunggu konfirmasi. Silakan selesaikan pembayaran
        sesuai instruksi yang diberikan Midtrans.
      </p>
      <a
        href="/"
        className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all"
      >
        Kembali ke Beranda
      </a>
    </main>
  );
}
