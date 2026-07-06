import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { getPrograms } from "@/lib/data";
import { Clock, Target, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore our Day Care, Play Group, Nursery, LKG and UKG programs — age group, learning objectives, activities and daily routine.",
};

export const revalidate = 300;

const COLORS = ["border-royal", "border-leaf", "border-sunshine", "border-royal-400"];

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <PageHeader
        eyebrow="Our Programs"
        title="A Rung for Every Age"
        description="Each program is thoughtfully designed for its age group, building the skills and confidence needed for the next step."
      />

      <section className="py-16">
        <div className="container-page space-y-10">
          {programs.map((program, i) => (
            <div
              key={program.id}
              className={`overflow-hidden rounded-rung border-t-8 ${COLORS[i % 4]} bg-white shadow-soft`}
            >
              <div className="grid gap-8 p-8 lg:grid-cols-3 lg:p-10">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-royal-900/50">
                    {program.age_group}
                  </p>
                  <h2 className="mt-1 font-display text-3xl font-extrabold text-royal-900">
                    {program.name}
                  </h2>
                  <p className="mt-3 text-royal-900/70">{program.tagline}</p>
                  <Link href="/admissions" className="btn-primary mt-6">
                    Apply for {program.name}
                  </Link>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-leaf" />
                    <h3 className="font-display font-bold text-royal-900">Learning Objectives</h3>
                  </div>
                  <ul className="space-y-1.5 text-sm text-royal-900/70">
                    {program.learning_objectives?.map((obj) => (
                      <li key={obj}>• {obj}</li>
                    ))}
                  </ul>

                  <div className="mb-2 mt-5 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-sunshine-600" />
                    <h3 className="font-display font-bold text-royal-900">Activities</h3>
                  </div>
                  <ul className="space-y-1.5 text-sm text-royal-900/70">
                    {program.activities?.map((a) => (
                      <li key={a}>• {a}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-royal" />
                    <h3 className="font-display font-bold text-royal-900">Daily Routine</h3>
                  </div>
                  <ol className="space-y-2">
                    {program.daily_routine?.map((slot, idx) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <span className="w-20 shrink-0 font-semibold text-royal">{slot.time}</span>
                        <span className="text-royal-900/70">{slot.activity}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}

          {programs.length === 0 && (
            <p className="text-center text-royal-900/60">
              Program details are being updated. Please check back soon or contact us for more
              information.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
