"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser(data.session.user);
      }
    });
  }, []);

  async function handleLogout() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <ProtectedRoute>
      <main className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-extrabold mb-8 text-gradient-primary">
          Dashboard Anda
        </h1>

        {user && (
          <div className="rounded-xl border-gradient-primary bg-card p-8 shadow-lg mb-8 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email Terdaftar</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nama Pengguna</p>
              <p className="text-lg font-semibold">
                {user.user_metadata?.full_name || "Belum diatur"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Terakhir Login</p>
              <p className="text-lg font-semibold">
                {new Date(user.last_sign_in_at).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </main>
    </ProtectedRoute>
  );
}
