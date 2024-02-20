"use server";

import { Song } from "@/types/types";
import { redirect } from "next/navigation";

import { getUser } from "@/actions/getUser";
import { getSupabaseClient } from "@/actions/getSupabaseClient";

import { paths } from "@/paths";

export async function getUserSongs(): Promise<Song[] | null> {
  const supabase = getSupabaseClient();
  const user = await getUser();

  if (!user) {
    redirect(paths.defaultInvalidUserRedirect());
  }

  const { data: songsData, error: songsError } = await supabase
    .from("songs")
    .select()
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (songsError || songsData.length === 0) {
    return null;
  }

  return songsData;
}
