"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    });
  }, [router]);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {user && <p>Selamat datang, {user.email}</p>}
      <a
        href="/logout"
        className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </a>
    </main>
  );
}
