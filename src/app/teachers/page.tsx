import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import { getTeachers } from "@/lib/data";
import { GraduationCap, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Teachers",
  description: "Meet the experienced, caring educators at Learning Ladders Preprimary School.",
};

export const revalidate = 300;

export default async function TeachersPage() {
  const teachers = await getTeachers();

  return (
    <>
      <PageHeader
        eyebrow="Meet the Team"
        title="Our Teachers"
        description="Every teacher at Learning Ladders is trained in early-childhood education and chosen for their genuine warmth with children."
      />
      <section className="py-16">
        <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((t) => (
            <div key={t.id} className="rung-card overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={t.photo_url || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&q=80"}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-royal-900">{t.name}</h3>
                <p className="text-sm font-semibold text-leaf-600">{t.designation}</p>
                <div className="mt-3 space-y-1.5 text-xs text-royal-900/60">
                  <p className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> {t.qualification}</p>
                  <p className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> {t.experience_years} years experience</p>
                </div>
                {t.bio && <p className="mt-3 text-sm text-royal-900/70">{t.bio}</p>}
              </div>
            </div>
          ))}
          {teachers.length === 0 && (
            <p className="col-span-full text-center text-royal-900/50">
              Teacher profiles are being updated.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
