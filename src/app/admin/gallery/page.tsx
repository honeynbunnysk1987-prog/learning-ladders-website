import { createClient } from "@/lib/supabase/server";
import type { GalleryAlbum, GalleryPhoto } from "@/types/database";
import GalleryManager from "@/components/admin/GalleryManager";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const [{ data: albums }, { data: photos }] = await Promise.all([
    supabase.from("gallery_albums").select("*").order("sort_order"),
    supabase.from("gallery_photos").select("*").order("sort_order"),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-royal-900">Gallery Manager</h1>
      <p className="mt-1 text-sm text-royal-900/60">
        Create albums and upload photos. Uploaded files are stored in the Supabase &quot;gallery&quot; storage bucket.
      </p>
      <div className="mt-6">
        <GalleryManager
          initialAlbums={(albums as GalleryAlbum[]) || []}
          initialPhotos={(photos as GalleryPhoto[]) || []}
        />
      </div>
    </div>
  );
}
