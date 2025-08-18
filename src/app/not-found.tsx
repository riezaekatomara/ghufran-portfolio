import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-primary">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
