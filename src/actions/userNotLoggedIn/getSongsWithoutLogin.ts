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

  return songsData;
}
