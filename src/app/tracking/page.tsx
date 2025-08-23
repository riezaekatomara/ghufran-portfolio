"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Tracking() {
  const supabase = createClientComponentClient();
  const [hp, setHp] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [view, setView] = useState<"badge" | "timeline">("badge");

  const handleCek = async () => {
    const value = hp.trim();
    if (!value) {
      setMessage("⚠️ Masukkan nomor HP terlebih dahulu.");
      setData(null);
      return;
    }

    setLoading(true);
    setMessage("");
    setData(null);

    try {
      const { data, error } = await supabase
        .from("v_pendaftar")
        .select("*")
        .eq("no_hp", value)
        .maybeSingle();

      if (error || !data) {
        setMessage("❌ Data tidak ditemukan. Pastikan nomor HP benar.");
        return;
      }

      setData(data);
    } catch {
      setMessage("⚠️ Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (
    type: "dp" | "pelunasan" | "visa" | "tiket",
    value: string
  ) => {
    if (type === "dp" || type === "pelunasan") {
      if (value === "lunas") return "success";
      if (value === "pending" || value === "proses") return "pending";
      if (value === "gagal") return "failed";
    }
    if (type === "visa") {
      if (value === "approved") return "success";
      if (value === "pending") return "pending";
      if (value === "rejected") return "failed";
    }
    if (type === "tiket") {
      if (value === "issued") return "success";
      if (value === "pending") return "pending";
      if (value === "failed") return "failed";
    }
    return "unknown";
  };

  const TimelineStep = ({
    label,
    status,
  }: {
    label: string;
    status: string;
  }) => {
    let color = "bg-gray-300 border-gray-400 text-gray-700";
    if (status === "success")
      color = "bg-green-500 border-green-600 text-white";
    if (status === "pending")
      color = "bg-yellow-400 border-yellow-500 text-black";
    if (status === "failed") color = "bg-red-500 border-red-600 text-white";

    return (
      <div className="relative pl-10 pb-8 last:pb-0">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        <div
          className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 ${color}`}
        >
          ✓
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{label}</span>
          <span className="text-sm text-gray-500">
            {status === "success"
              ? "Selesai"
              : status === "pending"
              ? "Sedang diproses"
              : status === "failed"
              ? "Gagal"
              : "Belum ada data"}
          </span>
        </div>
      </div>
    );
  };

  const allFieldsExist =
    data &&
    "dp_status" in data &&
    "pelunasan_status" in data &&
    "visa_status" in data &&
    "tiket_status" in data;

  // hitung progress %
  const progressValue = data
    ? [
        getStepStatus("dp", data.dp_status),
        getStepStatus("pelunasan", data.pelunasan_status),
        getStepStatus("visa", data.visa_status),
        getStepStatus("tiket", data.tiket_status),
      ].filter((s) => s === "success").length * 25
    : 0;

  // warna progress
  let progressColor = "bg-green-500";
  if (data) {
    const statuses = [
      getStepStatus("dp", data.dp_status),
      getStepStatus("pelunasan", data.pelunasan_status),
      getStepStatus("visa", data.visa_status),
      getStepStatus("tiket", data.tiket_status),
    ];
    if (statuses.includes("failed")) {
      progressColor = "bg-red-500";
    } else if (statuses.includes("pending")) {
      progressColor = "bg-yellow-400";
    }
  }

  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tracking Status Jamaah</h1>

      {/* Input & tombol */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Masukkan No. HP"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCek()}
        />
        <Button onClick={handleCek} disabled={loading}>
          {loading ? "Mengecek..." : "Cek Status"}
        </Button>
      </div>

      {message && <p className="text-center text-red-600 mb-4">{message}</p>}

      {data && (
        <Card>
          <CardContent className="p-4 space-y-6">
            {/* Info Jamaah */}
            <div>
              <p className="font-semibold text-lg">{data.nama}</p>
              <p className="text-sm text-gray-500">{data.kode_pendaftaran}</p>
            </div>

            {/* Switch tampilan */}
            <div className="flex gap-2">
              <Button
                variant={view === "badge" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("badge")}
              >
                Progress Bar
              </Button>
              <Button
                variant={view === "timeline" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("timeline")}
              >
                Timeline
              </Button>
            </div>

            {/* Badge + Progress */}
            {view === "badge" && (
              <div className="mt-4 space-y-6">
                {/* Badge Ringkasan */}
                <div className="flex flex-wrap gap-2">
                  {"dp_status" in data && (
                    <Badge
                      variant={
                        getStepStatus("dp", data.dp_status) === "success"
                          ? "default"
                          : getStepStatus("dp", data.dp_status) === "failed"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      DP: {data.dp_status ?? "-"}
                    </Badge>
                  )}
                  {"pelunasan_status" in data && (
                    <Badge
                      variant={
                        getStepStatus("pelunasan", data.pelunasan_status) ===
                        "success"
                          ? "default"
                          : getStepStatus(
                              "pelunasan",
                              data.pelunasan_status
                            ) === "failed"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      Pelunasan: {data.pelunasan_status ?? "-"}
                    </Badge>
                  )}
                  {"visa_status" in data && (
                    <Badge
                      variant={
                        getStepStatus("visa", data.visa_status) === "success"
                          ? "default"
                          : getStepStatus("visa", data.visa_status) === "failed"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      Visa: {data.visa_status ?? "-"}
                    </Badge>
                  )}
                  {"tiket_status" in data && (
                    <Badge
                      variant={
                        getStepStatus("tiket", data.tiket_status) === "success"
                          ? "default"
                          : getStepStatus("tiket", data.tiket_status) ===
                            "failed"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      Tiket: {data.tiket_status ?? "-"}
                    </Badge>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${progressColor} h-3 transition-all duration-500`}
                    style={{ width: `${progressValue}%` }}
                  ></div>
                </div>

                {/* Label Step */}
                <div className="flex justify-between text-xs text-gray-600 font-medium">
                  <span>DP</span>
                  <span>Pelunasan</span>
                  <span>Visa</span>
                  <span>Tiket</span>
                </div>
              </div>
            )}

            {/* Timeline */}
            {view === "timeline" && allFieldsExist && (
              <div className="mt-6">
                <TimelineStep
                  label="DP"
                  status={getStepStatus("dp", data.dp_status)}
                />
                <TimelineStep
                  label="Pelunasan"
                  status={getStepStatus("pelunasan", data.pelunasan_status)}
                />
                <TimelineStep
                  label="Visa"
                  status={getStepStatus("visa", data.visa_status)}
                />
                <TimelineStep
                  label="Tiket"
                  status={getStepStatus("tiket", data.tiket_status)}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
