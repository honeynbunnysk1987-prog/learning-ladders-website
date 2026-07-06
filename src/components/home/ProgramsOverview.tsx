"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ProgramContent } from "@/types/database";

const COLORS = ["bg-royal", "bg-leaf", "bg-sunshine", "bg-royal-400"];
const TEXT_COLORS = ["text-white", "text-white", "text-royal-900", "text-white"];

export default function ProgramsOverview({ programs }: { programs: ProgramContent[] }) {
  return (
    <section className="bg-royal-50 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Our Programs</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-royal-900 sm:text-4xl">
            A Rung for Every Age
          </h2>
          <p className="mt-3 text-royal-900/70">
            From first steps to school-readiness, each program builds on the one before it.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-rung ${COLORS[i % 4]} p-7 shadow-soft`}
            >
              <p className={`text-xs font-bold uppercase tracking-wide ${TEXT_COLORS[i % 4]} opacity-70`}>
                {p.age_group}
              </p>
              <h3 className={`mt-2 font-display text-2xl font-extrabold ${TEXT_COLORS[i % 4]}`}>
                {p.name}
              </h3>
              <p className={`mt-3 text-sm leading-relaxed ${TEXT_COLORS[i % 4]} opacity-90`}>
                {p.tagline}
              </p>
              <Link
                href="/programs"
                className={`mt-6 inline-flex items-center gap-1.5 text-sm font-bold ${TEXT_COLORS[i % 4]}`}
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
