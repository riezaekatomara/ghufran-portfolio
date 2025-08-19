"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Password berhasil diubah!");
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleResetPassword}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

        <input
          type="password"
          placeholder="Password Baru"
          className="w-full border p-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2 rounded hover:opacity-90"
        >
          {loading ? "Loading..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
