import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // 🔑 Ambil session Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ✅ Daftar halaman yang butuh login
  const protectedPaths = ["/dashboard", "/admin"];
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !session) {
    // kalau belum login → redirect ke halaman login
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname); // optional, biar bisa balik lagi setelah login
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// ✅ Middleware hanya jalan di route tertentu (hemat performa)
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
