import { supabase } from "@/lib/supabaseClient";

// Definisikan tipe untuk data relasi
interface User {
  id: string;
  name: string;
  email: string;
}

interface Paket {
  id: string;
  title: string;
  bulan: string;
  price: number;
}

interface Invoice {
  id: string;
  order_id: string;
  status: string;
  nominal: number;
  created_at: string;
  user: User | null;
  paket: Paket | null;
}

export default async function InvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { data: invoice, error } = await supabase
    .from("pendaftar")
    .select(
      `
      id,
      order_id,
      status,
      nominal,
      created_at,
      paket:paket_id (id, title, bulan, price),
      user:user_id (id, name, email)
    `
    )
    .eq("id", id)
    .single<Invoice>(); // ⬅️ Tambahkan tipe Invoice di sini

  if (error || !invoice) {
    return (
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-red-600">
          ❌ Invoice tidak ditemukan
        </h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 py-12 max-w-3xl">
      <div className="bg-card shadow-lg rounded-xl p-8 space-y-6 border">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Invoice #{invoice.order_id}</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              invoice.status === "success"
                ? "bg-green-100 text-green-600"
                : invoice.status === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {invoice.status.toUpperCase()}
          </span>
        </div>

        {/* Informasi Jamaah */}
        <section className="space-y-1">
          <h2 className="text-lg font-semibold">Data Jamaah</h2>
          <p>👤 {invoice.user?.name}</p>
          <p>📧 {invoice.user?.email}</p>
        </section>

        {/* Detail Paket */}
        <section className="space-y-1">
          <h2 className="text-lg font-semibold">Paket Umroh</h2>
          <p>
            {invoice.paket?.title} ({invoice.paket?.bulan})
          </p>
          <p>Harga: Rp {Number(invoice.paket?.price).toLocaleString()}</p>
        </section>

        {/* Rincian Pembayaran */}
        <section className="space-y-1">
          <h2 className="text-lg font-semibold">Pembayaran</h2>
          <p>
            Total Dibayar:{" "}
            <strong>Rp {Number(invoice.nominal).toLocaleString()}</strong>
          </p>
          <p>Tanggal: {new Date(invoice.created_at).toLocaleString("id-ID")}</p>
        </section>
      </div>
    </main>
  );
}
