"use server";

import { getUser } from "./getUser";
import { getSupabaseClient } from "./getSupabaseClient";
import { FetchRequest } from "@/types/fetch-types";
import { Song } from "@/types/types";

async function getSongWithUserLike(
  songId: string
): Promise<FetchRequest<Song>> {
  const supabase = getSupabaseClient();
  const user = await getUser();

  if (!user) {
    return {
      status: "success",
      data: null,
      errorMessage: "You must be logged in to play a song",
    };
  }

  const { data: songData, error: songError } = await supabase
    .rpc("get_song_with_user_liked_status", {
      input_song_id: songId,
      input_user_id: user.id,
    })
    .single();

  if (songError || !songData) {
    return {
      status: "error",
      data: null,
      errorMessage: "There was an error fetching the song",
    };
  }

  return {
    status: "success",
    data: songData as Song,
    successMessage: "Song fetched successfully",
  };
}

export { getSongWithUserLike };
