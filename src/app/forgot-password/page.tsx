"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Cek email untuk reset password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleForgotPassword}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Lupa Password</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2 rounded hover:opacity-90"
        >
          {loading ? "Loading..." : "Kirim Link Reset"}
        </button>
      </form>
    </div>
  );
}
