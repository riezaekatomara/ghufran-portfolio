import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md w-full bg-card text-card-foreground rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle className="mx-auto mb-3 text-green-600 w-12 h-12" />
        <h1 className="text-2xl font-bold mb-4 text-green-600">
          Pendaftaran Berhasil ✅
        </h1>
        <p className="mb-6">
          Terima kasih telah mendaftar. Tim kami akan segera menghubungi Anda
          untuk langkah pembayaran berikutnya.
        </p>
        <Link href="/">
          <Button size="lg">Kembali ke Beranda</Button>
        </Link>
      </div>
    </main>
  );
}
