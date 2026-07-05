"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

type LogoutButtonProps = {
  compact?: boolean;
};

export default function LogoutButton({ compact = false }: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      title={compact ? "Log out" : undefined}
      aria-label={compact ? "Log out" : undefined}
      disabled={isLoading}
      onClick={handleLogout}
      className={
        compact
          ? "flex size-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-60"
          : "flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-60"
      }
    >
      <LogOut aria-hidden="true" className="size-5" />
      {!compact && (isLoading ? "Logging out..." : "Log out")}
    </button>
  );
}
