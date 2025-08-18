export default function Loading() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
      <p className="mt-4 text-muted-foreground">Memuat halaman...</p>
    </main>
  );
}
