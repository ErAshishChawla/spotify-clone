import { createClient } from "@/lib/supabase/client";

import type { Song } from "@/types/types";

export function useGetSongPath(song?: Song) {
  if (!song) {
    return null;
  }

  const supabase = createClient();

  const { data: urlData } = supabase.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  if (!urlData.publicUrl) {
    console.log("No song public url found for song:", song.id);
    return null;
  }

  return urlData.publicUrl;
}
