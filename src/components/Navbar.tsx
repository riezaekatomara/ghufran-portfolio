"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { type User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/paket", label: "Paket Umroh" },
    { href: "/tentang", label: "Tentang Kami" },
    { href: "/testimoni", label: "Testimoni" },
    { href: "/tracking", label: "Tracking" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo dengan animasi */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            GhufranTravel
          </Link>
        </motion.div>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6 text-base font-medium">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative group transition-colors duration-300"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* User + DarkMode */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login" className="hover:text-primary transition">
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/80 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/80 transition"
            >
              Dashboard
            </Link>
          )}

          <DarkModeToggle />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-card border-t px-6 py-4 flex flex-col gap-4 shadow-inner"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="hover:text-primary transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded bg-primary text-white text-center hover:bg-primary/80 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded bg-primary text-white text-center hover:bg-primary/80 transition"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            <div className="pt-2">
              <DarkModeToggle />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
