"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Tracking() {
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleCek = () => {
    if (hp === "085888871997") {
      setStatus(
        "✅ DP Lunas | ⏳ Pelunasan Proses | ⏳ Visa Pending | ⏳ Tiket Pending"
      );
    } else {
      setStatus("❌ Data tidak ditemukan. Pastikan nomor HP benar.");
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tracking Status Jamaah</h1>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Masukkan No. HP"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
        <Button onClick={handleCek}>Cek Status</Button>
      </div>

      {status && (
        <Card>
          <CardContent className="p-4">{status}</CardContent>
        </Card>
      )}
    </main>
  );
}
