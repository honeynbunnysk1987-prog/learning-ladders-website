"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import type { SchoolEvent } from "@/types/database";
import { Plus, Trash2, Loader2 } from "lucide-react";

const TYPES = ["general", "holiday", "celebration", "sports", "academic"] as const;

export default function EventsManager({ initialEvents }: { initialEvents: SchoolEvent[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    event_date: "",
    event_type: "general",
  });

  async function addEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.event_date) return;
    setSaving(true);
    const { error } = await supabase.from("events").insert(form);
    setSaving(false);
    if (error) toast.error("Could not add event");
    else {
      toast.success("Event added");
      setForm({ title: "", description: "", event_date: "", event_type: "general" });
      router.refresh();
    }
  }

  async function deleteEvent(id: string) {
    if (!confirm("Delete this event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) toast.error("Could not delete event");
    else {
      toast.success("Event deleted");
      router.refresh();
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <form onSubmit={addEvent} className="rung-card h-fit space-y-4 p-6">
        <h2 className="font-display font-bold text-royal-900">Add New Event</h2>
        <div>
          <label className="mb-1 block text-sm font-semibold text-royal-900">Title *</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-royal-900">Date *</label>
          <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-royal-900">Type</label>
          <select value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-royal-900">Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button type="submit" disabled={saving} className="btn-primary w-full">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add Event
        </button>
      </form>

      <div className="rung-card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-royal-50">
            <tr>
              <th className="px-5 py-3 font-display font-bold text-royal-900">Title</th>
              <th className="px-5 py-3 font-display font-bold text-royal-900">Date</th>
              <th className="px-5 py-3 font-display font-bold text-royal-900">Type</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {initialEvents.map((ev) => (
              <tr key={ev.id} className="border-t border-royal-50">
                <td className="px-5 py-3 font-semibold text-royal-900">{ev.title}</td>
                <td className="px-5 py-3 text-royal-900/70">{new Date(ev.event_date).toLocaleDateString("en-IN")}</td>
                <td className="px-5 py-3 capitalize text-royal-900/70">{ev.event_type}</td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => deleteEvent(ev.id)} className="text-royal-900/40 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {initialEvents.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-royal-900/50">No events yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
