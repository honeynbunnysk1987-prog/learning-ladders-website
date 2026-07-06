import { createClient } from "@/lib/supabase/server";
import type { SchoolEvent } from "@/types/database";
import EventsManager from "@/components/admin/EventsManager";

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").order("event_date", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-royal-900">Events</h1>
      <p className="mt-1 text-sm text-royal-900/60">Add, edit or remove events and holidays.</p>
      <div className="mt-6">
        <EventsManager initialEvents={(data as SchoolEvent[]) || []} />
      </div>
    </div>
  );
}
