import Hero from "@/components/Hero";
import PaketCard from "@/components/PaketCard";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";

export default async function HomePage() {
  // fetch paket
  const { data: paketList, error: paketError } = await supabase
    .from("paket")
    .select("id, slug, bulan, title, description, price, quota")
    .limit(6);

  // fetch testimoni (ambil 3 terbaru)
  const { data: testimoniList, error: testimoniError } = await supabase
    .from("testimoni")
    .select("id, nama, review")
    .order("id", { ascending: false })
    .limit(3);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero */}
      <Hero />

      {/* Paket Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Paket Umroh</h2>

        {paketError && (
          <p className="text-center text-red-500 mb-6">
            Gagal memuat paket. Coba refresh.
          </p>
        )}

        {paketList && paketList.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          !paketError && (
            <p className="text-center text-gray-500">
              Belum ada paket yang tersedia.
            </p>
          )
        )}
      </section>

      {/* Testimoni Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">
            Testimoni Jamaah
          </h2>

          {testimoniError && (
            <p className="text-center text-red-500">Gagal memuat testimoni.</p>
          )}

          {testimoniList && testimoniList.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {testimoniList.map((t) => (
                <div
                  key={t.id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <p className="text-gray-700 italic mb-4">“{t.review}”</p>
                  <p className="text-right font-semibold">— {t.nama}</p>
                </div>
              ))}
            </div>
          ) : (
            !testimoniError && (
              <p className="text-center text-gray-500">Belum ada testimoni.</p>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
