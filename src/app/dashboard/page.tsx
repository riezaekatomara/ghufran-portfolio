"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import type { Session, SupabaseClient, AuthError } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const supabase: SupabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    supabase.auth
      .getSession()
      .then(
        (res: {
          data: { session: Session | null };
          error: AuthError | null;
        }) => {
          if (!res.data.session) {
            router.replace("/login");
          } else {
            setSession(res.data.session);
          }
        }
      );
  }, [router]);

  async function handleLogout() {
    const supabase: SupabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (!session) {
    return <p className="p-6">Memuat...</p>;
  }

  const user = session.user;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="rounded-lg border p-4 mb-6">
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Nama:</span>{" "}
          {user.user_metadata?.full_name || "-"}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-500 text-white px-4 py-2"
      >
        Logout
      </button>
    </main>
  );
}
