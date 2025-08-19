"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);

      if (data.session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.session.user.id)
          .single();

        setRole(profile?.role || "user");
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          setRole(profile?.role || "user");
        } else {
          setRole(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b shadow px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Ghufran Travel
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/daftar" className="hover:underline">
          Daftar
        </Link>

        {!session && (
          <>
            <Link
              href="/login"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}

        {session && (
          <>
            {role === "admin" && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
