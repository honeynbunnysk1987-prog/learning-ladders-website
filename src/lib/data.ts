import { createClient } from "@/lib/supabase/server";
import type {
  ProgramContent,
  GalleryPhoto,
  GalleryAlbum,
  Testimonial,
  WebsiteSettings,
  SchoolEvent,
  Teacher,
  FeeStructure,
  Video,
  Announcement,
} from "@/types/database";

const DEFAULT_SETTINGS: WebsiteSettings = {
  id: 1,
  hero_headline: "Climbing Towards a Bright Future",
  hero_subheadline:
    "Admissions Open 2026–27 at Learning Ladders Preprimary School — Day Care, Play Group, Nursery, LKG & UKG.",
  hero_image_url: null,
  school_building_image_url: null,
  brochure_pdf_url: null,
  timetable_image_url: null,
  phone: process.env.NEXT_PUBLIC_SCHOOL_PHONE || "+91 93919 14905",
  whatsapp: process.env.NEXT_PUBLIC_SCHOOL_WHATSAPP || "919391914905",
  email: process.env.NEXT_PUBLIC_SCHOOL_EMAIL || "Learningladderspreschool03@gmail.com",
  address: "58-15-133, Nad Junction, Shanti Nagar, Marripalem, Visakhapatnam – 530009, Andhra Pradesh",
  working_hours: "Mon–Sat: 9:00 AM – 1:00 PM",
  facebook_url: null,
  instagram_url: null,
  youtube_url: null,
  map_embed_url: null,
  google_reviews_url: null,
  stats_students: 150,
  stats_years: 3,
  stats_teachers: 10,
  stats_rating: 5.0,
};

export async function getSettings(): Promise<WebsiteSettings> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("website_settings").select("*").eq("id", 1).single();
    return (data as WebsiteSettings) || DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function getPrograms(): Promise<ProgramContent[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("programs").select("*").order("sort_order");
    return (data as ProgramContent[]) || [];
  } catch {
    return [];
  }
}

export async function getRecentPhotos(limit = 10): Promise<(GalleryPhoto & { albumTitle?: string })[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery_photos")
      .select("*, gallery_albums(title)")
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data || []).map((p: any) => ({ ...p, albumTitle: p.gallery_albums?.title }));
  } catch {
    return [];
  }
}

export async function getAlbums(): Promise<GalleryAlbum[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("gallery_albums").select("*").order("sort_order");
    return (data as GalleryAlbum[]) || [];
  } catch {
    return [];
  }
}

export async function getAlbumWithPhotos(slug: string) {
  try {
    const supabase = await createClient();
    const { data: album } = await supabase
      .from("gallery_albums")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!album) return null;
    const { data: photos } = await supabase
      .from("gallery_photos")
      .select("*")
      .eq("album_id", album.id)
      .order("sort_order");
    return { album: album as GalleryAlbum, photos: (photos as GalleryPhoto[]) || [] };
  } catch {
    return null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("sort_order");
    return (data as Testimonial[]) || [];
  } catch {
    return [];
  }
}

export async function getEvents(): Promise<SchoolEvent[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("events").select("*").order("event_date");
    const today = new Date().toISOString().slice(0, 10);
    return ((data as Omit<SchoolEvent, "is_past">[]) || []).map((e) => ({
      ...e,
      is_past: e.event_date < today,
    }));
  } catch {
    return [];
  }
}

export async function getTeachers(): Promise<Teacher[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("teachers").select("*").order("sort_order");
    return (data as Teacher[]) || [];
  } catch {
    return [];
  }
}

export async function getFees(): Promise<FeeStructure[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("fee_structure").select("*").order("program");
    return (data as FeeStructure[]) || [];
  } catch {
    return [];
  }
}

export async function getVideos(): Promise<Video[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("videos").select("*").order("sort_order");
    return (data as Video[]) || [];
  } catch {
    return [];
  }
}

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Announcement[]) || [];
  } catch {
    return [];
  }
}
