import { paketList } from "@/lib/pricing";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function PaketDetail({ params }: Props) {
  const paket = paketList.find((p) => p.id === params.id);
  if (!paket) return notFound();

  return (
    <main className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-4">{paket.nama}</h1>
      {paket.gambar && (
        <img
          src={paket.gambar}
          alt={paket.nama}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      <p className="mb-2">Durasi: {paket.durasi}</p>
      <p className="mb-2">
        Maskapai:{" "}
        {Array.isArray(paket.maskapai)
          ? paket.maskapai.join(", ")
          : paket.maskapai}
      </p>
      <p className="mb-2">Tanggal: {paket.tanggal.join(", ")}</p>
      {paket.landing && (
        <p className="mb-2">
          Landing:{" "}
          {Array.isArray(paket.landing)
            ? paket.landing.join(", ")
            : paket.landing}
        </p>
      )}

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Harga:</h2>
        {Array.isArray(paket.harga) ? (
          <ul className="list-disc pl-5">
            {paket.harga.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        ) : (
          <p>{paket.harga}</p>
        )}
      </div>
    </main>
  );
}
