"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Sparkles, Users2, Camera, Bus } from "lucide-react";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Safety First, Always",
    desc: "CCTV-monitored campus, background-verified staff and childproof infrastructure at every corner.",
  },
  {
    icon: HeartHandshake,
    title: "Individual Attention",
    desc: "Small batch sizes ensure every child is seen, heard and supported by name.",
  },
  {
    icon: Sparkles,
    title: "Play-Based Learning",
    desc: "A curriculum built on curiosity, creativity and joyful, hands-on discovery.",
  },
  {
    icon: Users2,
    title: "Experienced Educators",
    desc: "Qualified, trained teachers who genuinely love working with young children.",
  },
  {
    icon: Camera,
    title: "Transparent Updates",
    desc: "Regular photos, activity updates and open communication with every family.",
  },
  {
    icon: Bus,
    title: "Safe Transport",
    desc: "GPS-tracked buses with trained attendants for worry-free daily commutes.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Why Families Choose Us</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-royal-900 sm:text-4xl">
            Why Choose Learning Ladders
          </h2>
          <p className="mt-3 text-royal-900/70">
            Every detail of our school day is designed around one goal: helping your child feel
            safe, seen and excited to learn.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
              className="rung-card p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-50">
                <r.icon className="h-6 w-6 text-royal" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-royal-900">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-royal-900/70">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
