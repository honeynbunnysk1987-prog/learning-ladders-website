"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import type { FeeStructure } from "@/types/database";
import { Save, Loader2 } from "lucide-react";

export default function FeesManager({ initialFees }: { initialFees: FeeStructure[] }) {
  const supabase = createClient();
  const [fees, setFees] = useState(initialFees);
  const [savingId, setSavingId] = useState<string | null>(null);

  function update(id: string, field: keyof FeeStructure, value: string) {
    setFees((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value === "" ? null : Number(value) } : f))
    );
  }

  async function save(fee: FeeStructure) {
    setSavingId(fee.id);
    const { error } = await supabase
      .from("fee_structure")
      .update({
        admission_fee: fee.admission_fee,
        tuition_fee_term: fee.tuition_fee_term,
        annual_fee: fee.annual_fee,
        transport_fee_term: fee.transport_fee_term,
        updated_at: new Date().toISOString(),
      })
      .eq("id", fee.id);
    setSavingId(null);
    if (error) toast.error("Could not save fees");
    else toast.success(`${fee.program} fees updated`);
  }

  return (
    <div className="space-y-5">
      {fees.map((fee) => (
        <div key={fee.id} className="rung-card grid gap-4 p-6 sm:grid-cols-5 sm:items-end">
          <div>
            <p className="font-display font-bold text-royal-900">{fee.program}</p>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-royal-900/60">Admission Fee</label>
            <input type="number" value={fee.admission_fee} onChange={(e) => update(fee.id, "admission_fee", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-royal-900/60">Tuition / Term</label>
            <input type="number" value={fee.tuition_fee_term} onChange={(e) => update(fee.id, "tuition_fee_term", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-royal-900/60">Annual Fee</label>
            <input type="number" value={fee.annual_fee} onChange={(e) => update(fee.id, "annual_fee", e.target.value)} />
          </div>
          <button onClick={() => save(fee)} disabled={savingId === fee.id} className="btn-primary !py-2.5">
            {savingId === fee.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
          </button>
        </div>
      ))}
    </div>
  );
}
