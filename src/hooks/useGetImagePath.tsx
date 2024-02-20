import { createClient } from "@/lib/supabase/client";

import type { Song } from "@/types/types";

export function useGetImagePath(song: Song) {
  const supabase = createClient();

  const { data: urlData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  if (!urlData.publicUrl) {
    console.log("No image public url found for song:", song.id);
    return null;
  }

  return urlData.publicUrl;
}
