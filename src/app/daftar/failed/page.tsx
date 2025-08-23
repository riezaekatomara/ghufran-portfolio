import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md w-full bg-card text-card-foreground rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">
          Pendaftaran Berhasil ✅
        </h1>
        <p className="mb-6">
          Terima kasih telah mendaftar. Silakan lanjutkan pembayaran melalui
          halaman Midtrans yang sudah terbuka. Kami akan segera mengkonfirmasi
          pendaftaran Anda.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-xl bg-primary text-primary-foreground"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
