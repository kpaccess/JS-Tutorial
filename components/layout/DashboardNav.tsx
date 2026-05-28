"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

export default function DashboardNav({ user }: { user: User }) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="border-b border-white/10 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between h-16">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-yellow-400 text-xl font-black">⚡ JS</span>
          <span className="text-white font-bold hidden sm:block">Mastery</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm transition-colors">
            Dashboard
          </Link>
          <Link href="/dashboard/progress" className="text-slate-400 hover:text-white text-sm transition-colors">
            Progress
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-sm hidden sm:block truncate max-w-[160px]">
            {user.user_metadata?.full_name || user.email}
          </span>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="border-white/20 text-slate-300 hover:text-white hover:bg-white/10"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
}
