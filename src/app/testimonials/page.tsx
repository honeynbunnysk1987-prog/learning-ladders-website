import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import GoogleReviews from "@/components/home/GoogleReviews";
import { getTestimonials, getSettings } from "@/lib/data";
import { Quote, Star, PlayCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Parent Testimonials",
  description: "Read what parents say about their experience at Learning Ladders Preprimary School.",
};

export const revalidate = 300;

export default async function TestimonialsPage() {
  const [testimonials, settings] = await Promise.all([getTestimonials(), getSettings()]);
  const written = testimonials.filter((t) => !t.video_url);
  const video = testimonials.filter((t) => t.video_url);

  return (
    <>
      <PageHeader
        eyebrow="Parent Voices"
        title="What Parents Say"
        description="Real stories from real families about their experience at Learning Ladders."
      />

      {video.length > 0 && (
        <section className="py-16">
          <div className="container-page">
            <h2 className="font-display text-2xl font-bold text-royal-900">Video Reviews</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {video.map((t) => (
                <div key={t.id} className="rung-card overflow-hidden">
                  <div className="relative flex aspect-video items-center justify-center bg-royal-900">
                    <a href={t.video_url!} target="_blank" rel="noopener noreferrer">
                      <PlayCircle className="h-14 w-14 text-white/90 transition-transform hover:scale-110" />
                    </a>
                  </div>
                  <div className="p-5">
                    <p className="font-display font-bold text-royal-900">{t.parent_name}</p>
                    {t.child_name && <p className="text-xs text-royal-900/60">Parent of {t.child_name}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-royal-50 py-16">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-royal-900">Written Reviews</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {written.map((t) => (
              <div key={t.id} className="rung-card p-7">
                <Quote className="h-6 w-6 text-sunshine" />
                <p className="mt-3 text-sm leading-relaxed text-royal-900/80">{t.content}</p>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-sunshine text-sunshine" />
                  ))}
                </div>
                <p className="mt-4 font-display text-sm font-bold text-royal-900">{t.parent_name}</p>
                {t.child_name && (
                  <p className="text-xs text-royal-900/60">
                    Parent of {t.child_name}{t.program ? ` · ${t.program}` : ""}
                  </p>
                )}
              </div>
            ))}
            {written.length === 0 && (
              <p className="col-span-full text-center text-royal-900/50">No reviews yet.</p>
            )}
          </div>
        </div>
      </section>

      <GoogleReviews rating={settings.stats_rating} reviewsUrl={settings.google_reviews_url} />
    </>
  );
}
