"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    if (error) {
      setMessage("❌ " + error.message);
    } else {
      setMessage("✅ Link reset password telah dikirim ke email Anda.");
    }
    setLoading(false);
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleReset}
        className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Lupa Password</h1>

        {message && <p className="text-center text-sm">{message}</p>}

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Mengirim..." : "Kirim Link Reset"}
        </button>

        <p className="text-sm text-center mt-2">
          <a href="/login" className="text-blue-600 hover:underline">
            Kembali ke Login
          </a>
        </p>
      </form>
    </main>
  );
}
