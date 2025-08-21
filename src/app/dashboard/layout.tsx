// src/app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Paket", href: "/dashboard/paket" },
    { name: "Pesanan", href: "/dashboard/pesanan" },
    { name: "Testimoni", href: "/dashboard/testimoni" },
    { name: "Pengaturan", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 font-bold text-lg border-b">Ghufran Admin</div>
        <nav className="flex flex-col p-2 space-y-1">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-md hover:bg-gray-200 ${
                pathname === item.href ? "bg-gray-300 font-medium" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Konten utama */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
