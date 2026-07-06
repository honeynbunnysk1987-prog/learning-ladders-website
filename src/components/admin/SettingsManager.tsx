"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import type { WebsiteSettings } from "@/types/database";
import { Save, Loader2, Upload } from "lucide-react";

export default function SettingsManager({ settings }: { settings: WebsiteSettings }) {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingBrochure, setUploadingBrochure] = useState(false);
  const [uploadingTimetable, setUploadingTimetable] = useState(false);

  function set<K extends keyof WebsiteSettings>(key: K, value: WebsiteSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadFile(file: File, bucket: string, folder: string) {
    const path = `${folder}/${Date.now()}-${file.name.replace(/\s/g, "-")}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleHeroUpload(file: File | undefined) {
    if (!file) return;
    setUploadingHero(true);
    try {
      const url = await uploadFile(file, "media", "hero");
      set("hero_image_url", url);
      toast.success("Hero image uploaded — remember to Save Changes");
    } catch {
      toast.error("Upload failed. Make sure the 'media' storage bucket exists and is public.");
    } finally {
      setUploadingHero(false);
    }
  }

  async function handleBrochureUpload(file: File | undefined) {
    if (!file) return;
    setUploadingBrochure(true);
    try {
      const url = await uploadFile(file, "media", "brochure");
      set("brochure_pdf_url", url);
      toast.success("Brochure uploaded — remember to Save Changes");
    } catch {
      toast.error("Upload failed. Make sure the 'media' storage bucket exists and is public.");
    } finally {
      setUploadingBrochure(false);
    }
  }

  async function handleTimetableUpload(file: File | undefined) {
    if (!file) return;
    setUploadingTimetable(true);
    try {
      const url = await uploadFile(file, "media", "timetable");
      set("timetable_image_url", url);
      toast.success("Timetable uploaded — remember to Save Changes");
    } catch {
      toast.error("Upload failed. Make sure the 'media' storage bucket exists and is public.");
    } finally {
      setUploadingTimetable(false);
    }
  }

  async function save() {
    setSaving(true);
    const { id, ...updates } = form;
    const { error } = await supabase.from("website_settings").update(updates).eq("id", 1);
    setSaving(false);
    if (error) toast.error("Could not save settings");
    else {
      toast.success("Settings saved");
      router.refresh();
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <section className="rung-card space-y-4 p-6">
        <h2 className="font-display font-bold text-royal-900">Homepage Banner</h2>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Headline</label>
          <input value={form.hero_headline} onChange={(e) => set("hero_headline", e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Subheadline</label>
          <textarea rows={2} value={form.hero_subheadline} onChange={(e) => set("hero_subheadline", e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Hero Image</label>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-royal-100 px-4 py-3 text-sm text-royal-900/70">
            {uploadingHero ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {form.hero_image_url ? "Replace hero image" : "Upload hero image"}
            <input type="file" accept="image/*" hidden onChange={(e) => handleHeroUpload(e.target.files?.[0])} />
          </label>
        </div>
      </section>

      <section className="rung-card space-y-4 p-6">
        <h2 className="font-display font-bold text-royal-900">Admissions Brochure</h2>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-royal-100 px-4 py-3 text-sm text-royal-900/70">
          {uploadingBrochure ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {form.brochure_pdf_url ? "Replace brochure PDF" : "Upload brochure PDF"}
          <input type="file" accept="application/pdf" hidden onChange={(e) => handleBrochureUpload(e.target.files?.[0])} />
        </label>
      </section>

      <section className="rung-card space-y-4 p-6">
        <h2 className="font-display font-bold text-royal-900">Class Timetable</h2>
        <p className="text-xs text-royal-900/50">Upload a photo or screenshot of the current timetable — it will show on the Timetable page.</p>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-royal-100 px-4 py-3 text-sm text-royal-900/70">
          {uploadingTimetable ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {form.timetable_image_url ? "Replace timetable image" : "Upload timetable image"}
          <input type="file" accept="image/*" hidden onChange={(e) => handleTimetableUpload(e.target.files?.[0])} />
        </label>
      </section>

      <section className="rung-card space-y-4 p-6">
        <h2 className="font-display font-bold text-royal-900">Contact Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-royal-900">Phone</label>
            <input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-royal-900">WhatsApp (with country code, no +)</label>
            <input value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-royal-900">Email</label>
            <input value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-royal-900">Working Hours</label>
            <input value={form.working_hours} onChange={(e) => set("working_hours", e.target.value)} />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Address</label>
          <textarea rows={2} value={form.address} onChange={(e) => set("address", e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Google Maps Embed URL</label>
          <input value={form.map_embed_url || ""} onChange={(e) => set("map_embed_url", e.target.value)} placeholder="https://maps.google.com/maps?q=...&output=embed" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Google Reviews URL</label>
          <input value={form.google_reviews_url || ""} onChange={(e) => set("google_reviews_url", e.target.value)} />
        </div>
      </section>

      <section className="rung-card space-y-4 p-6">
        <h2 className="font-display font-bold text-royal-900">Homepage Stats</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-royal-900/60">Students</label>
            <input type="number" value={form.stats_students} onChange={(e) => set("stats_students", Number(e.target.value))} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-royal-900/60">Years</label>
            <input type="number" value={form.stats_years} onChange={(e) => set("stats_years", Number(e.target.value))} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-royal-900/60">Teachers</label>
            <input type="number" value={form.stats_teachers} onChange={(e) => set("stats_teachers", Number(e.target.value))} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-royal-900/60">Rating</label>
            <input type="number" step="0.1" value={form.stats_rating} onChange={(e) => set("stats_rating", Number(e.target.value))} />
          </div>
        </div>
      </section>

      <button onClick={save} disabled={saving} className="btn-primary w-full">
        {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />} Save Changes
      </button>
    </div>
  );
}
