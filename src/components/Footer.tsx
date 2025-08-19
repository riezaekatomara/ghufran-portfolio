"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Footer() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <footer className="w-full bg-gray-100 py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-lg mb-4 md:mb-0">GhufranTravel</div>

        {/* Menu Footer */}
        <div className="flex gap-4 mb-4 md:mb-0">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/#paket" className="hover:underline">
            Paket
          </Link>
          <Link href="/tentang" className="hover:underline">
            Tentang
          </Link>
          <Link href="/kontak" className="hover:underline">
            Kontak
          </Link>
        </div>

        {/* 🔹 Kondisi Login */}
        <div className="flex gap-3">
          {!user ? (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-4">
        © {new Date().getFullYear()} GhufranTravel. All rights reserved.
      </div>
    </footer>
  );
}
