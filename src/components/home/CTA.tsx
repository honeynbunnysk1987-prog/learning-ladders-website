"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";

export default function CTA() {
  const phone = process.env.NEXT_PUBLIC_SCHOOL_PHONE || "+91 93919 14905";

  return (
    <section className="bg-royal py-20">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Begin the Climb?
          </h2>
          <p className="mt-3 text-white/80">
            Seats for 2026–27 are filling fast. Schedule a visit and see Learning Ladders for
            yourself.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/admissions" className="btn-accent">
              <CalendarCheck className="h-5 w-5" /> Apply for Admission
            </Link>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn-outline !border-white !text-white hover:!bg-white hover:!text-royal">
              <Phone className="h-5 w-5" /> Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
