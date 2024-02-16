"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

import { Song } from "@/types/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/supabase";

export async function getUserSongs(): Promise<Song[] | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    redirect("/auth/login");
  }

  const { data: songsData, error: songsError } = await supabase
    .from("songs")
    .select()
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (songsError || songsData.length === 0) {
    return null;
  }

  const modifiedSongsData: Song[] = songsData.map((song) => {
    return {
      ...song,
      image_public_path: supabase.storage
        .from("images")
        .getPublicUrl(song.image_path).data.publicUrl,
    };
  });

  //   revalidatePath("/");

  return modifiedSongsData;
}
