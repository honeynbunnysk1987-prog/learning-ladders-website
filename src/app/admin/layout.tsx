import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Images,
  CalendarDays,
  Wallet,
  Settings,
  GraduationCap,
  MessageSquareQuote,
  Megaphone,
  LogOut,
} from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/admissions", label: "Admission Enquiries", icon: ClipboardList },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/fees", label: "Fee Structure", icon: Wallet },
  { href: "/admin/teachers", label: "Teachers", icon: GraduationCap },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/settings", label: "Website Settings (incl. Timetable)", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-royal-50 font-body">
      <aside className="hidden w-64 shrink-0 flex-col bg-royal-900 text-white lg:flex">
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-rung bg-sunshine font-display font-bold text-royal-900">
            LL
          </div>
          <div>
            <p className="font-display text-sm font-bold">Learning Ladders</p>
            <p className="text-xs text-white/50">Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-3">
          <LogoutButton />
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-royal-100 bg-white px-6 py-4 lg:hidden">
          <p className="font-display font-bold text-royal-900">Learning Ladders Admin</p>
          <LogoutButton compact />
        </header>
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
