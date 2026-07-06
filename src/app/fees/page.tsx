import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { getFees } from "@/lib/data";
import Link from "next/link";
import { Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Fee Structure",
  description: "View the fee structure for Day Care, Play Group, Nursery, LKG and UKG at Learning Ladders Preprimary School.",
};

export const revalidate = 300;

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default async function FeesPage() {
  const fees = await getFees();

  return (
    <>
      <PageHeader
        eyebrow="Transparent Pricing"
        title="Fee Structure"
        description="Simple, transparent fees with no hidden costs. All fees are payable in 3 terms unless noted."
      />

      <section className="py-16">
        <div className="container-page">
          <div className="overflow-x-auto rounded-rung shadow-soft">
            <table className="w-full min-w-[640px] border-collapse overflow-hidden text-left">
              <thead>
                <tr className="bg-royal text-white">
                  <th className="px-6 py-4 font-display text-sm font-bold">Program</th>
                  <th className="px-6 py-4 font-display text-sm font-bold">Admission Fee</th>
                  <th className="px-6 py-4 font-display text-sm font-bold">Tuition Fee / Term</th>
                  <th className="px-6 py-4 font-display text-sm font-bold">Annual Fee</th>
                  <th className="px-6 py-4 font-display text-sm font-bold">Transport / Term</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f, i) => (
                  <tr key={f.id} className={i % 2 === 0 ? "bg-white" : "bg-royal-50"}>
                    <td className="px-6 py-4 font-display font-bold text-royal-900">{f.program}</td>
                    <td className="px-6 py-4 text-royal-900/80">{formatINR(f.admission_fee)}</td>
                    <td className="px-6 py-4 text-royal-900/80">{formatINR(f.tuition_fee_term)}</td>
                    <td className="px-6 py-4 text-royal-900/80">{formatINR(f.annual_fee)}</td>
                    <td className="px-6 py-4 text-royal-900/80">
                      {f.transport_fee_term ? formatINR(f.transport_fee_term) : "—"}
                    </td>
                  </tr>
                ))}
                {fees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-royal-900/50">
                      Fee details are being updated. Please contact us for current fees.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-sunshine-100 p-5 text-sm text-royal-900/80">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-royal" />
            <p>
              Fees are payable in 3 terms. Sibling and early-bird discounts may be available —
              contact our admissions desk for current offers.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link href="/admissions" className="btn-primary">
              Apply for Admission
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
