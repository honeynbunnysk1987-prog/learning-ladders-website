import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { getVideos } from "@/lib/data";
import { PlayCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Video Gallery",
  description: "Watch our school tour, activity highlights, promotional videos and parent testimonials.",
};

export const revalidate = 300;

const CATEGORIES = ["School Tour", "Activities", "Promotional", "Parent Testimonials"] as const;

function toEmbedUrl(url: string) {
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  return url;
}

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <>
      <PageHeader
        eyebrow="Watch & Explore"
        title="Video Gallery"
        description="Take a video tour of our campus and see our children in action."
      />

      <section className="py-16">
        <div className="container-page space-y-14">
          {CATEGORIES.map((cat) => {
            const items = videos.filter((v) => v.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="font-display text-2xl font-bold text-royal-900">{cat}</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((v) => (
                    <div key={v.id} className="rung-card overflow-hidden">
                      <div className="relative aspect-video">
                        <iframe
                          src={toEmbedUrl(v.video_url)}
                          title={v.title}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-5">
                        <p className="flex items-center gap-2 font-display font-bold text-royal-900">
                          <PlayCircle className="h-4 w-4 text-leaf" /> {v.title}
                        </p>
                        {v.description && <p className="mt-1 text-sm text-royal-900/60">{v.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {videos.length === 0 && (
            <p className="text-center text-royal-900/50">Videos are being added soon. Check back!</p>
          )}
        </div>
      </section>
    </>
  );
}
