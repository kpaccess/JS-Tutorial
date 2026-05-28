import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/layout/DashboardNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <DashboardNav user={user} />
      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </div>
    </div>
  );
}
