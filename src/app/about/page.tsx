import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import { ShieldCheck, Target, Eye, Quote, Building2, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Learning Ladders Preprimary School's vision, mission, teaching philosophy, safety standards and infrastructure.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Learning Ladders"
        title="Every Big Journey Starts With Small Steps"
        description="For over a decade, we've been building the first rung on every child's educational ladder — with warmth, safety and joyful learning."
      />

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="rung-card p-8">
            <Eye className="h-8 w-8 text-royal" />
            <h2 className="mt-4 font-display text-2xl font-bold text-royal-900">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-royal-900/70">
              To be the most trusted preprimary school in the community — a place where every
              child discovers a lifelong love of learning through play, curiosity and care.
            </p>
          </div>
          <div className="rung-card p-8">
            <Target className="h-8 w-8 text-leaf" />
            <h2 className="mt-4 font-display text-2xl font-bold text-royal-900">Our Mission</h2>
            <p className="mt-3 leading-relaxed text-royal-900/70">
              To nurture confident, kind and curious learners by providing a safe, stimulating
              environment guided by experienced educators and a child-first philosophy.
            </p>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="bg-royal-50 py-16">
        <div className="container-page grid items-center gap-10 md:grid-cols-[280px_1fr]">
          <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-rung shadow-soft-lg md:w-full">
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80"
              alt="Principal of Learning Ladders Preprimary School"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <Quote className="h-8 w-8 text-sunshine" />
            <p className="mt-3 text-lg leading-relaxed text-royal-900/80">
              &ldquo;Every child who walks through our doors carries a world of potential. Our job
              isn&apos;t to fill that potential with instructions — it&apos;s to protect the
              curiosity they already have, and give it room to grow. That&apos;s the promise we
              make to every family who joins Learning Ladders.&rdquo;
            </p>
            <p className="mt-4 font-display text-lg font-bold text-royal-900">Mrs. Ananya Rao</p>
            <p className="text-sm text-royal-900/60">Principal, Learning Ladders Preprimary School</p>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-16">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">How We Teach</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-royal-900">
              Our Teaching Philosophy
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Learning Through Play",
                desc: "Structured play activities build cognitive, motor and social skills naturally, without pressure.",
              },
              {
                title: "Child-Led Discovery",
                desc: "Teachers guide rather than instruct, letting children explore concepts at their own pace.",
              },
              {
                title: "Whole-Child Development",
                desc: "We nurture emotional, social, physical and academic growth in equal measure.",
              },
            ].map((item) => (
              <div key={item.title} className="rung-card p-7">
                <h3 className="font-display text-lg font-bold text-royal-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-royal-900/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Standards & Infrastructure */}
      <section className="bg-leaf-100/40 py-16">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="rung-card p-8">
            <ShieldCheck className="h-8 w-8 text-leaf" />
            <h2 className="mt-4 font-display text-2xl font-bold text-royal-900">
              Safety Standards
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-royal-900/70">
              <li>• 100% CCTV-covered campus with live monitoring</li>
              <li>• Background-verified teaching and support staff</li>
              <li>• Childproofed furniture, sockets and play equipment</li>
              <li>• Trained first-aid staff on campus at all times</li>
              <li>• Strict visitor and pickup verification protocols</li>
            </ul>
          </div>
          <div className="rung-card p-8">
            <Building2 className="h-8 w-8 text-royal" />
            <h2 className="mt-4 font-display text-2xl font-bold text-royal-900">
              Infrastructure
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-royal-900/70">
              <li>• Bright, spacious, activity-based classrooms</li>
              <li>• Dedicated indoor soft-play and outdoor play areas</li>
              <li>• Hygienic washrooms sized for little ones</li>
              <li>• Art, music and sensory activity zones</li>
              <li>• Clean, filtered drinking water on every floor</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why parents trust us */}
      <section className="py-16">
        <div className="container-page text-center">
          <HeartHandshake className="mx-auto h-9 w-9 text-royal" />
          <h2 className="mt-4 font-display text-3xl font-extrabold text-royal-900">
            Why Parents Trust Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-royal-900/70">
            Trust is built one school day at a time. It comes from teachers who know your
            child&apos;s name and favourite story, from photos shared the same evening, and from
            a decade of families who&apos;ve watched their children take their first confident
            steps into school life with us.
          </p>
        </div>
      </section>
    </>
  );
}
