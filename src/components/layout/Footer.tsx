import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

const SITEMAP = [
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/timetable", label: "Timetable" },
  { href: "/facilities", label: "Facilities" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_SCHOOL_PHONE || "+91 93919 14905";
  const email = process.env.NEXT_PUBLIC_SCHOOL_EMAIL || "Learningladderspreschool03@gmail.com";

  return (
    <footer className="bg-royal-900 text-white/90">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-1.5">
              <Image src="/images/logo.png" alt="Learning Ladders Preprimary School" width={180} height={150} className="h-16 w-auto" />
            </div>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Climbing Towards a Bright Future — a safe, joyful home for your child&apos;s first
            steps in learning.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2.5 hover:bg-sunshine hover:text-royal-900">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2.5 hover:bg-sunshine hover:text-royal-900">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-full bg-white/10 p-2.5 hover:bg-sunshine hover:text-royal-900">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-display text-base font-bold text-sunshine">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SITEMAP.slice(0, 5).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-base font-bold text-sunshine">More</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SITEMAP.slice(5).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-base font-bold text-sunshine">Get in Touch</p>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf-400" />
              58-15-133, Nad Junction, Shanti Nagar, Marripalem, Visakhapatnam – 530009
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-leaf-400" />
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white">{phone}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-leaf-400" />
              <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Learning Ladders Preprimary School. All rights reserved.</p>
          <p>Step by Step to Success</p>
        </div>
      </div>
    </footer>
  );
}
