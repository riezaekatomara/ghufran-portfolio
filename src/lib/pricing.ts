export type SubPaket = {
  slug: string;
  nama: string;
  harga: string | string[];
  durasi: string;
  maskapai: string | string[];
  tanggal: string[];
  landing?: string | string[];
};

export type PaketBulanan = {
  slug: string;
  nama: string;
  gambar: string;
  paket: SubPaket[];
};

export const paketBulanan: PaketBulanan[] = [
  // 1. September
  {
    slug: "september",
    nama: "Paket Umroh September 2025",
    gambar: "/paket/september.jpg",
    paket: [
      {
        slug: "hematpol",
        nama: "Umroh Hematpol",
        harga: "23,5 jt",
        durasi: "9 Hari",
        maskapai: "Oman Air",
        tanggal: ["04 September 2025"],
        landing: "Madinah",
      },
      {
        slug: "seru1",
        nama: "Umroh Seru + Al Ula & Thaif",
        harga: "30,5 jt",
        durasi: "9 Hari",
        maskapai: "Qatar Airways",
        tanggal: ["06 September 2025"],
        landing: "Jeddah",
      },
      {
        slug: "seru2",
        nama: "Umroh Seru + Al Ula & Thaif",
        harga: "30,5 jt",
        durasi: "9 Hari",
        maskapai: "Qatar Airways",
        tanggal: ["21 September 2025"],
        landing: "Thaif",
      },
    ],
  },

  // 2. Oktober
  {
    slug: "oktober",
    nama: "Paket Umroh Oktober 2025",
    gambar: "/paket/oktober.jpg",
    paket: [
      {
        slug: "nyaman",
        nama: "Umroh Nyaman Harga Ringan",
        harga: "23,5 jt",
        durasi: "9 Hari",
        maskapai: ["Qatar Airways", "Oman Air"],
        tanggal: ["06 Oktober 2025", "23 Oktober 2025"],
        landing: ["Jeddah", "Madinah"],
      },
      {
        slug: "tenang",
        nama: "Umroh Tenang + Al Ula & Thaif",
        harga: "30,5 jt",
        durasi: "9 Hari",
        maskapai: ["Qatar Airways", "Oman Air"],
        tanggal: ["17 Oktober 2025", "23 Oktober 2025"],
        landing: ["Jeddah", "Madinah"],
      },
    ],
  },

  // 3. Oktober Plus Qatar (khusus Umroh Manis)
  {
    slug: "oktober-plus-qatar",
    nama: "Paket Umroh Oktober Plus Qatar",
    gambar: "/paket/oktober-manis-bonus-berlapis-qatar.jpg",
    paket: [
      {
        slug: "manis",
        nama: "Umroh Manis Bonus Berlapis plus Qatar",
        harga: ["32,9 jt (Quad)", "34,9 jt (Triple)", "36,9 jt (Double)"],
        durasi: "10 Hari",
        maskapai: "Qatar Airways",
        tanggal: ["09 Oktober 2025"],
        landing: "Jeddah",
      },
    ],
  },

  // 4. November
  {
    slug: "november",
    nama: "Paket Umroh November 2025",
    gambar: "/paket/november.jpg",
    paket: [
      {
        slug: "hematpol",
        nama: "Umroh Hematpol",
        harga: "23,5 jt",
        durasi: "9 Hari",
        maskapai: "Qatar Airways",
        tanggal: ["01 November 2025", "23 November 2025"],
        landing: "Jeddah",
      },
      {
        slug: "bahagia",
        nama: "Umroh Bahagia + Al Ula & Thaif",
        harga: "30,5 jt",
        durasi: "9 Hari",
        maskapai: "Qatar Airways",
        tanggal: ["01 November 2025", "21 November 2025", "23 November 2025"],
        landing: "Jeddah",
      },
    ],
  },

  // 5. Desember
  {
    slug: "desember",
    nama: "Paket Umroh Desember 2025",
    gambar: "/paket/desember.jpg",
    paket: [
      {
        slug: "millenial",
        nama: "Umroh Millenial Harga Minimal",
        harga: ["25,5 jt (Madinah)", "28,5 jt (Jeddah)"],
        durasi: "9 Hari",
        maskapai: ["Qatar Airways", "Saudia"],
        tanggal: ["01 Desember 2025", "25 Desember 2025"],
        landing: ["Madinah", "Jeddah"],
      },
      {
        slug: "asyik",
        nama: "Umroh Asyik Plus Al Ula & Thaif",
        harga: ["32,9 jt (Madinah)", "35,9 jt (Jeddah)"],
        durasi: "9 Hari",
        maskapai: ["Qatar Airways", "Saudia"],
        tanggal: ["01 Desember 2025", "25 Desember 2025"],
        landing: ["Madinah", "Jeddah"],
      },
    ],
  },

  // 6. Desember Akhir Tahun
  {
    slug: "desember-akhir-tahun",
    nama: "Paket Umroh Desember Akhir Tahun 2025",
    gambar: "/paket/desember-akhir-tahun-thaif-al-ula.jpg",
    paket: [
      {
        slug: "akhir-tahun",
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
      },
    ],
  },
];