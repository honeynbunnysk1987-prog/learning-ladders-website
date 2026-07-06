import { createClient } from "@/lib/supabase/server";
import type { Announcement } from "@/types/database";
import AnnouncementsManager from "@/components/admin/AnnouncementsManager";

export default async function AdminAnnouncementsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-royal-900">Announcements</h1>
      <p className="mt-1 text-sm text-royal-900/60">
        Post important notices — they appear as a banner across the top of the whole website.
      </p>
      <div className="mt-6">
        <AnnouncementsManager initialAnnouncements={(data as Announcement[]) || []} />
      </div>
    </div>
  );
}
