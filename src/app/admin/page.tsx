"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Pendaftar = {
  pendaftar_id: string;
  nama: string;
  email: string;
  telepon: string | null;
  jumlah: number | null;
  catatan: string | null;
  paket_title: string;
  paket_bulan: string;
  status: string;
  tgl_daftar: string;
};

export default function AdminPage() {
  const [pendaftar, setPendaftar] = useState<Pendaftar[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPaket, setFilterPaket] = useState("all");

  useEffect(() => {
    fetchPendaftar();
  }, []);

  async function fetchPendaftar() {
    setLoading(true);
    const { data, error } = await supabase.from("v_pendaftar").select("*");

    if (error) {
      console.error("Error fetching pendaftar:", error.message);
    } else {
      setPendaftar(data as Pendaftar[]);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from("pendaftar")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error.message);
    } else {
      fetchPendaftar();
    }
  }

  async function deletePendaftar(id: string) {
    const { error } = await supabase.from("pendaftar").delete().eq("id", id);

    if (error) {
      console.error("Error deleting pendaftar:", error.message);
    } else {
      fetchPendaftar();
    }
  }

  // Filter data di sisi client
  const filteredData = pendaftar.filter((row) => {
    const matchesSearch =
      row.nama.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase()) ||
      (row.telepon ?? "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ? true : row.status === filterStatus;

    const matchesPaket =
      filterPaket === "all" ? true : row.paket_title === filterPaket;

    return matchesSearch && matchesStatus && matchesPaket;
  });

  const paketOptions = Array.from(
    new Set(pendaftar.map((row) => row.paket_title))
  );

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Admin - Data Pendaftar</h1>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari nama, email, telepon..."
          className="border rounded px-3 py-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={filterPaket}
          onChange={(e) => setFilterPaket(e.target.value)}
        >
          <option value="all">Semua Paket</option>
          {paketOptions.map((paket) => (
            <option key={paket} value={paket}>
              {paket}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredData.length === 0 ? (
        <p className="text-gray-500">Tidak ada pendaftar yang cocok.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Nama</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Telepon</th>
                <th className="p-3 border">Jumlah</th>
                <th className="p-3 border">Catatan</th>
                <th className="p-3 border">Paket</th>
                <th className="p-3 border">Bulan</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Tanggal</th>
                <th className="p-3 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.pendaftar_id} className="hover:bg-gray-50">
                  <td className="p-3 border">{row.nama}</td>
                  <td className="p-3 border">{row.email}</td>
                  <td className="p-3 border">{row.telepon || "-"}</td>
                  <td className="p-3 border">{row.jumlah ?? "-"}</td>
                  <td className="p-3 border">{row.catatan || "-"}</td>
                  <td className="p-3 border">{row.paket_title}</td>
                  <td className="p-3 border">{row.paket_bulan}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold
                        ${
                          row.status === "success"
                            ? "bg-green-100 text-green-700"
                            : row.status === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 border">
                    {new Date(row.tgl_daftar).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 border space-x-2">
                    {row.status !== "success" && (
                      <button
                        onClick={() =>
                          updateStatus(row.pendaftar_id, "success")
                        }
                        className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                      >
                        Tandai Lunas
                      </button>
                    )}
                    {row.status !== "failed" && (
                      <button
                        onClick={() => updateStatus(row.pendaftar_id, "failed")}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        Tandai Gagal
                      </button>
                    )}
                    <button
                      onClick={() => deletePendaftar(row.pendaftar_id)}
                      className="px-2 py-1 bg-gray-300 text-black rounded text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
