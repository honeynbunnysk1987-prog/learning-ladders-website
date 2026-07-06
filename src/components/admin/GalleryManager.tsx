"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import type { GalleryAlbum, GalleryPhoto } from "@/types/database";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";

export default function GalleryManager({
  initialAlbums,
  initialPhotos,
}: {
  initialAlbums: GalleryAlbum[];
  initialPhotos: GalleryPhoto[];
}) {
  const router = useRouter();
  const supabase = createClient();
  const [selectedAlbum, setSelectedAlbum] = useState<string>(initialAlbums[0]?.id || "");
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  async function createAlbum() {
    if (!newAlbumTitle.trim()) return;
    const slug = newAlbumTitle.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const { error } = await supabase.from("gallery_albums").insert({
      title: newAlbumTitle,
      slug,
      sort_order: initialAlbums.length + 1,
    });
    if (error) toast.error("Could not create album (slug may already exist)");
    else {
      toast.success("Album created");
      setNewAlbumTitle("");
      router.refresh();
    }
  }

  async function deleteAlbum(id: string) {
    if (!confirm("Delete this album and all its photos?")) return;
    const { error } = await supabase.from("gallery_albums").delete().eq("id", id);
    if (error) toast.error("Could not delete album");
    else {
      toast.success("Album deleted");
      router.refresh();
    }
  }

  async function handleUpload(files: FileList | null) {
    if (!files || !selectedAlbum) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const path = `${selectedAlbum}/${Date.now()}-${file.name.replace(/\s/g, "-")}`;
        const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file);
        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage.from("gallery").getPublicUrl(path);
        const { error: insertError } = await supabase.from("gallery_photos").insert({
          album_id: selectedAlbum,
          image_url: publicUrl.publicUrl,
        });
        if (insertError) throw insertError;
      }
      toast.success("Photos uploaded");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Make sure the 'gallery' storage bucket exists and is public.");
    } finally {
      setUploading(false);
    }
  }

  async function deletePhoto(id: string) {
    const { error } = await supabase.from("gallery_photos").delete().eq("id", id);
    if (error) toast.error("Could not delete photo");
    else {
      toast.success("Photo deleted");
      router.refresh();
    }
  }

  const photosForAlbum = initialPhotos.filter((p) => p.album_id === selectedAlbum);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="rung-card p-5">
        <h2 className="font-display font-bold text-royal-900">Albums</h2>
        <div className="mt-3 flex gap-2">
          <input
            value={newAlbumTitle}
            onChange={(e) => setNewAlbumTitle(e.target.value)}
            placeholder="New album title"
            className="text-sm"
          />
          <button onClick={createAlbum} className="btn-primary !px-3 !py-2">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <ul className="mt-4 space-y-1">
          {initialAlbums.map((a) => (
            <li key={a.id} className="flex items-center justify-between">
              <button
                onClick={() => setSelectedAlbum(a.id)}
                className={`flex-1 rounded-lg px-3 py-2 text-left text-sm font-semibold ${
                  selectedAlbum === a.id ? "bg-royal text-white" : "text-royal-900 hover:bg-royal-50"
                }`}
              >
                {a.title}
              </button>
              <button onClick={() => deleteAlbum(a.id)} className="p-2 text-royal-900/40 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {selectedAlbum ? (
          <>
            <label className="rung-card flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-royal-100 p-10 text-center">
              {uploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-royal" />
              ) : (
                <Upload className="h-8 w-8 text-royal" />
              )}
              <p className="font-semibold text-royal-900">
                {uploading ? "Uploading..." : "Click to upload photos"}
              </p>
              <p className="text-xs text-royal-900/50">JPG, PNG — multiple files supported</p>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                disabled={uploading}
                onChange={(e) => handleUpload(e.target.files)}
              />
            </label>

            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              {photosForAlbum.map((p) => (
                <div key={p.id} className="group relative aspect-square overflow-hidden rounded-xl">
                  <Image src={p.image_url} alt={p.caption || ""} fill className="object-cover" />
                  <button
                    onClick={() => deletePhoto(p.id)}
                    className="absolute right-1.5 top-1.5 rounded-full bg-white/90 p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-royal-900/50">Create an album to start uploading photos.</p>
        )}
      </div>
    </div>
  );
}
