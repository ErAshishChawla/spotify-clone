"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getSongsWithLogin } from "@/actions/userLoggedIn/getSongsWithLogin";

import { paths } from "@/paths";

import { Song } from "@/types/types";

export async function getSongsByTitleWithLogin(
  title: string
): Promise<Song[] | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    redirect(paths.defaultInvalidUserRedirect());
  }

  if (!title) {
    return getSongsWithLogin();
  }

  const { data: songsData, error: songsError } = await supabase
    .rpc("get_all_songs_with_user_liked_status", {
      input_user_id: userData.user?.id,
    })
    .ilike("title", `%${title}%`);
  console.log(songsData);

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
