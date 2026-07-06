# Learning Ladders Preprimary School — Website + Admin Panel

A complete, production-ready website built with **Next.js 15, TypeScript, Tailwind CSS, Supabase, and Framer Motion**, with a self-service admin panel so school staff can update content — photos, events, announcements, timetable, fees — without touching code.

This version is pre-filled with Learning Ladders' real details:
- Logo, address (58-15-133, Nad Junction, Shanti Nagar, Marripalem, Visakhapatnam – 530009), phone (93919 14905), email (Learningladderspreschool03@gmail.com)
- Real programs: Nursery, LKG, UKG, 1st Standard
- Real fees for LKG (₹1,900/mo, ₹23,000/yr) and UKG (₹2,000/mo, ₹24,200/yr) — Nursery and 1st Standard are marked "contact us" since exact figures weren't provided

---

## 1. What's included

**Public site:** Home, About, Programs, Admissions (working enquiry form), Fee Structure, Photo Gallery, Video Gallery, Events + Holiday Calendar, **Timetable**, Facilities, Teachers, Testimonials, Contact, plus a site-wide **Announcement banner**, 404 page, sitemap.xml, robots.txt, PWA manifest.

**Admin panel** (`/admin`): staff log in and can —
- View and reply to Admission Enquiries
- Post **Announcements** (shows as a dismissible banner across the whole site — for holiday notices, urgent updates, etc.)
- Upload photos into Gallery Albums
- Add/edit/delete Events (including holidays for the Holiday Calendar)
- Upload/replace the **Timetable image** (Settings page)
- Update Fee Structure
- Manage Teachers and Testimonials
- Update Website Settings: hero banner text/image, brochure PDF, contact details, homepage stats

**Database:** one complete SQL file (`supabase/schema.sql`) with every table, Row Level Security policy, and real seed data for programs/fees.

---

## 2. Deploying this for real (step by step)

This site needs two free accounts to go live: **Supabase** (the database) and **Vercel** (the hosting). Neither requires a credit card. Here's the full path, written for someone doing this for the first time.

### Step A — Set up Supabase (the database)
1. Go to [supabase.com](https://supabase.com) → sign up → **New Project**. Pick any name/password, choose a region close to India (e.g. Singapore).
2. Once it's ready, open **SQL Editor** (left sidebar) → **New query** → paste the *entire* contents of `supabase/schema.sql` from this project → click **Run**. This creates every table and fills in the real programs/fees.
3. Open **Storage** (left sidebar) → create two buckets, both set to **Public**:
   - `gallery`
   - `media`
4. Open **Authentication → Users** → **Add user** → create the staff login (an email + password they'll use to log into `/admin`).
5. Go back to **SQL Editor** and run this once, replacing the email with the one you just created — this makes that login an admin:
   ```sql
   insert into admin_profiles (id, full_name, role)
   select id, 'School Admin', 'super_admin' from auth.users where email = 'the-email-you-created@example.com';
   ```
6. Open **Project Settings → API** and keep this tab open — you'll need the **Project URL** and **anon public key** in Step C.

### Step B — Put the code on GitHub (so Vercel can find it)
1. Go to [github.com](https://github.com) → sign up (free) → **New repository** → name it `learning-ladders-website` → **Create repository**.
2. On the new repo page, click **uploading an existing file** and drag in every file/folder from this project (or use GitHub Desktop if you prefer). Commit the upload.

### Step C — Deploy on Vercel (this gives you the real, live website link)
1. Go to [vercel.com](https://vercel.com) → sign up with your GitHub account (free).
2. Click **Add New → Project** → select the `learning-ladders-website` repo you just created → **Import**.
3. Before clicking Deploy, expand **Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` → paste from Supabase Step A.6
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → paste from Supabase Step A.6
   - `NEXT_PUBLIC_SCHOOL_PHONE`, `NEXT_PUBLIC_SCHOOL_WHATSAPP`, `NEXT_PUBLIC_SCHOOL_EMAIL` → already correct in `.env.local.example`, copy them in
4. Click **Deploy**. In about a minute, Vercel gives you a live URL like `learning-ladders-website.vercel.app` — that's a real, working website.
5. Visit `your-url.vercel.app/admin/login` and log in with the account from Step A.4 — this is the dashboard your client's staff will use.
6. (Optional) In Vercel → Project → Settings → Domains, connect a custom domain if the client buys one later.

Once this is live, none of the "external link" preview issues will exist — everything (Call, WhatsApp, tel: links, the map) behaves exactly like any normal website.

---

## 3. Adding real content

Log into `/admin` and:
- **Announcements** → post the first one (e.g. "Admissions Open 2026–27")
- **Gallery** → create albums and upload real photos
- **Settings** → upload the real hero photo, and the timetable image
- **Events, Fees, Teachers, Testimonials** → edit as needed

---

## 4. Project structure

```
src/
  app/                  Next.js App Router pages (public site + /admin + /api routes)
  components/
    layout/              Header, Footer, floating buttons, AnnouncementBanner, ladder-rail
    home/                Homepage sections
    admin/               Admin panel CRUD components (incl. AnnouncementsManager)
    gallery/, admissions/, contact/, ui/
  lib/
    supabase/            Browser + server Supabase clients
    data.ts               Shared, safely-wrapped data-fetching functions
  types/database.ts       TypeScript types matching the Supabase schema
  middleware.ts            Protects /admin routes, refreshes Supabase session
supabase/schema.sql        Full database schema, RLS policies, and real seed data
public/images/logo.png     Real Learning Ladders logo
```

---

## 5. Local development (optional, for testing before deploying)

```bash
npm install
npm run dev
```
Needs a `.env.local` file (copy `.env.local.example` and fill in your Supabase keys) — visit `http://localhost:3000`.
