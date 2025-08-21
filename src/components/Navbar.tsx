"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient, type Session } from "@supabase/ssr";

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  // Init Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Cek session user
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        GhufranTravel
      </Link>

      {/* Menu kanan */}
      <div className="flex gap-4">
        <Link href="/daftar" className="hover:text-blue-500">
          Daftar Paket
        </Link>
        <Link href="/testimoni" className="hover:text-blue-500">
          Testimoni
        </Link>
        <Link href="/tracking" className="hover:text-blue-500">
          Tracking
        </Link>

        {!session ? (
          <>
            <Link
              href="/login"
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-3 py-1 rounded border border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
