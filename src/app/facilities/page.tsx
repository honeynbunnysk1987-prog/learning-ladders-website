import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { ShieldCheck, Video, Monitor, Home, TreePine, Sparkles, Droplets, Bus } from "lucide-react";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Explore the safe, modern facilities at Learning Ladders Preprimary School.",
};

const FACILITIES = [
  { icon: ShieldCheck, title: "Safe Campus", desc: "Secure, childproofed campus with controlled entry and exit points." },
  { icon: Video, title: "CCTV Monitoring", desc: "Round-the-clock CCTV coverage across all classrooms and play areas." },
  { icon: Monitor, title: "Smart Classrooms", desc: "Interactive smart boards that bring stories and lessons to life." },
  { icon: Home, title: "Indoor Activity Zones", desc: "Dedicated indoor play and soft-play areas for rainy days." },
  { icon: TreePine, title: "Outdoor Play Area", desc: "Spacious outdoor play area with age-appropriate equipment." },
  { icon: Sparkles, title: "Hygienic Environment", desc: "Daily sanitisation and child-sized, hygienic washrooms." },
  { icon: Droplets, title: "Drinking Water", desc: "Filtered, safe drinking water available on every floor." },
  { icon: Bus, title: "Safe Transport", desc: "GPS-tracked buses with trained attendants for daily pickup and drop." },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Built for Little Ones"
        title="Our Facilities"
        description="Every corner of our campus is designed with one thing in mind — your child's safety, comfort and joy."
      />
      <section className="py-16">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITIES.map((f) => (
            <div key={f.title} className="rung-card p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-50">
                <f.icon className="h-7 w-7 text-royal" />
              </div>
              <h3 className="mt-4 font-display font-bold text-royal-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-royal-900/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
