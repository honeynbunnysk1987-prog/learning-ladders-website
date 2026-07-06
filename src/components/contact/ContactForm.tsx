"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Something went wrong. Please try calling us instead.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rung-card space-y-5 p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Name *</label>
          <input name="name" required placeholder="Your name" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-royal-900">Phone</label>
          <input name="phone" type="tel" placeholder="+91 93919 14905" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-royal-900">Email</label>
        <input name="email" type="email" placeholder="you@example.com" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-royal-900">Subject</label>
        <input name="subject" placeholder="How can we help?" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-royal-900">Message *</label>
        <textarea name="message" rows={4} required placeholder="Write your message here..." />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send Message"}
      </button>
    </form>
  );
}
