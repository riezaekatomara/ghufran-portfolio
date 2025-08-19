"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";

type Pendaftar = {
  id: number;
  nama: string;
  email: string;
  telepon: string;
  paket_bulan: string;
  paket_slug: string;
  jumlah: number;
  catatan: string | null;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [data, setData] = useState<Pendaftar[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data dari Supabase
  const fetchPendaftar = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pendaftar")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal ambil data:", error);
    } else {
      setData(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendaftar();
  }, []);

  // 🔹 Toggle status pending <-> lunas
  const toggleStatus = async (id: number, current: string) => {
    const newStatus = current === "lunas" ? "pending" : "lunas";
    const { error } = await supabase
      .from("pendaftar")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Gagal update status");
    } else {
      fetchPendaftar();
    }
  };

  // 🔹 Hapus pendaftar
  const deletePendaftar = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pendaftar ini?")) return;

    const { error } = await supabase.from("pendaftar").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus data");
    } else {
      fetchPendaftar();
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <LogoutButton />
        </header>

        {/* Konten */}
        <section>
          {loading ? (
            <p>Sedang memuat data...</p>
          ) : data.length === 0 ? (
            <p className="text-muted-foreground">Belum ada pendaftar.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="border border-border px-3 py-2">#</th>
                    <th className="border border-border px-3 py-2">Nama</th>
                    <th className="border border-border px-3 py-2">Email</th>
                    <th className="border border-border px-3 py-2">Telepon</th>
                    <th className="border border-border px-3 py-2">Paket</th>
                    <th className="border border-border px-3 py-2">Jumlah</th>
                    <th className="border border-border px-3 py-2">Status</th>
                    <th className="border border-border px-3 py-2">Tanggal</th>
                    <th className="border border-border px-3 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((p, idx) => (
                    <tr key={p.id} className="odd:bg-card even:bg-muted/40">
                      <td className="border border-border px-3 py-2">
                        {idx + 1}
                      </td>
                      <td className="border border-border px-3 py-2">
                        {p.nama}
                      </td>
                      <td className="border border-border px-3 py-2">
                        {p.email}
                      </td>
                      <td className="border border-border px-3 py-2">
                        {p.telepon}
                      </td>
                      <td className="border border-border px-3 py-2">
                        {p.paket_bulan} ({p.paket_slug})
                      </td>
                      <td className="border border-border px-3 py-2">
                        {p.jumlah}
                      </td>
                      <td className="border border-border px-3 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            p.status === "lunas"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="border border-border px-3 py-2">
                        {new Date(p.created_at).toLocaleString("id-ID")}
                      </td>
                      <td className="border border-border px-3 py-2 space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleStatus(p.id, p.status)}
                        >
                          {p.status === "lunas" ? "Set Pending" : "Set Lunas"}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePendaftar(p.id)}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
