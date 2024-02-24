import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

import { createClient } from "@/lib/supabase/client";
import { getSongWithUserLike } from "@/actions/getSongWithUserLike";

import { Song } from "@/types/types";
import { useUserStore } from "@/providers/user-store-provider";

function useGetSongById(id?: string, userId?: string) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [song, setSong] = React.useState<Song | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (!id || !userId) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data: songData, error: songError } = await supabase
        .rpc("get_all_songs_with_user_liked_status", {
          input_user_id: userId || null,
        })
        .eq("id", id)
        .single();

      if (songError || !songData) {
        return toast.error(songError?.message || "An error occurred");
      }

      setSong(songData as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabase, userId]);

  return useMemo(() => {
    return {
      song,
      isLoading,
    };
  }, [isLoading, song]);
}

export default useGetSongById;
