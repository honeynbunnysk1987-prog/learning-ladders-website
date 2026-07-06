"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-royal-900 px-5">
      <div className="w-full max-w-md rounded-rung bg-white p-8 shadow-soft-lg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-rung bg-royal-50">
          <Lock className="h-6 w-6 text-royal" />
        </div>
        <h1 className="mt-4 text-center font-display text-2xl font-bold text-royal-900">
          Admin Login
        </h1>
        <p className="mt-1 text-center text-sm text-royal-900/60">
          Learning Ladders Preprimary School
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-royal-900">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@learningladders.school"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-royal-900">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
