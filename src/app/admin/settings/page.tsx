import { createClient } from "@/lib/supabase/server";
import type { WebsiteSettings } from "@/types/database";
import SettingsManager from "@/components/admin/SettingsManager";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("website_settings").select("*").eq("id", 1).single();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-royal-900">Website Settings</h1>
      <p className="mt-1 text-sm text-royal-900/60">
        Update the homepage banner, contact details and other site-wide content.
      </p>
      <div className="mt-6">
        <SettingsManager settings={data as WebsiteSettings} />
      </div>
    </div>
  );
}
