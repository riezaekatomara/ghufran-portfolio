import PaketCard from "@/components/PaketCard";

const paketList = [
  {
    slug: "umrah-hemat",
    nama: "Umrah Hemat 9 Hari",
    harga: 28000000,
    poster: "/images/paket/umrah-hemat.jpg", // nanti update real image
  },
  {
    slug: "umrah-vip",
    nama: "Umrah VIP 12 Hari",
    harga: 45000000,
    poster: "/images/paket/umrah-vip.jpg",
  },
];

export default function PaketPage() {
  return (
    <section className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Paket Umrah & Haji</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paketList.map((paket) => (
          <PaketCard key={paket.slug} {...paket} />
        ))}
      </div>
    </section>
  );
}
