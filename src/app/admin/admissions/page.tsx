import { createClient } from "@/lib/supabase/server";
import type { Admission } from "@/types/database";
import AdmissionsTable from "@/components/admin/AdmissionsTable";

export default async function AdminAdmissionsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("admissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-royal-900">Admission Enquiries</h1>
      <p className="mt-1 text-sm text-royal-900/60">
        View submissions, update status, and reply to parents.
      </p>
      <div className="mt-6">
        <AdmissionsTable admissions={(data as Admission[]) || []} />
      </div>
    </div>
  );
}
