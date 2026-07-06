"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types/database";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <section className="bg-leaf-100/40 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Parent Voices</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-royal-900 sm:text-4xl">
            What Parents Say
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
              className="rung-card p-7"
            >
              <Quote className="h-7 w-7 text-sunshine" />
              <p className="mt-3 text-sm leading-relaxed text-royal-900/80">{t.content}</p>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-sunshine text-sunshine" />
                ))}
              </div>
              <div className="mt-4">
                <p className="font-display text-sm font-bold text-royal-900">{t.parent_name}</p>
                {t.child_name && (
                  <p className="text-xs text-royal-900/60">
                    Parent of {t.child_name}{t.program ? ` · ${t.program}` : ""}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
