// src/app/paket/[bulan]/[slug]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function PaketDetailPage({
  params,
}: {
  params: { bulan: string; slug: string };
}) {
  const { slug } = params;

  const { data: paket, error } = await supabase
    .from("paket")
    .select("id, title, description, price, quota, bulan, slug")
    .eq("slug", slug)
    .single();

  if (error || !paket) return notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{paket.title}</h1>

      <div className="space-y-3 text-base">
        <p>
          <strong>Harga:</strong> Rp {Number(paket.price).toLocaleString()}
        </p>
        <p>
          <strong>Kuota:</strong> {paket.quota} jamaah
        </p>
        <p>
          <strong>Bulan:</strong> {paket.bulan}
        </p>
        {paket.description && (
          <p className="text-gray-700 leading-relaxed">{paket.description}</p>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        <Link href={`/daftar?paket_id=${paket.id}`}>
          <Button size="lg">Daftar Sekarang</Button>
        </Link>
        <Link href="/paket">
          <Button variant="outline" size="lg">
            Kembali ke semua paket
          </Button>
        </Link>
      </div>
    </main>
  );
}
