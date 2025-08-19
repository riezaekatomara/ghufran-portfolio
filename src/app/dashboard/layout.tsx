import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // ✅ kalau mau lebih aman → cek metadata role
  // if (session.user.user_metadata.role !== "admin") redirect("/login");

  return <>{children}</>;
}
