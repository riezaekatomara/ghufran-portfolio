// src/app/paket/[bulan]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import PaketCard from "@/components/PaketCard";

export default async function PaketByBulanPage({
  params,
}: {
  params: { bulan: string };
}) {
  const { bulan } = params;

  const { data: paketList, error } = await supabase
    .from("paket")
    .select("*")
    .eq("bulan", bulan);

  if (error || !paketList || paketList.length === 0) {
    return notFound();
  }

  return (
    <main className="flex-grow">
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold">Paket Umroh Bulan {bulan}</h1>
            <p className="mt-2 text-muted-foreground">
              Menampilkan semua paket perjalanan umroh di bulan {bulan}.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paketList.map((p) => (
              <PaketCard
                key={p.id}
                id={p.id}
                slug={p.slug}
                bulan={p.bulan}
                title={p.title}
                description={p.description}
                price={p.price}
                quota={p.quota}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
