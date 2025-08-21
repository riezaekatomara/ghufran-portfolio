export default function LoadingPaketDetail() {
  return (
    <main className="container mx-auto px-4 py-12 animate-pulse">
      {/* Judul */}
      <div className="h-8 w-2/3 bg-gray-200 rounded mb-6" />

      {/* Gambar utama */}
      <div className="w-full max-h-96 h-64 bg-gray-200 rounded-xl mb-8" />

      {/* Detail paket */}
      <div className="space-y-3">
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
        <div className="h-4 w-2/5 bg-gray-200 rounded" />
      </div>

      {/* Tombol daftar & kembali */}
      <div className="mt-6 flex gap-3">
        <div className="h-9 w-32 bg-gray-200 rounded" />
        <div className="h-9 w-40 bg-gray-200 rounded" />
      </div>

      {/* Link kembali ke semua paket */}
      <div className="mt-8">
        <div className="h-4 w-48 bg-gray-200 rounded" />
      </div>
    </main>
  );
}
