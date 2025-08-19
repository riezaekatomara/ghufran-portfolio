import Link from "next/link";

export default function PendingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md w-full bg-card text-card-foreground rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-yellow-600">
          Pendaftaran Tertunda ⏳
        </h1>
        <p className="mb-6">
          Harga paket Anda masih menunggu konfirmasi dari admin. Tim kami akan
          segera menghubungi Anda melalui WhatsApp atau Email untuk
          menyelesaikan pembayaran.
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
