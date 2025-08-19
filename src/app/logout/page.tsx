"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      await supabase.auth.signOut();
      router.push("/login");
    };
    doLogout();
  }, [router]);

  return (
    <main className="flex items-center justify-center h-screen">
      <p className="text-lg">Sedang logout...</p>
    </main>
  );
}
