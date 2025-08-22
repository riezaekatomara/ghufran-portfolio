"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { type User } from "@supabase/supabase-js";

export default function Footer() {
  const [user, setUser] = useState<User | null>(null);

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
    <footer className="w-full bg-card py-8 mt-20 border-t">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Kolom 1: Logo & Copyright */}
        <div>
          <h3 className="text-2xl font-bold text-gradient-primary mb-2">
            GhufranTravel
          </h3>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ghufran Travel. All rights reserved.
          </p>
        </div>

        {/* Kolom 2: Menu Navigasi */}
        <div>
          <h4 className="font-semibold mb-3">Navigasi</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="/paket"
              className="hover:text-primary transition-colors"
            >
              Paket Umroh
            </Link>
            <Link
              href="/tentang"
              className="hover:text-primary transition-colors"
            >
              Tentang Kami
            </Link>
          </div>
        </div>

        {/* Kolom 3: Akun & Kontak */}
        <div>
          <h4 className="font-semibold mb-3">Akun</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="hover:text-primary transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="hover:text-primary transition-colors"
              >
                Dashboard Saya
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
