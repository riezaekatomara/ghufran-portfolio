export default function LoadingPaket() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary border-solid"></div>
      <p className="mt-3 text-sm text-muted-foreground">
        Sedang memuat detail paket...
      </p>
    </div>
  );
}
