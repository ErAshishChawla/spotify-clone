"use server";

import { cookies } from "next/headers";

import { songLikeResponseType } from "@/types/form-types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";

export async function toggleSongLike(
  songId: string,
  isliked: boolean
): Promise<songLikeResponseType> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return {
      status: "error",
      successMessage: "",
      errors: {
        _form: ["You need to be logged in to like a song"],
      },
    };
  }

  if (isliked) {
    const { error } = await supabase
      .from("liked_songs")
      .delete()
      .eq("song_id", songId)
      .eq("user_id", userData.user.id);

    if (error) {
      return {
        status: "error",
        successMessage: "",
        errors: {
          _form: ["An error occurred while unliking the song"],
        },
      };
    }

    revalidatePath(paths.search());
    revalidatePath(paths.liked());

    return {
      status: "success",
      successMessage: "Song unliked!",
      errors: {
        _form: [],
      },
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
        successMessage: "",
        errors: {
          _form: ["An error occurred while liking the song"],
        },
      };
    }

    revalidatePath(paths.search());
    revalidatePath(paths.liked());

    return {
      status: "success",
      successMessage: "Song liked!",
      errors: {
        _form: [],
      },
    };
  }
}
