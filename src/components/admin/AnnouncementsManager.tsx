"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import type { Announcement } from "@/types/database";
import { Plus, Trash2, Loader2, Eye, EyeOff } from "lucide-react";

export default function AnnouncementsManager({ initialAnnouncements }: { initialAnnouncements: Announcement[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", ends_at: "" });

  async function addAnnouncement(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.message) return;
    setSaving(true);
    const { error } = await supabase.from("announcements").insert({
      title: form.title,
      message: form.message,
      ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
    });
    setSaving(false);
    if (error) toast.error("Could not post announcement");
    else {
      toast.success("Announcement posted — it's now live on the website");
      setForm({ title: "", message: "", ends_at: "" });
      router.refresh();
    }
  }

  async function toggleActive(a: Announcement) {
    const { error } = await supabase.from("announcements").update({ is_active: !a.is_active }).eq("id", a.id);
    if (error) toast.error("Could not update");
    else router.refresh();
  }

  async function deleteAnnouncement(id: string) {
    if (!confirm("Delete this announcement?")) return;
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) toast.error("Could not delete");
    else {
      toast.success("Deleted");
      router.refresh();
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <form onSubmit={addAnnouncement} className="rung-card h-fit space-y-4 p-6">
        <h2 className="font-display font-bold text-royal-900">Post New Announcement</h2>
        <input placeholder="Title (e.g. Holiday Notice) *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea rows={3} placeholder="Message *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        <div>
          <label className="mb-1 block text-xs font-semibold text-royal-900/60">Auto-hide after (optional)</label>
          <input type="date" value={form.ends_at} onChange={(e) => setForm({ ...form, ends_at: e.target.value })} />
        </div>
        <button type="submit" disabled={saving} className="btn-primary w-full">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Post Announcement
        </button>
      </form>

      <div className="space-y-3">
        {initialAnnouncements.map((a) => (
          <div key={a.id} className="rung-card flex items-start justify-between gap-4 p-5">
            <div>
              <p className="font-display font-bold text-royal-900">{a.title}</p>
              <p className="mt-1 text-sm text-royal-900/70">{a.message}</p>
              <p className="mt-1 text-xs text-royal-900/40">
                Posted {new Date(a.created_at).toLocaleDateString("en-IN")}
                {a.ends_at ? ` · hides after ${new Date(a.ends_at).toLocaleDateString("en-IN")}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => toggleActive(a)} className="text-royal-900/40 hover:text-royal" title={a.is_active ? "Hide from site" : "Show on site"}>
                {a.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button onClick={() => deleteAnnouncement(a.id)} className="text-royal-900/40 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {initialAnnouncements.length === 0 && <p className="text-royal-900/50">No announcements posted yet.</p>}
      </div>
    </div>
  );
}
