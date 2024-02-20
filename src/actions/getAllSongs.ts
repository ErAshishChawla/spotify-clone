"use server";

import { getSupabaseClient } from "@/actions/getSupabaseClient";

import { Song } from "@/types/types";

export async function getAllSongs(): Promise<Song[] | null> {
  const supabase = getSupabaseClient();

  const { data: songsData, error: songsError } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (songsError || songsData.length === 0) {
    return null;
  }

  return songsData;
}
