export type Paket = {
  id: string;
  nama: string;
  harga: string | string[]; // kalau ada Quad/Triple/Double
  durasi: string;
  maskapai: string | string[];
  tanggal: string[];
  landing?: string | string[];
  gambar?: string; // URL gambar poster
  kategori?: string; // contoh: Silver, Premium
};

export const paketList: Paket[] = [
  // ===== SEPTEMBER 2025 =====
  {
    id: "sep-hematpol",
    nama: "Umroh Hematpol",
    harga: "23,5 jt",
    durasi: "9 Hari",
    maskapai: "Oman Air",
    tanggal: ["04 September 2025"],
    landing: "Madinah",
    gambar: "/paket/september-hematpol.jpg",
  },
  {
    id: "sep-seru1",
    nama: "Umroh Seru + Al Ula & Thaif",
    harga: "30,5 jt",
    durasi: "9 Hari",
    maskapai: "Qatar Airways",
    tanggal: ["06 September 2025"],
    landing: "Jeddah",
    gambar: "/paket/september-seru1.jpg",
  },
  {
    id: "sep-seru2",
    nama: "Umroh Seru + Al Ula & Thaif",
    harga: "30,5 jt",
    durasi: "9 Hari",
    maskapai: "Qatar Airways",
    tanggal: ["21 September 2025"],
    landing: "Thaif",
    gambar: "/paket/september-seru2.jpg",
  },

  // ===== OKTOBER 2025 =====
  {
    id: "okt-nyaman",
    nama: "Umroh Nyaman Harga Ringan",
    harga: "23,5 jt",
    durasi: "9 Hari",
    maskapai: ["Qatar Airways", "Oman Air"],
    tanggal: ["06 Oktober 2025", "23 Oktober 2025"],
    landing: ["Jeddah", "Madinah"],
    gambar: "/paket/oktober-nyaman.jpg",
  },
  {
    id: "okt-tenang",
    nama: "Umroh Tenang + Al Ula & Thaif",
    harga: "30,5 jt",
    durasi: "9 Hari",
    maskapai: ["Qatar Airways", "Oman Air"],
    tanggal: ["17 Oktober 2025", "23 Oktober 2025"],
    landing: ["Jeddah", "Madinah"],
    gambar: "/paket/oktober-tenang.jpg",
  },
  {
    id: "okt-manis",
    nama: "Umroh Manis Bonus Berlapis plus Qatar",
    harga: ["32,9 jt (Quad)", "34,9 jt (Triple)", "36,9 jt (Double)"],
    durasi: "10 Hari",
    maskapai: "Qatar Airways",
    tanggal: ["09 Oktober 2025"],
    landing: "Jeddah",
    gambar: "/paket/oktober-manis.jpg",
  },

  // ===== NOVEMBER 2025 =====
  {
    id: "nov-hematpol",
    nama: "Umroh Hematpol",
    harga: "23,5 jt",
    durasi: "9 Hari",
    maskapai: "Qatar Airways",
    tanggal: ["01 November 2025", "23 November 2025"],
    landing: "Jeddah",
    gambar: "/paket/november-hematpol.jpg",
  },
  {
    id: "nov-bahagia",
    nama: "Umroh Bahagia + Al Ula & Thaif",
    harga: "30,5 jt",
    durasi: "9 Hari",
    maskapai: "Qatar Airways",
    tanggal: ["01 November 2025", "21 November 2025", "23 November 2025"],
    landing: "Jeddah",
    gambar: "/paket/november-bahagia.jpg",
  },

  // ===== DESEMBER 2025 =====
  {
    id: "des-millenial",
    nama: "Umroh Millenial Harga Minimal",
    harga: ["25,5 jt (Madinah)", "28,5 jt (Jeddah)"],
    durasi: "9 Hari",
    maskapai: ["Qatar Airways", "Saudia"],
    tanggal: ["01 Desember 2025", "25 Desember 2025"],
    landing: ["Madinah", "Jeddah"],
    gambar: "/paket/desember-millenial.jpg",
  },
  {
    id: "des-asyik",
    nama: "Umroh Asyik Plus Al Ula & Thaif",
    harga: ["32,9 jt (Madinah)", "35,9 jt (Jeddah)"],
    durasi: "9 Hari",
    maskapai: ["Qatar Airways", "Saudia"],
    tanggal: ["01 Desember 2025", "25 Desember 2025"],
    landing: ["Madinah", "Jeddah"],
    gambar: "/paket/desember-asyik.jpg",
  },
  {
    id: "des-akhir-tahun",
    nama: "Umroh Akhir Tahun + Thaif & Al Ula",
    harga: [
      "35,9 jt (Silver Quad)",
      "37,9 jt (Silver Triple)",
      "39,9 jt (Silver Double)",
      "42,9 jt (Premium Quad)",
      "45,9 jt (Premium Triple)",
      "47,9 jt (Premium Double)",
    ],
    durasi: "9 Hari",
    maskapai: "Saudia",
    tanggal: ["25 Desember 2025"],
    landing: "Jeddah",
    gambar: "/paket/desember-akhir-tahun.jpg",
  },
];
