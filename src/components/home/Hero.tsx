"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, CalendarCheck, Star } from "lucide-react";

export default function Hero({
  headline,
  subheadline,
  imageUrl,
}: {
  headline: string;
  subheadline: string;
  imageUrl?: string | null;
}) {
  const whatsapp = process.env.NEXT_PUBLIC_SCHOOL_WHATSAPP || "919391914905";
  const phone = process.env.NEXT_PUBLIC_SCHOOL_PHONE || "+91 93919 14905";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-royal-50 via-white to-white pt-14 pb-20 sm:pt-20">
      {/* decorative shapes */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-sunshine-100 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-72 w-72 rounded-full bg-leaf-100 blur-3xl" />

      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">
            <Star className="h-4 w-4 fill-sunshine text-sunshine" /> Admissions Open 2026–27
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-royal-900 sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-royal-900/70">{subheadline}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn-primary">
              <Phone className="h-5 w-5" /> Call Now
            </a>
            <Link href="/admissions" className="btn-accent">
              <CalendarCheck className="h-5 w-5" /> Book School Visit
            </Link>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-leaf"
            >
              WhatsApp Us
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {["bg-royal", "bg-sunshine", "bg-leaf", "bg-royal-400"].map((c, i) => (
                <div key={i} className={`h-10 w-10 rounded-full ${c} border-2 border-white`} />
              ))}
            </div>
            <p className="text-sm text-royal-900/70">
              Trusted by <span className="font-bold text-royal-900">450+ families</span> across
              the city
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-rung shadow-soft-lg">
            <Image
              src={imageUrl || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80"}
              alt="Happy children learning at Learning Ladders Preprimary School"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-rung-rev bg-white p-4 shadow-soft-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sunshine-100">
              <Star className="h-6 w-6 fill-sunshine text-sunshine" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-royal-900">4.9 / 5</p>
              <p className="text-xs text-royal-900/60">Parent Rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
