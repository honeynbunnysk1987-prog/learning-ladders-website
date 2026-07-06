import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/types/database";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").order("sort_order");

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-royal-900">Testimonials</h1>
      <p className="mt-1 text-sm text-royal-900/60">Manage parent reviews shown across the site.</p>
      <div className="mt-6">
        <TestimonialsManager initialTestimonials={(data as Testimonial[]) || []} />
      </div>
    </div>
  );
}
