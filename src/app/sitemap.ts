import type { MetadataRoute } from "next";

const routes = [
  "", "about", "programs", "admissions", "fees", "gallery", "videos",
  "events", "facilities", "teachers", "testimonials", "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.learningladders.school";
  return routes.map((route) => ({
    url: `${base}/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
