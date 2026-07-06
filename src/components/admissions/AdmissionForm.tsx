"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const PROGRAMS = ["Day Care", "Play Group", "Nursery", "LKG", "UKG"];

export default function AdmissionForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast.success("Your enquiry has been submitted!");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Something went wrong. Please call us instead.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rung-card p-8 text-center">
        <h3 className="font-display text-2xl font-bold text-royal-900">Thank You! 🎉</h3>
        <p className="mt-3 text-royal-900/70">
          We&apos;ve received your admission enquiry. Our admissions team will call you within 24
          hours to schedule a visit.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-outline mt-6">
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rung-card space-y-5 p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Child&apos;s Name *</label>
          <input name="child_name" required placeholder="e.g. Aarav Patel" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Date of Birth *</label>
          <input name="dob" type="date" required />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-royal-900">Program Interested In *</label>
        <select name="program" required defaultValue="">
          <option value="" disabled>Select a program</option>
          {PROGRAMS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Parent/Guardian Name *</label>
          <input name="parent_name" required placeholder="Your full name" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Phone Number *</label>
          <input name="phone" type="tel" required placeholder="+91 93919 14905" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-royal-900">Email Address</label>
        <input name="email" type="email" placeholder="you@example.com" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-royal-900">Address</label>
        <input name="address" placeholder="Your home address" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-royal-900">Message (optional)</label>
        <textarea name="message" rows={3} placeholder="Any questions or preferred visit times?" />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit Admission Enquiry"}
      </button>
      <p className="text-center text-xs text-royal-900/50">
        By submitting, you agree to be contacted by our admissions team.
      </p>
    </form>
  );
}
