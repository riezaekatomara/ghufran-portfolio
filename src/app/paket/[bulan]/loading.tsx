export default function LoadingBulanPage() {
  return (
    <main className="container mx-auto px-4 py-12 animate-pulse">
      {/* Judul bulan */}
      <div className="h-8 w-1/3 bg-gray-200 rounded mb-8" />

      {/* Grid paket per bulan */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-card rounded-xl shadow overflow-hidden">
            {/* Gambar */}
            <div className="w-full h-48 bg-gray-200" />

            {/* Konten */}
            <div className="p-5 space-y-3">
              <div className="h-5 w-2/3 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
              <div className="h-4 w-1/4 bg-gray-200 rounded" />
              <div className="h-9 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Tombol kembali */}
      <div className="mt-10 flex gap-4">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
      </div>
    </main>
  );
}
