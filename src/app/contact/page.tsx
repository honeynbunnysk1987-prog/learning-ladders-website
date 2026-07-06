import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import { getSettings } from "@/lib/data";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Learning Ladders Preprimary School — address, phone, email, and working hours.",
};

export const revalidate = 300;

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow="We'd Love to Hear From You"
        title="Contact Us"
        description="Have a question about admissions, programs or a school visit? Reach out any time."
      />

      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="rung-card p-7">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-royal-50 p-3"><MapPin className="h-5 w-5 text-royal" /></div>
                <div>
                  <h3 className="font-display font-bold text-royal-900">Address</h3>
                  <p className="mt-1 text-sm text-royal-900/70">{settings.address}</p>
                </div>
              </div>
            </div>
            <div className="rung-card p-7">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-leaf-100 p-3"><Phone className="h-5 w-5 text-leaf" /></div>
                <div>
                  <h3 className="font-display font-bold text-royal-900">Phone</h3>
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="mt-1 block text-sm text-royal-900/70 hover:text-royal">
                    {settings.phone}
                  </a>
                </div>
              </div>
            </div>
            <div className="rung-card p-7">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-sunshine-100 p-3"><Mail className="h-5 w-5 text-royal" /></div>
                <div>
                  <h3 className="font-display font-bold text-royal-900">Email</h3>
                  <a href={`mailto:${settings.email}`} className="mt-1 block text-sm text-royal-900/70 hover:text-royal">
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="rung-card p-7">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-royal-50 p-3"><Clock className="h-5 w-5 text-royal" /></div>
                <div>
                  <h3 className="font-display font-bold text-royal-900">Working Hours</h3>
                  <p className="mt-1 text-sm text-royal-900/70">{settings.working_hours}</p>
                </div>
              </div>
            </div>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-leaf w-full"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>

          <div className="space-y-6">
            <ContactForm />
            <div className="overflow-hidden rounded-rung shadow-soft">
              <iframe
                src={settings.map_embed_url || "https://www.openstreetmap.org/export/embed.html?bbox=83.2315950%2C17.7393349%2C83.2435950%2C17.7473349&layer=mapnik&marker=17.7433349%2C83.2375950"}
                width="100%"
                height="300"
                loading="lazy"
                className="border-0"
                title="School location map"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
