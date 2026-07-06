import { createClient } from "@/lib/supabase/server";
import type { Teacher } from "@/types/database";
import TeachersManager from "@/components/admin/TeachersManager";

export default async function AdminTeachersPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("teachers").select("*").order("sort_order");

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-royal-900">Teachers</h1>
      <p className="mt-1 text-sm text-royal-900/60">Manage teacher profiles shown on the public site.</p>
      <div className="mt-6">
        <TeachersManager initialTeachers={(data as Teacher[]) || []} />
      </div>
    </div>
  );
}
