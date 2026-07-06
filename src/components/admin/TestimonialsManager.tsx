"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import type { Testimonial } from "@/types/database";
import { Plus, Trash2, Loader2, EyeOff, Eye } from "lucide-react";

export default function TestimonialsManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ parent_name: "", child_name: "", program: "", content: "", rating: "5" });

  async function addTestimonial(e: React.FormEvent) {
    e.preventDefault();
    if (!form.parent_name || !form.content) return;
    setSaving(true);
    const { error } = await supabase.from("testimonials").insert({
      ...form,
      rating: Number(form.rating),
      sort_order: initialTestimonials.length + 1,
    });
    setSaving(false);
    if (error) toast.error("Could not add testimonial");
    else {
      toast.success("Testimonial added");
      setForm({ parent_name: "", child_name: "", program: "", content: "", rating: "5" });
      router.refresh();
    }
  }

  async function togglePublish(t: Testimonial) {
    const { error } = await supabase.from("testimonials").update({ is_published: !t.is_published }).eq("id", t.id);
    if (error) toast.error("Could not update");
    else router.refresh();
  }

  async function deleteTestimonial(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) toast.error("Could not delete");
    else {
      toast.success("Deleted");
      router.refresh();
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <form onSubmit={addTestimonial} className="rung-card h-fit space-y-4 p-6">
        <h2 className="font-display font-bold text-royal-900">Add Testimonial</h2>
        <input placeholder="Parent name *" value={form.parent_name} onChange={(e) => setForm({ ...form, parent_name: e.target.value })} required />
        <input placeholder="Child name" value={form.child_name} onChange={(e) => setForm({ ...form, child_name: e.target.value })} />
        <input placeholder="Program (e.g. UKG)" value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} />
        <textarea rows={3} placeholder="Review content *" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
        <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
          {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
        </select>
        <button type="submit" disabled={saving} className="btn-primary w-full">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add Testimonial
        </button>
      </form>

      <div className="space-y-3">
        {initialTestimonials.map((t) => (
          <div key={t.id} className="rung-card flex items-start justify-between gap-4 p-5">
            <div>
              <p className="font-display font-bold text-royal-900">{t.parent_name} <span className="text-xs font-normal text-royal-900/50">({t.rating}★)</span></p>
              <p className="mt-1 text-sm text-royal-900/70">{t.content}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => togglePublish(t)} className="text-royal-900/40 hover:text-royal" title={t.is_published ? "Unpublish" : "Publish"}>
                {t.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button onClick={() => deleteTestimonial(t.id)} className="text-royal-900/40 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {initialTestimonials.length === 0 && <p className="text-royal-900/50">No testimonials yet.</p>}
      </div>
    </div>
  );
}
