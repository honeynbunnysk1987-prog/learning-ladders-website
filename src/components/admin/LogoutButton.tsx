"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className={
        compact
          ? "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-royal-900"
          : "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
      }
    >
      <LogOut className="h-4 w-4" /> Log Out
    </button>
  );
}
