"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryPhoto } from "@/types/database";

export default function RecentActivities({ photos }: { photos: (GalleryPhoto & { albumTitle?: string })[] }) {
  if (!photos.length) return null;

  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-eyebrow">Life at Learning Ladders</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-royal-900 sm:text-4xl">
              Recent Activities
            </h2>
          </div>
          <a href="/gallery" className="btn-outline !px-5 !py-2.5 text-sm">
            View Full Gallery
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {photos.slice(0, 10).map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 5) * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={photo.image_url}
                alt={photo.caption || photo.albumTitle || "School activity"}
                fill
                sizes="(min-width: 1024px) 20vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
