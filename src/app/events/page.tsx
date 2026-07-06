import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { getEvents } from "@/lib/data";
import { Calendar, PartyPopper } from "lucide-react";

export const metadata: Metadata = {
  title: "Events & Holiday Calendar",
  description: "Upcoming and past events, celebrations, and the holiday calendar at Learning Ladders Preprimary School.",
};

export const revalidate = 300;

const TYPE_COLORS: Record<string, string> = {
  general: "bg-royal-50 text-royal",
  holiday: "bg-royal-900/5 text-royal-900",
  celebration: "bg-sunshine-100 text-royal-900",
  sports: "bg-leaf-100 text-leaf-700",
  academic: "bg-royal-50 text-royal",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function EventsPage() {
  const events = await getEvents();
  const upcoming = events.filter((e) => !e.is_past);
  const past = events.filter((e) => e.is_past);
  const holidays = events.filter((e) => e.event_type === "holiday");

  return (
    <>
      <PageHeader
        eyebrow="What's Happening"
        title="Events & Celebrations"
        description="From Sports Day to Annual Day, life at Learning Ladders is full of joyful moments."
      />

      <section className="py-16">
        <div className="container-page">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-royal-900">
            <PartyPopper className="h-6 w-6 text-sunshine-600" /> Upcoming Events
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => (
              <div key={e.id} className="rung-card p-6">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold capitalize ${TYPE_COLORS[e.event_type]}`}>
                  {e.event_type}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-royal-900">{e.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-royal-900/60">
                  <Calendar className="h-4 w-4" /> {formatDate(e.event_date)}
                </p>
                {e.description && <p className="mt-2 text-sm text-royal-900/70">{e.description}</p>}
              </div>
            ))}
            {upcoming.length === 0 && (
              <p className="col-span-full text-center text-royal-900/50">No upcoming events scheduled right now.</p>
            )}
          </div>
        </div>
      </section>

      {holidays.length > 0 && (
        <section className="bg-royal-50 py-16">
          <div className="container-page">
            <h2 className="font-display text-2xl font-bold text-royal-900">Holiday Calendar</h2>
            <div className="mt-8 overflow-hidden rounded-rung bg-white shadow-soft">
              {holidays.map((h, i) => (
                <div
                  key={h.id}
                  className={`flex items-center justify-between px-6 py-4 text-sm ${i % 2 ? "bg-royal-50/50" : ""}`}
                >
                  <span className="font-semibold text-royal-900">{h.title}</span>
                  <span className="text-royal-900/60">{formatDate(h.event_date)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="py-16">
          <div className="container-page">
            <h2 className="font-display text-2xl font-bold text-royal-900">Past Events</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((e) => (
                <div key={e.id} className="rung-card p-6 opacity-80">
                  <h3 className="font-display text-lg font-bold text-royal-900">{e.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-royal-900/60">
                    <Calendar className="h-4 w-4" /> {formatDate(e.event_date)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
