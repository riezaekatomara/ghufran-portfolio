import { Card, CardContent } from "@/components/ui/card";

export default function Testimoni() {
  const data = [
    {
      nama: "Ahmad",
      review: "Pelayanan Ghufran Travel sangat memuaskan. Ibadah jadi khusyuk.",
      rating: 5,
    },
    {
      nama: "Siti",
      review: "Pembimbing sabar, hotel dekat Masjidil Haram. Sangat nyaman.",
      rating: 5,
    },
    {
      nama: "Budi",
      review: "Harga transparan, tanpa biaya tambahan. Recomended!",
      rating: 4,
    },
  ];

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Testimonial Jamaah
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {data.map((t, i) => (
          <Card key={i} className="shadow-md">
            <CardContent className="p-6">
              <p className="italic mb-3">"{t.review}"</p>
              <p className="text-yellow-500">{"⭐".repeat(t.rating)}</p>
              <p className="mt-2 font-semibold">- {t.nama}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
