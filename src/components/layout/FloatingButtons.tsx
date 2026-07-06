"use client";

import { Phone } from "lucide-react";

export default function FloatingButtons() {
  const phone = process.env.NEXT_PUBLIC_SCHOOL_PHONE || "+91 93919 14905";
  const whatsapp = process.env.NEXT_PUBLIC_SCHOOL_WHATSAPP || "919391914905";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={`https://wa.me/${whatsapp}?text=Hi!%20I'd%20like%20to%20know%20more%20about%20admissions%20at%20Learning%20Ladders.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg transition-transform hover:scale-110 animate-float"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01A7.94 7.94 0 0 0 20 12.05a7.9 7.9 0 0 0-2.4-5.73Zm-5.55 12.2h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.66.67-2.43-.16-.25a6.6 6.6 0 1 1 5.6 3.08Zm3.62-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.23.15-.42.05-.2-.1-.83-.31-1.58-.98-.58-.52-.98-1.16-1.09-1.36-.11-.2-.01-.3.09-.4.09-.1.2-.24.3-.36.1-.12.13-.2.2-.34.07-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.38c-.13 0-.34.05-.52.25-.18.2-.68.66-.68 1.6s.7 1.86.8 1.99c.09.13 1.38 2.1 3.34 2.95.47.2.83.32 1.12.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.16-.46.16-.86.11-.94-.05-.09-.18-.14-.38-.24Z"/>
        </svg>
      </a>
      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
        aria-label="Call the school"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-royal text-white shadow-soft-lg transition-transform hover:scale-110"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
