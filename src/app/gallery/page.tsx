import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import GalleryBrowser from "@/components/gallery/GalleryBrowser";
import { getAlbums } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import type { GalleryPhoto } from "@/types/database";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse photo albums from birthday celebrations, art & craft, sports day, annual day and more at Learning Ladders.",
};

export const revalidate = 300;

export default async function GalleryPage() {
  const albums = await getAlbums();

  let photosByAlbum: Record<string, GalleryPhoto[]> = {};
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("gallery_photos").select("*").order("sort_order");
    (data as GalleryPhoto[] | null)?.forEach((p) => {
      photosByAlbum[p.album_id] = photosByAlbum[p.album_id] || [];
      photosByAlbum[p.album_id].push(p);
    });
  } catch {
    photosByAlbum = {};
  }

  return (
    <>
      <PageHeader
        eyebrow="Life at Learning Ladders"
        title="Photo Gallery"
        description="Every celebration, activity and everyday moment — captured and shared with our school family."
      />
      <section className="py-16">
        <div className="container-page">
          <GalleryBrowser albums={albums} photosByAlbum={photosByAlbum} />
        </div>
      </section>
    </>
  );
}
