// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { type Session } from "@supabase/supabase-js";

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.refresh(); // Gunakan refresh untuk reload server component
  };

  return (
    // EFEK BARU: Sticky & Glassmorphism
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b bg-card/80 backdrop-blur-lg">
      <Link href="/" className="text-xl font-bold text-foreground">
        GhufranTravel
      </Link>

      <div className="flex items-center gap-4 text-sm font-medium">
        <Link
          href="/paket"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Paket
        </Link>
        <Link
          href="/testimoni"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Testimoni
        </Link>
        <Link
          href="/tracking"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Tracking
        </Link>

        {!session ? (
          <>
            {/* GAYA TOMBOL BARU */}
            <Link
              href="/login"
              className="px-4 py-2 rounded-md hover:bg-accent transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-destructive text-primary-foreground hover:opacity-90"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
