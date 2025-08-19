import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        ✅ Pendaftaran Berhasil!
      </h1>
      <p className="text-lg mb-8">
        Terima kasih sudah mendaftar. Data kamu sudah tersimpan. Tim Ghufran
        Travel akan segera menghubungi untuk konfirmasi lebih lanjut.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/paket"
          className="px-6 py-2 rounded-lg border hover:bg-muted transition"
        >
          Lihat Paket Lain
        </Link>
      </div>
    </main>
  );
}
