"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import { paths } from "@/paths";

import { songLikeResponseType } from "@/types/form-types";

export async function toggleSongLike(
  songId: string,
  isLiked: boolean
): Promise<songLikeResponseType> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return {
      status: "error",
      errorMessage: "You must be logged in to like a song",
    };
  }

  if (isLiked) {
    const { error } = await supabase
      .from("liked_songs")
      .delete()
      .eq("song_id", songId)
      .eq("user_id", userData.user.id);

    if (error) {
      return {
        status: "error",
        errorMessage: "An error occurred while unliking the song",
      };
    }

    revalidatePath(paths.search());
    revalidatePath(paths.liked());

    return {
      status: "success",
      successMessage: "Song unliked!",
    };
  } else {
    const { error } = await supabase.from("liked_songs").insert([
      {
        user_id: userData.user.id,
        song_id: songId,
      },
    ]);

    if (error) {
      return {
        status: "error",
        errorMessage: "An error occurred while unliking the song",
      };
    }

    revalidatePath(paths.search());
    revalidatePath(paths.liked());

    return {
      status: "success",
      successMessage: "Song liked!",
    };
  }
}
