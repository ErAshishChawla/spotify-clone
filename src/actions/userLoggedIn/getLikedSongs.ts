"use server";

import { redirect } from "next/navigation";

import { Song } from "@/types/types";

import { getUser } from "@/actions/getUser";
import { getSupabaseClient } from "@/actions/getSupabaseClient";

import { paths } from "@/paths";

export async function getLikedSongs(): Promise<Song[] | null> {
  const supabase = getSupabaseClient();
  const user = await getUser();

  if (!user) {
    redirect(paths.defaultInvalidUserRedirect());
  }

  const { data: songsData, error: songsError } = await supabase
    .rpc("get_all_songs_with_user_liked_status", {
      input_user_id: user.id,
    })
    .eq("isliked", true);

  if (songsError || songsData.length === 0) {
    return null;
  }

  return songsData;
}
