"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

import { Song } from "@/types/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getLikedSongs(): Promise<Song[] | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    redirect("/auth/login");
  }

  const { data: songsData, error: songsError } = await supabase
    .from("liked_songs")
    .select("*,songs(*)")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (songsError || songsData.length === 0) {
    return null;
  }

  const likedSongData = songsData.map((items) => {
    return { ...items.songs };
  });

  const modifiedSongsData: Song[] = likedSongData.map((song) => {
    return {
      ...song,
      image_public_path: supabase.storage
        .from("images")
        .getPublicUrl(song.image_path).data.publicUrl,
      isLiked: true,
    };
  });

  //   revalidatePath("/");

  return modifiedSongsData;
}
