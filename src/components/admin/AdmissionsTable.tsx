"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import type { Admission } from "@/types/database";
import { X, Send } from "lucide-react";

const STATUSES = ["new", "contacted", "visit_scheduled", "admitted", "closed"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-sunshine-100 text-royal-900",
  contacted: "bg-royal-50 text-royal",
  visit_scheduled: "bg-leaf-100 text-leaf-700",
  admitted: "bg-leaf text-white",
  closed: "bg-royal-900/10 text-royal-900/60",
};

export default function AdmissionsTable({ admissions }: { admissions: Admission[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [active, setActive] = useState<Admission | null>(null);
  const [reply, setReply] = useState("");
  const [saving, setSaving] = useState(false);

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("admissions").update({ status }).eq("id", id);
    if (error) toast.error("Could not update status");
    else {
      toast.success("Status updated");
      router.refresh();
    }
  }

  async function sendReply() {
    if (!active) return;
    setSaving(true);
    const { error } = await supabase
      .from("admissions")
      .update({ admin_reply: reply, replied_at: new Date().toISOString(), status: "contacted" })
      .eq("id", active.id);
    setSaving(false);
    if (error) {
      toast.error("Could not save reply");
    } else {
      toast.success("Reply saved");
      setActive(null);
      setReply("");
      router.refresh();
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-rung bg-white shadow-soft">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-royal-50">
            <tr>
              <th className="px-5 py-3 font-display font-bold text-royal-900">Child</th>
              <th className="px-5 py-3 font-display font-bold text-royal-900">Program</th>
              <th className="px-5 py-3 font-display font-bold text-royal-900">Parent</th>
              <th className="px-5 py-3 font-display font-bold text-royal-900">Phone</th>
              <th className="px-5 py-3 font-display font-bold text-royal-900">Submitted</th>
              <th className="px-5 py-3 font-display font-bold text-royal-900">Status</th>
              <th className="px-5 py-3 font-display font-bold text-royal-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((a) => (
              <tr key={a.id} className="border-t border-royal-50">
                <td className="px-5 py-3 font-semibold text-royal-900">{a.child_name}</td>
                <td className="px-5 py-3 text-royal-900/70">{a.program}</td>
                <td className="px-5 py-3 text-royal-900/70">{a.parent_name}</td>
                <td className="px-5 py-3 text-royal-900/70">
                  <a href={`tel:${a.phone}`} className="hover:text-royal">{a.phone}</a>
                </td>
                <td className="px-5 py-3 text-royal-900/60">
                  {new Date(a.created_at).toLocaleDateString("en-IN")}
                </td>
                <td className="px-5 py-3">
                  <select
                    value={a.status}
                    onChange={(e) => updateStatus(a.id, e.target.value)}
                    className={`!w-auto rounded-full !border-0 px-3 !py-1.5 text-xs font-bold ${STATUS_COLORS[a.status]}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s.replace("_", " ")}</option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => { setActive(a); setReply(a.admin_reply || ""); }}
                    className="text-xs font-bold text-royal underline"
                  >
                    View / Reply
                  </button>
                </td>
              </tr>
            ))}
            {admissions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-royal-900/50">
                  No admission enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-royal-900/50 p-5">
          <div className="w-full max-w-lg rounded-rung bg-white p-7 shadow-soft-lg">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl font-bold text-royal-900">{active.child_name}</h2>
              <button onClick={() => setActive(null)} aria-label="Close">
                <X className="h-5 w-5 text-royal-900/50" />
              </button>
            </div>
            <div className="mt-4 space-y-1.5 text-sm text-royal-900/70">
              <p><strong>Program:</strong> {active.program}</p>
              <p><strong>Parent:</strong> {active.parent_name}</p>
              <p><strong>Phone:</strong> {active.phone}</p>
              {active.email && <p><strong>Email:</strong> {active.email}</p>}
              {active.address && <p><strong>Address:</strong> {active.address}</p>}
              {active.message && <p><strong>Message:</strong> {active.message}</p>}
            </div>
            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-semibold text-royal-900">Internal Reply / Notes</label>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={4}
                placeholder="e.g. Called parent, visit scheduled for Monday 10 AM"
              />
            </div>
            <button onClick={sendReply} disabled={saving} className="btn-primary mt-4 w-full">
              <Send className="h-4 w-4" /> {saving ? "Saving..." : "Save Reply"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
