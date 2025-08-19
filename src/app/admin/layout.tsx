import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground p-6">
        <h2 className="text-lg font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-3">
          <Link href="/admin" className="block hover:underline">
            📋 Pendaftar
          </Link>
          <Link href="/" className="block hover:underline">
            ← Kembali ke Website
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
