"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Star } from "lucide-react";

export default function Stats({
  years,
  teachers,
  rating,
}: {
  years: number;
  teachers: number;
  rating: number;
}) {
  const items = [
    { icon: Award, value: `${years}+`, label: "Years of Excellence" },
    { icon: GraduationCap, value: `${teachers}+`, label: "Caring Teachers" },
    { icon: Star, value: `${rating}`, label: "Average Parent Rating" },
  ];

  return (
    <section className="bg-royal-900 py-14">
      <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-center"
          >
            <item.icon className="mx-auto h-8 w-8 text-sunshine" />
            <p className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-white/60">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
