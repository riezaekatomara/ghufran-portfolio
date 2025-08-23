import { supabase } from "@/lib/supabaseClient";
import PaketCard from "@/components/PaketCard";

export default async function PaketPage() {
  const { data: paketList, error } = await supabase.from("paket").select("*");

  if (error) {
    console.error("Supabase error:", error.message);
    return <p className="text-center text-red-500">Gagal memuat paket.</p>;
  }

  return (
    <main className="flex-grow">
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Semua Paket Umroh
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Temukan paket yang paling sesuai dengan kebutuhan dan impian
              perjalanan suci Anda.
            </p>
          </div>

          {paketList && paketList.length > 0 ? (
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
          ) : (
            <p className="text-center text-muted-foreground">
              Belum ada paket.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
