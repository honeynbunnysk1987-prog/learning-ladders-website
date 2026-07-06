"use client";

import { useState } from "react";
import type { Announcement } from "@/types/database";
import { X, Megaphone } from "lucide-react";

export default function AnnouncementBanner({ announcements }: { announcements: Announcement[] }) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = announcements.filter((a) => !dismissed.includes(a.id));

  if (visible.length === 0) return null;
  const latest = visible[0];

  return (
    <div className="bg-gradient-to-r from-royal to-royal-400 px-4 py-2.5 text-center text-sm font-semibold text-white">
      <span className="inline-flex items-center gap-2">
        <Megaphone className="h-4 w-4 shrink-0" />
        <span>
          <strong>{latest.title}:</strong> {latest.message}
        </span>
      </span>
      <button
        onClick={() => setDismissed((prev) => [...prev, latest.id])}
        aria-label="Dismiss announcement"
        className="ml-3 align-middle opacity-70 hover:opacity-100"
      >
        <X className="inline h-4 w-4" />
      </button>
    </div>
  );
}
