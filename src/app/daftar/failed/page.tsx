import Link from "next/link";

export default function FailedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md w-full bg-card text-card-foreground rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Pendaftaran Gagal ❌
        </h1>
        <p className="mb-6">
          Maaf, terjadi kesalahan saat memproses pendaftaran Anda. Silakan coba
          lagi atau hubungi admin untuk bantuan lebih lanjut.
        </p>
        <Link
          href="/daftar"
          className="inline-block px-6 py-2 rounded-xl bg-primary text-primary-foreground mr-3"
        >
          Coba Lagi
        </Link>
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-xl bg-secondary text-secondary-foreground"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
