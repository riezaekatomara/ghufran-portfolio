export default function SuccessPage() {
  return (
    <main className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Pendaftaran & Pembayaran Berhasil!
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Terima kasih telah mendaftar bersama <strong>Ghufran Travel</strong>.
        Kami akan segera menghubungi Anda untuk langkah selanjutnya.
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
