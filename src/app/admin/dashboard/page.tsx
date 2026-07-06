import { createClient } from "@/lib/supabase/server";
import { ClipboardList, MessageSquare, Images, CalendarDays } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: admissionsCount }, { count: newAdmissionsCount }, { count: contactCount }, { count: albumsCount }, { count: eventsCount }] =
    await Promise.all([
      supabase.from("admissions").select("*", { count: "exact", head: true }),
      supabase.from("admissions").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("contact_enquiries").select("*", { count: "exact", head: true }),
      supabase.from("gallery_albums").select("*", { count: "exact", head: true }),
      supabase.from("events").select("*", { count: "exact", head: true }),
    ]);

  const cards = [
    { icon: ClipboardList, label: "Total Admission Enquiries", value: admissionsCount ?? 0, href: "/admin/admissions", accent: "bg-royal-50 text-royal" },
    { icon: ClipboardList, label: "New (Unactioned)", value: newAdmissionsCount ?? 0, href: "/admin/admissions", accent: "bg-sunshine-100 text-royal-900" },
    { icon: MessageSquare, label: "Contact Messages", value: contactCount ?? 0, href: "/admin/admissions", accent: "bg-leaf-100 text-leaf-700" },
    { icon: Images, label: "Gallery Albums", value: albumsCount ?? 0, href: "/admin/gallery", accent: "bg-royal-50 text-royal" },
    { icon: CalendarDays, label: "Events", value: eventsCount ?? 0, href: "/admin/events", accent: "bg-sunshine-100 text-royal-900" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-royal-900">Dashboard</h1>
      <p className="mt-1 text-sm text-royal-900/60">Welcome back! Here&apos;s what&apos;s happening at Learning Ladders.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rung-card p-6">
            <div className={`inline-flex rounded-2xl p-3 ${c.accent}`}>
              <c.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold text-royal-900">{c.value}</p>
            <p className="mt-1 text-sm text-royal-900/60">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
