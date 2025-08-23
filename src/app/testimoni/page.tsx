"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Testimoni {
  id: number;
  nama: string;
  review: string;
  rating: number;
}

export default function TestimoniPage() {
  const [testimoni, setTestimoni] = useState<Testimoni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [nama, setNama] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchTestimoni();
  }, []);

  const fetchTestimoni = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimoni")
      .select("id, nama, review, rating")
      .order("id", { ascending: false });

    if (error) {
      setError("Gagal memuat testimoni.");
      setLoading(false);
      return;
    }
    setTestimoni(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama || !review) {
      alert("Nama dan review wajib diisi!");
      return;
    }

    const { error } = await supabase
      .from("testimoni")
      .insert([{ nama, review, rating }]);

    if (error) {
      alert("Gagal menyimpan testimoni.");
      return;
    }

    // reset form
    setNama("");
    setReview("");
    setRating(5);

    // refresh data
    fetchTestimoni();
  };

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Testimonial Jamaah
      </h1>

      {/* form tambah testimoni */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded-xl shadow mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">Tambah Testimoni</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <Input
            placeholder="Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Input
            type="number"
            min={1}
            max={5}
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>
        <Button type="submit" className="mt-4">
          Simpan
        </Button>
      </form>

      {/* list testimoni */}
      {loading && <p className="text-center">Memuat testimoni...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid md:grid-cols-3 gap-6">
          {testimoni.length > 0 ? (
            testimoni.map((t) => (
              <Card key={t.id} className="shadow-md">
                <CardContent className="p-6">
                  <p className="italic mb-3">“{t.review}”</p>
                  <p className="text-yellow-500">{"⭐".repeat(t.rating)}</p>
                  <p className="mt-2 font-semibold">- {t.nama}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              Belum ada testimoni.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
