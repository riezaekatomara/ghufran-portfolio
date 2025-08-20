"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Navbar() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <div className="flex gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {user && (
          <>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            {user.user_metadata?.role === "admin" && (
              <Link href="/admin" className="hover:underline">
                Admin
              </Link>
            )}
          </>
        )}
      </div>
      <div>
        {user ? (
          <Link href="/logout" className="hover:underline">
            Logout
          </Link>
        ) : (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
