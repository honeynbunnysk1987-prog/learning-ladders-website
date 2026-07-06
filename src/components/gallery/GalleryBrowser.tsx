"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Search } from "lucide-react";
import type { GalleryAlbum, GalleryPhoto } from "@/types/database";

interface Props {
  albums: GalleryAlbum[];
  photosByAlbum: Record<string, GalleryPhoto[]>;
}

export default function GalleryBrowser({ albums, photosByAlbum }: Props) {
  const [activeAlbum, setActiveAlbum] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const allPhotos = useMemo(() => {
    const list: (GalleryPhoto & { albumTitle: string })[] = [];
    albums.forEach((a) => {
      (photosByAlbum[a.id] || []).forEach((p) => list.push({ ...p, albumTitle: a.title }));
    });
    return list;
  }, [albums, photosByAlbum]);

  const filtered = useMemo(() => {
    return allPhotos.filter((p) => {
      const matchesAlbum = activeAlbum === "all" || p.album_id === activeAlbum;
      const matchesQuery =
        !query ||
        p.albumTitle.toLowerCase().includes(query.toLowerCase()) ||
        (p.caption || "").toLowerCase().includes(query.toLowerCase());
      return matchesAlbum && matchesQuery;
    });
  }, [allPhotos, activeAlbum, query]);

  const slides = filtered.map((p) => ({ src: p.image_url, alt: p.caption || p.albumTitle }));

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveAlbum("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeAlbum === "all" ? "bg-royal text-white" : "bg-royal-50 text-royal-900"
            }`}
          >
            All Albums
          </button>
          {albums.map((a) => (
            <button
              key={a.id}
              onClick={() => setActiveAlbum(a.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeAlbum === a.id ? "bg-royal text-white" : "bg-royal-50 text-royal-900"
              }`}
            >
              {a.title}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-royal-900/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search photos..."
            className="!pl-10"
          />
        </div>
      </div>

      <div className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {filtered.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative block w-full overflow-hidden rounded-2xl"
          >
            <Image
              src={photo.image_url}
              alt={photo.caption || photo.albumTitle}
              width={400}
              height={400}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-14 text-center text-royal-900/50">No photos found. Try a different search or album.</p>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </div>
  );
}
