"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { Song } from "@/types/types";

import { paths } from "@/paths";

export async function getSongsWithLogin(): Promise<Song[] | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    redirect(paths.defaultInvalidUserRedirect());
  }

  const { data: songsData, error: songsError } = await supabase.rpc(
    "get_all_songs_with_user_liked_status",
    {
      input_user_id: userData.user.id,
    }
  );

  if (songsError || songsData.length === 0) {
    return null;
  }

  return songsData;
}
