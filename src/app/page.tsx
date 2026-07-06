import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProgramsOverview from "@/components/home/ProgramsOverview";
import RecentActivities from "@/components/home/RecentActivities";
import Testimonials from "@/components/home/Testimonials";
import GoogleReviews from "@/components/home/GoogleReviews";
import CTA from "@/components/home/CTA";
import {
  getSettings,
  getPrograms,
  getRecentPhotos,
  getTestimonials,
} from "@/lib/data";

export const revalidate = 300; // ISR: refresh every 5 minutes

export default async function HomePage() {
  const [settings, programs, photos, testimonials] = await Promise.all([
    getSettings(),
    getPrograms(),
    getRecentPhotos(10),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero
        headline={settings.hero_headline}
        subheadline={settings.hero_subheadline}
        imageUrl={settings.hero_image_url}
      />
      <Stats
        years={settings.stats_years}
        teachers={settings.stats_teachers}
        rating={settings.stats_rating}
      />
      <WhyChooseUs />
      <ProgramsOverview programs={programs} />
      <RecentActivities photos={photos} />
      <Testimonials testimonials={testimonials} />
      <GoogleReviews rating={settings.stats_rating} reviewsUrl={settings.google_reviews_url} />
      <CTA />
    </>
  );
}
