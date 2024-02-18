"use server";

import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

import { Song } from "@/types/types";

export async function getSongsWithoutLogin(): Promise<Song[] | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: songsData, error: songsError } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (songsError || songsData.length === 0) {
    return null;
  }

  const modifiedSongsData: Song[] = songsData.map((song: Song) => {
    return {
      ...song,
      image_public_path: supabase.storage
        .from("images")
        .getPublicUrl(song.image_path).data.publicUrl,
    };
  });

  return modifiedSongsData;
}
