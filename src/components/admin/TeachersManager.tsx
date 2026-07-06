"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import type { Teacher } from "@/types/database";
import { Plus, Trash2, Loader2 } from "lucide-react";

export default function TeachersManager({ initialTeachers }: { initialTeachers: Teacher[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", designation: "", qualification: "", experience_years: "", bio: "" });

  async function addTeacher(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.designation) return;
    setSaving(true);
    const { error } = await supabase.from("teachers").insert({
      ...form,
      experience_years: Number(form.experience_years) || 0,
      sort_order: initialTeachers.length + 1,
    });
    setSaving(false);
    if (error) toast.error("Could not add teacher");
    else {
      toast.success("Teacher added");
      setForm({ name: "", designation: "", qualification: "", experience_years: "", bio: "" });
      router.refresh();
    }
  }

  async function deleteTeacher(id: string) {
    if (!confirm("Remove this teacher profile?")) return;
    const { error } = await supabase.from("teachers").delete().eq("id", id);
    if (error) toast.error("Could not delete");
    else {
      toast.success("Teacher removed");
      router.refresh();
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <form onSubmit={addTeacher} className="rung-card h-fit space-y-4 p-6">
        <h2 className="font-display font-bold text-royal-900">Add Teacher</h2>
        <input placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Designation *" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} required />
        <input placeholder="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
        <input type="number" placeholder="Years of experience" value={form.experience_years} onChange={(e) => setForm({ ...form, experience_years: e.target.value })} />
        <textarea rows={3} placeholder="Short bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        <button type="submit" disabled={saving} className="btn-primary w-full">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add Teacher
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2">
        {initialTeachers.map((t) => (
          <div key={t.id} className="rung-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display font-bold text-royal-900">{t.name}</p>
                <p className="text-xs font-semibold text-leaf-600">{t.designation}</p>
              </div>
              <button onClick={() => deleteTeacher(t.id)} className="text-royal-900/40 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-xs text-royal-900/60">{t.qualification} · {t.experience_years} yrs</p>
          </div>
        ))}
        {initialTeachers.length === 0 && <p className="text-royal-900/50">No teachers added yet.</p>}
      </div>
    </div>
  );
}
