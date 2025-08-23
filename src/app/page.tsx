import Hero from "@/components/Hero";
import PaketCard from "@/components/PaketCard";
import { supabase } from "@/lib/supabaseClient";

export default async function HomePage() {
  // Ambil data paket
  const { data: paketList, error: paketError } = await supabase
    .from("paket")
    .select("id, slug, bulan, title, description, price, quota")
    .order("created_at", { ascending: false })
    .limit(6);

  // Ambil data testimoni
  const { data: testimoniList, error: testimoniError } = await supabase
    .from("testimoni")
    .select("id, content, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      <main className="container mx-auto px-6 py-16 space-y-24">
        {/* Section Paket */}
        <section>
          <h2 className="text-center text-2xl font-bold mb-8">
            Paket Umroh Terbaru
          </h2>
          {paketError && (
            <p className="text-center text-red-500">Gagal memuat paket</p>
          )}
          {paketList?.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Belum ada paket tersedia
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {paketList?.map((p) => (
                <PaketCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </section>

        {/* Section Testimoni */}
        <section>
          <h2 className="text-center text-2xl font-bold mb-8">
            Testimoni Jamaah
          </h2>
          {testimoniError && (
            <p className="text-center text-red-500">Gagal memuat testimoni</p>
          )}
          {testimoniList?.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Belum ada testimoni tersedia
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {testimoniList?.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl shadow-md bg-card p-6 space-y-3"
                >
                  <p className="italic">“{t.content}”</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
