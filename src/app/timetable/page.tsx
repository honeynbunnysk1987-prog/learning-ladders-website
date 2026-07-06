import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Timetable",
  description: "Current class timetable for Learning Ladders Preprimary School.",
};

export const revalidate = 300;

export default async function TimetablePage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow="Class Schedule"
        title="Timetable"
        description="Our current class timetable — updated by the school whenever the schedule changes."
      />
      <section className="py-16">
        <div className="container-page">
          {settings.timetable_image_url ? (
            <div className="mx-auto max-w-3xl overflow-hidden rounded-rung shadow-soft">
              <div className="relative aspect-[3/4] sm:aspect-[4/3]">
                <Image
                  src={settings.timetable_image_url}
                  alt="Learning Ladders class timetable"
                  fill
                  className="object-contain bg-white"
                  sizes="(min-width: 768px) 60vw, 100vw"
                />
              </div>
            </div>
          ) : (
            <p className="text-center text-royal-900/50">
              The timetable hasn&apos;t been uploaded yet. Please contact the school office for the current schedule.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
