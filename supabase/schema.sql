-- =====================================================================
-- LEARNING LADDERS PREPRIMARY SCHOOL — SUPABASE SCHEMA
-- Run this entire file once in Supabase SQL Editor (Project > SQL Editor)
-- =====================================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------
-- 1. ADMISSIONS ENQUIRIES
-- ---------------------------------------------------------------------
create table if not exists admissions (
  id uuid primary key default uuid_generate_v4(),
  child_name text not null,
  dob date not null,
  program text not null check (program in ('Day Care','Play Group','Nursery','LKG','UKG')),
  parent_name text not null,
  phone text not null,
  email text,
  address text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','visit_scheduled','admitted','closed')),
  admin_reply text,
  replied_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 2. CONTACT ENQUIRIES (general contact form)
-- ---------------------------------------------------------------------
create table if not exists contact_enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text,
  email text,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new','read','replied')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 3. GALLERY ALBUMS + PHOTOS
-- ---------------------------------------------------------------------
create table if not exists gallery_albums (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  cover_image_url text,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists gallery_photos (
  id uuid primary key default uuid_generate_v4(),
  album_id uuid references gallery_albums(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 4. VIDEO GALLERY
-- ---------------------------------------------------------------------
create table if not exists videos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text not null check (category in ('School Tour','Activities','Promotional','Parent Testimonials')),
  video_url text not null,        -- YouTube/Vimeo URL or Supabase Storage URL
  thumbnail_url text,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 5. EVENTS
-- ---------------------------------------------------------------------
create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  event_date date not null,
  end_date date,
  event_type text not null default 'general' check (event_type in ('general','holiday','celebration','sports','academic')),
  image_url text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 6. TEACHERS
-- ---------------------------------------------------------------------
create table if not exists teachers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  designation text not null,
  qualification text not null,
  experience_years int not null default 0,
  bio text,
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 7. TESTIMONIALS
-- ---------------------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  parent_name text not null,
  child_name text,
  program text,
  content text,
  rating int check (rating between 1 and 5) default 5,
  video_url text,
  photo_url text,
  source text not null default 'website' check (source in ('website','google')),
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 8. FEE STRUCTURE
-- ---------------------------------------------------------------------
create table if not exists fee_structure (
  id uuid primary key default uuid_generate_v4(),
  program text not null check (program in ('Day Care','Play Group','Nursery','LKG','UKG')),
  admission_fee numeric(10,2) not null default 0,
  tuition_fee_term numeric(10,2) not null default 0,
  annual_fee numeric(10,2) not null default 0,
  transport_fee_term numeric(10,2),
  notes text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 9. TEACHERS/PROGRAMS content (editable program details)
-- ---------------------------------------------------------------------
create table if not exists programs (
  id uuid primary key default uuid_generate_v4(),
  name text not null check (name in ('Day Care','Play Group','Nursery','LKG','UKG')),
  age_group text not null,
  tagline text,
  learning_objectives text[],
  activities text[],
  daily_routine jsonb, -- [{time: "9:00 AM", activity: "Circle Time"}, ...]
  image_url text,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------
-- 10. WEBSITE SETTINGS (single-row key/value style config for admin panel)
-- ---------------------------------------------------------------------
create table if not exists website_settings (
  id int primary key default 1,
  hero_headline text default 'Climbing Towards a Bright Future',
  hero_subheadline text default 'Admissions Open 2026–27 at Learning Ladders Preprimary School — Day Care, Play Group, Nursery, LKG & UKG.',
  hero_image_url text,
  school_building_image_url text,
  brochure_pdf_url text,
  timetable_image_url text,
  phone text default '+91 93919 14905',
  whatsapp text default '919391914905',
  email text default 'Learningladderspreschool03@gmail.com',
  address text default '58-15-133, Nad Junction, Shanti Nagar, Marripalem, Visakhapatnam – 530009, Andhra Pradesh',
  working_hours text default 'Mon–Sat: 9:00 AM – 1:00 PM',
  facebook_url text,
  instagram_url text,
  youtube_url text,
  map_embed_url text,
  google_reviews_url text,
  stats_students int default 150,
  stats_years int default 3,
  stats_teachers int default 10,
  stats_rating numeric(2,1) default 5.0,
  constraint single_row check (id = 1)
);
insert into website_settings (id) values (1) on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 12. ANNOUNCEMENTS (staff-postable notices — shown as homepage banner + list)
-- ---------------------------------------------------------------------
create table if not exists announcements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  message text not null,
  is_active boolean not null default true,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_at timestamptz not null default now()
);
alter table announcements enable row level security;
create policy "public read active announcements" on announcements for select using (
  is_active = true and starts_at <= now() and (ends_at is null or ends_at >= now())
  or is_admin()
);
create policy "admin write announcements" on announcements for all using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------
-- 11. ADMIN PROFILES (links to Supabase Auth users)
-- ---------------------------------------------------------------------
create table if not exists admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin','super_admin')),
  created_at timestamptz not null default now()
);

-- =====================================================================
-- ROW LEVEL SECURITY
-- Public (anon) can READ published/public content and INSERT enquiries.
-- Only authenticated admins can WRITE content tables.
-- =====================================================================

alter table admissions enable row level security;
alter table contact_enquiries enable row level security;
alter table gallery_albums enable row level security;
alter table gallery_photos enable row level security;
alter table videos enable row level security;
alter table events enable row level security;
alter table teachers enable row level security;
alter table testimonials enable row level security;
alter table fee_structure enable row level security;
alter table programs enable row level security;
alter table website_settings enable row level security;
alter table admin_profiles enable row level security;

-- Helper: is the current user an admin?
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from admin_profiles where id = auth.uid()
  );
$$ language sql security definer stable;

-- Public read policies
create policy "public read gallery_albums" on gallery_albums for select using (true);
create policy "public read gallery_photos" on gallery_photos for select using (true);
create policy "public read videos" on videos for select using (true);
create policy "public read events" on events for select using (true);
create policy "public read teachers" on teachers for select using (true);
create policy "public read published testimonials" on testimonials for select using (is_published = true or is_admin());
create policy "public read fee_structure" on fee_structure for select using (true);
create policy "public read programs" on programs for select using (true);
create policy "public read website_settings" on website_settings for select using (true);

-- Public insert (enquiry forms — anyone can submit, no one but admin can read/update)
create policy "anyone can submit admission" on admissions for insert with check (true);
create policy "admin can read admissions" on admissions for select using (is_admin());
create policy "admin can update admissions" on admissions for update using (is_admin());

create policy "anyone can submit contact" on contact_enquiries for insert with check (true);
create policy "admin can read contact" on contact_enquiries for select using (is_admin());
create policy "admin can update contact" on contact_enquiries for update using (is_admin());

-- Admin full write access on content tables
create policy "admin write gallery_albums" on gallery_albums for all using (is_admin()) with check (is_admin());
create policy "admin write gallery_photos" on gallery_photos for all using (is_admin()) with check (is_admin());
create policy "admin write videos" on videos for all using (is_admin()) with check (is_admin());
create policy "admin write events" on events for all using (is_admin()) with check (is_admin());
create policy "admin write teachers" on teachers for all using (is_admin()) with check (is_admin());
create policy "admin write testimonials" on testimonials for all using (is_admin()) with check (is_admin());
create policy "admin write fee_structure" on fee_structure for all using (is_admin()) with check (is_admin());
create policy "admin write programs" on programs for all using (is_admin()) with check (is_admin());
create policy "admin write website_settings" on website_settings for all using (is_admin()) with check (is_admin());

create policy "admin read own profile" on admin_profiles for select using (auth.uid() = id or is_admin());

-- =====================================================================
-- SEED DATA — realistic starter content so the site isn't empty
-- =====================================================================

insert into programs (name, age_group, tagline, learning_objectives, activities, daily_routine, sort_order) values
('Day Care', '6+ Months', 'A warm, caring home away from home for your little one',
  array['Safe, nurturing supervision throughout the day','Age-appropriate sensory stimulation','Healthy nap and feeding routines','Comfort and secure attachment'],
  array['Sensory play','Lullabies & gentle music','Supervised rest time','Cuddle & story time'],
  '[{"time":"9:00 AM","activity":"Welcome & Free Play"},{"time":"10:00 AM","activity":"Snack Time"},{"time":"10:30 AM","activity":"Sensory Activity"},{"time":"11:30 AM","activity":"Nap Time"},{"time":"12:30 PM","activity":"Feeding & Comfort Time"},{"time":"1:00 PM","activity":"Pickup"}]'::jsonb, 1),
('Play Group', '1.5+ Years', 'First steps into a joyful world of discovery',
  array['Sensory & motor development','Language exposure through rhymes and stories','Social bonding and separation comfort','Basic self-help skills'],
  array['Sensory play','Music & movement','Story time','Free play','Art exploration'],
  '[{"time":"9:00 AM","activity":"Welcome & Free Play"},{"time":"9:30 AM","activity":"Circle Time & Rhymes"},{"time":"10:00 AM","activity":"Snack Time"},{"time":"10:30 AM","activity":"Sensory Activity"},{"time":"11:15 AM","activity":"Story Time"},{"time":"11:45 AM","activity":"Outdoor Play"},{"time":"12:30 PM","activity":"Goodbye Circle"}]'::jsonb, 2),
('Nursery', '2+ Years', 'Building curiosity, confidence and communication',
  array['Vocabulary and early language building','Fine motor & pre-writing skills','Number and shape recognition','Independence in daily routines'],
  array['Pencil holding practice','Alphabet & number games','Art & craft','Music & dance','Show and tell'],
  '[{"time":"9:00 AM","activity":"Welcome & Circle Time"},{"time":"9:30 AM","activity":"Language Activity"},{"time":"10:15 AM","activity":"Snack Time"},{"time":"10:45 AM","activity":"Numbers & Shapes"},{"time":"11:30 AM","activity":"Art & Craft"},{"time":"12:00 PM","activity":"Outdoor Play"},{"time":"12:30 PM","activity":"Goodbye Circle"}]'::jsonb, 3),
('LKG', '3+ Years', 'Where curiosity turns into confident learning',
  array['Phonics and early reading','Number operations up to 20','Fine motor mastery for writing','Emotional & social skills'],
  array['Phonics games','Writing practice','Craft projects','Group activities','Yoga & mindfulness'],
  '[{"time":"9:00 AM","activity":"Assembly"},{"time":"9:20 AM","activity":"Phonics & Reading"},{"time":"10:00 AM","activity":"Numeracy"},{"time":"10:40 AM","activity":"Snack Time"},{"time":"11:00 AM","activity":"Craft / Activity"},{"time":"11:45 AM","activity":"Outdoor Play"},{"time":"12:15 PM","activity":"Story & Reflection"},{"time":"12:30 PM","activity":"Dismissal"}]'::jsonb, 4),
('UKG', '4+ Years', 'School-ready skills and confidence for the next big step',
  array['Reading fluency and comprehension','Writing sentences independently','Addition & subtraction basics','Leadership and teamwork'],
  array['Reading corner','Creative writing','Math manipulatives','Public speaking','Sports & games'],
  '[{"time":"9:00 AM","activity":"Assembly & Announcements"},{"time":"9:20 AM","activity":"Language & Reading"},{"time":"10:00 AM","activity":"Mathematics"},{"time":"10:40 AM","activity":"Snack Time"},{"time":"11:00 AM","activity":"EVS / Discovery"},{"time":"11:40 AM","activity":"Sports & Games"},{"time":"12:15 PM","activity":"Reflection Circle"},{"time":"12:30 PM","activity":"Dismissal"}]'::jsonb, 5)
on conflict do nothing;

insert into fee_structure (program, admission_fee, tuition_fee_term, annual_fee, transport_fee_term, notes) values
('Day Care', 0, 0, 0, null, 'Contact us for current fees'),
('Play Group', 0, 0, 0, null, 'Contact us for current fees'),
('Nursery', 0, 0, 0, null, 'Contact us for current fees'),
('LKG', 0, 7600, 23000, null, 'Monthly ₹1,900. 3 terms of 4 months each. Includes uniform + books. Application fee ₹200.'),
('UKG', 0, 8000, 24200, null, 'Monthly ₹2,000. 3 terms of 4 months each. Includes uniform + books. Application fee ₹200.')
on conflict do nothing;

insert into gallery_albums (title, slug, description, sort_order) values
('Birthday Celebrations', 'birthday-celebrations', 'Little smiles on their special day', 1),
('Pencil Holding Activity', 'pencil-holding-activity', 'Building fine motor skills, step by step', 2),
('Art & Craft', 'art-craft', 'Colours, creativity and tiny hands at work', 3),
('Yoga Day', 'yoga-day', 'Mindful movement for little bodies', 4),
('Independence Day', 'independence-day', 'Celebrating our nation with pride', 5),
('Children''s Day', 'childrens-day', 'A day all about our little stars', 6),
('Sports Day', 'sports-day', 'Running, jumping and cheering together', 7),
('Annual Day', 'annual-day', 'Our biggest celebration of the year', 8),
('Classroom Activities', 'classroom-activities', 'Everyday moments of learning and joy', 9),
('Festivals', 'festivals', 'Celebrating traditions and togetherness', 10)
on conflict (slug) do nothing;

insert into events (title, description, event_date, event_type) values
('Grandparents Day', 'A special day inviting grandparents to share stories and activities with our children.', current_date + interval '20 days', 'celebration'),
('Colour Day', 'Children come dressed in a theme colour with fun colour-based activities all day.', current_date + interval '35 days', 'celebration'),
('Fruit Day', 'A fun, healthy day learning about fruits through tasting, art and stories.', current_date + interval '50 days', 'celebration'),
('Sports Day', 'Annual sports meet with races, games and prizes for all our little athletes.', current_date + interval '65 days', 'sports'),
('Annual Day', 'Our grand annual celebration with performances by every class.', current_date + interval '90 days', 'general'),
('Summer Vacation Begins', 'School closes for the summer break.', current_date + interval '110 days', 'holiday')
on conflict do nothing;

insert into teachers (name, designation, qualification, experience_years, bio, sort_order) values
('Mrs. Ananya Rao', 'Principal', 'M.Ed, B.Ed (Early Childhood Education)', 15, 'Ananya has led early-years education for over a decade, building a culture of warmth and curiosity at Learning Ladders.', 1),
('Ms. Priya Sharma', 'Head Teacher – Nursery', 'B.Ed, Montessori Diploma', 10, 'Priya believes every child learns best through play, and designs every lesson around that idea.', 2),
('Ms. Kavya Menon', 'Head Teacher – LKG', 'B.Ed, TESOL Certified', 8, 'Kavya specialises in early language development and loves turning phonics into games.', 3),
('Ms. Divya Nair', 'Head Teacher – UKG', 'M.A. Education, B.Ed', 9, 'Divya focuses on building school-readiness with confidence, kindness and curiosity.', 4)
on conflict do nothing;

insert into testimonials (parent_name, child_name, program, content, rating, source) values
('Rahul & Sneha Patel', 'Aarav', 'UKG', 'Learning Ladders gave our son a genuine love for school. The teachers know every child personally and it shows.', 5, 'website'),
('Meera Krishnan', 'Diya', 'LKG', 'The warmth and safety we feel dropping our daughter off every morning is priceless. Highly recommend.', 5, 'website'),
('Arjun Verma', 'Ishaan', 'Nursery', 'Fantastic infrastructure and even better teachers. Our son looks forward to school every single day.', 5, 'google')
on conflict do nothing;
