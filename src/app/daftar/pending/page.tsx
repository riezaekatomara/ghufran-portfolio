import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export default function PendingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md w-full bg-card text-card-foreground rounded-2xl shadow-lg p-8 text-center">
        <Clock className="mx-auto mb-3 text-yellow-600 w-12 h-12" />
        <h1 className="text-2xl font-bold mb-4 text-yellow-600">
          Pendaftaran Tertunda ⏳
        </h1>
        <p className="mb-6">
          Pendaftaran Anda masih menunggu konfirmasi dari admin. Tim kami akan
          segera menghubungi Anda melalui WhatsApp atau Email untuk
          menyelesaikan pembayaran.
        </p>
        <Link href="/">
          <Button size="lg">Kembali ke Beranda</Button>
        </Link>
      </div>
    </main>
  );
}
