"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        🕋 Ghufran Travel
      </Link>

      <div className="flex gap-4 items-center">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "text-blue-600 font-semibold" : "text-gray-700"
          }`}
        >
          Home
        </Link>
        <Link
          href="/daftar"
          className={`${
            pathname.startsWith("/daftar")
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          Daftar
        </Link>

        {user ? (
          <>
            <Link
              href="/dashboard"
              className={`${
                pathname.startsWith("/dashboard")
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
