export type Program = "Day Care" | "Play Group" | "Nursery" | "LKG" | "UKG";

export interface Admission {
  id: string;
  child_name: string;
  dob: string;
  program: Program;
  parent_name: string;
  phone: string;
  email: string | null;
  address: string | null;
  message: string | null;
  status: "new" | "contacted" | "visit_scheduled" | "admitted" | "closed";
  admin_reply: string | null;
  replied_at: string | null;
  created_at: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  subject: string | null;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  slug: string;
  cover_image_url: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface GalleryPhoto {
  id: string;
  album_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  category: "School Tour" | "Activities" | "Promotional" | "Parent Testimonials";
  video_url: string;
  thumbnail_url: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  end_date: string | null;
  event_type: "general" | "holiday" | "celebration" | "sports" | "academic";
  image_url: string | null;
  is_past: boolean;
  created_at: string;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  experience_years: number;
  bio: string | null;
  photo_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  parent_name: string;
  child_name: string | null;
  program: string | null;
  content: string | null;
  rating: number;
  video_url: string | null;
  photo_url: string | null;
  source: "website" | "google";
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface FeeStructure {
  id: string;
  program: Program;
  admission_fee: number;
  tuition_fee_term: number;
  annual_fee: number;
  transport_fee_term: number | null;
  notes: string | null;
  updated_at: string;
}

export interface ProgramContent {
  id: string;
  name: Program;
  age_group: string;
  tagline: string | null;
  learning_objectives: string[];
  activities: string[];
  daily_routine: { time: string; activity: string }[];
  image_url: string | null;
  sort_order: number;
}

export interface WebsiteSettings {
  id: 1;
  hero_headline: string;
  hero_subheadline: string;
  hero_image_url: string | null;
  school_building_image_url: string | null;
  brochure_pdf_url: string | null;
  timetable_image_url: string | null;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  working_hours: string;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  map_embed_url: string | null;
  google_reviews_url: string | null;
  stats_students: number;
  stats_years: number;
  stats_teachers: number;
  stats_rating: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  is_active: boolean;
  starts_at: string;
  ends_at: string | null;
  created_at: string;
}
