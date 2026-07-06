import type { Metadata, Viewport } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import LadderRail from "@/components/layout/LadderRail";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { getAnnouncements } from "@/lib/data";
import { Toaster } from "react-hot-toast";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.learningladders.school";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Learning Ladders Preprimary School | Climbing Towards a Bright Future",
    template: "%s | Learning Ladders Preprimary School",
  },
  description:
    "Learning Ladders Preprimary School offers Day Care, Play Group, Nursery, LKG and UKG programs in a safe, joyful, child-friendly environment. Admissions open for 2026–27.",
  keywords: [
    "preprimary school",
    "preschool admissions",
    "play group",
    "nursery school",
    "LKG UKG school",
    "Learning Ladders",
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: "Learning Ladders Preprimary School",
    description: "Climbing Towards a Bright Future — Admissions Open 2026–27",
    url: siteUrl,
    siteName: "Learning Ladders Preprimary School",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Ladders Preprimary School",
    description: "Climbing Towards a Bright Future — Admissions Open 2026–27",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1E3A8A",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const announcements = await getAnnouncements();
  return (
    <html lang="en" className={`${baloo.variable} ${jakarta.variable}`}>
      <body>
        <LadderRail />
        <AnnouncementBanner announcements={announcements} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
