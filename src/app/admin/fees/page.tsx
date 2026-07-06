import { createClient } from "@/lib/supabase/server";
import type { FeeStructure } from "@/types/database";
import FeesManager from "@/components/admin/FeesManager";

export default async function AdminFeesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("fee_structure").select("*").order("program");

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-royal-900">Fee Structure</h1>
      <p className="mt-1 text-sm text-royal-900/60">Update fees for each program. Changes go live immediately.</p>
      <div className="mt-6">
        <FeesManager initialFees={(data as FeeStructure[]) || []} />
      </div>
    </div>
  );
}
