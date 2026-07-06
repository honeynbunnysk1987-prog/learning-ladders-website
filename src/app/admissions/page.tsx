import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import AdmissionForm from "@/components/admissions/AdmissionForm";
import { getSettings } from "@/lib/data";
import { FileCheck2, PhoneCall, CalendarCheck, ClipboardList, Download, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Admissions 2026–27",
  description:
    "Admissions are open for 2026–27 at Learning Ladders Preprimary School. Learn about the process, eligibility, required documents and apply online.",
};

export const revalidate = 300;

const PROCESS = [
  { icon: PhoneCall, title: "Enquiry", desc: "Submit the online form or call our admissions desk." },
  { icon: CalendarCheck, title: "School Visit", desc: "Tour the campus and meet our teachers in person." },
  { icon: ClipboardList, title: "Document Submission", desc: "Share the required documents for verification." },
  { icon: FileCheck2, title: "Confirmation", desc: "Complete fee payment and secure your child's seat." },
];

export default async function AdmissionsPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow="Admissions Open 2026–27"
        title="Start the Application"
        description="Seats for Day Care, Play Group, Nursery, LKG and UKG are open for the 2026–27 academic year. Here's everything you need to know."
      />

      {/* Process */}
      <section className="py-16">
        <div className="container-page">
          <h2 className="text-center font-display text-2xl font-bold text-royal-900">
            Admission Process
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <div key={step.title} className="rung-card p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-royal-50 font-display font-bold text-royal">
                  {i + 1}
                </div>
                <step.icon className="mx-auto mt-3 h-6 w-6 text-leaf" />
                <h3 className="mt-3 font-display font-bold text-royal-900">{step.title}</h3>
                <p className="mt-1.5 text-sm text-royal-900/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility + Documents */}
      <section className="bg-royal-50 py-16">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="rung-card p-8">
            <h3 className="font-display text-xl font-bold text-royal-900">Eligibility</h3>
            <ul className="mt-4 space-y-2 text-sm text-royal-900/70">
              <li>• Day Care: 6+ months (flexible, year-round)</li>
              <li>• Play Group: 1.5+ years as of June 1st</li>
              <li>• Nursery: 2+ years as of June 1st</li>
              <li>• LKG: 3+ years as of June 1st</li>
              <li>• UKG: 4+ years as of June 1st</li>
            </ul>
          </div>
          <div className="rung-card p-8">
            <h3 className="font-display text-xl font-bold text-royal-900">Documents Required</h3>
            <ul className="mt-4 space-y-2 text-sm text-royal-900/70">
              <li>• Birth certificate (original + copy)</li>
              <li>• 4 passport-size photographs of the child</li>
              <li>• Address proof (Aadhaar / utility bill)</li>
              <li>• Parents&apos; ID proof</li>
              <li>• Immunisation record</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Form + Brochure/Contact */}
      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-bold text-royal-900">Online Admission Enquiry</h2>
            <p className="mt-2 text-sm text-royal-900/60">
              Fill this out and our admissions team will call you within 24 hours.
            </p>
            <div className="mt-6">
              <AdmissionForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rung-card p-7">
              <Download className="h-7 w-7 text-royal" />
              <h3 className="mt-3 font-display text-lg font-bold text-royal-900">
                Download Brochure
              </h3>
              <p className="mt-2 text-sm text-royal-900/70">
                Get the full details of our programs, fees and facilities.
              </p>
              {settings.brochure_pdf_url ? (
                <a href={settings.brochure_pdf_url} target="_blank" rel="noopener noreferrer" className="btn-outline mt-4 w-full">
                  <Download className="h-4 w-4" /> Download PDF
                </a>
              ) : (
                <p className="mt-4 text-xs text-royal-900/50">
                  Brochure coming soon — please contact us for full details.
                </p>
              )}
            </div>

            <div className="rung-card bg-royal p-7 text-white">
              <h3 className="font-display text-lg font-bold">Prefer to Talk?</h3>
              <p className="mt-2 text-sm text-white/80">
                Our admissions desk is happy to answer any questions.
              </p>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="mt-4 flex items-center gap-2 text-sm font-semibold">
                <Phone className="h-4 w-4" /> {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="mt-2 flex items-center gap-2 text-sm font-semibold">
                <Mail className="h-4 w-4" /> {settings.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
