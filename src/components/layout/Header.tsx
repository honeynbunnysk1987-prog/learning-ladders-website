"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/timetable", label: "Timetable" },
  { href: "/facilities", label: "Facilities" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const phone = process.env.NEXT_PUBLIC_SCHOOL_PHONE || "+91 93919 14905";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-soft backdrop-blur" : "bg-white/70 backdrop-blur"
      }`}
    >
      <div className="container-page flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Learning Ladders Preprimary School" width={220} height={185} className="h-16 w-auto sm:h-20" priority />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-royal-900/80 transition-colors hover:text-royal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn-outline !px-4 !py-2.5 text-sm">
            <Phone className="h-4 w-4" /> Call Now
          </a>
          <Link href="/admissions" className="btn-accent !px-5 !py-2.5 text-sm">
            Book a Visit
          </Link>
        </div>

        <button
          className="rounded-full p-2 text-royal-900 xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-royal-100 bg-white xl:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 font-semibold text-royal-900 hover:bg-royal-50"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admissions"
                onClick={() => setOpen(false)}
                className="btn-accent mt-2 justify-center"
              >
                Book a School Visit
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
