import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

import { createClient } from "@/lib/supabase/client";
import { getSongWithUserLike } from "@/actions/getSongWithUserLike";

import { Song } from "@/types/types";
import { useUserStore } from "@/providers/user-store-provider";

function useGetSongById(id?: string) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [song, setSong] = React.useState<Song | undefined>(undefined);

  const userData = useUserStore((state) => state.userData);

  const supabase = createClient();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      if (!userData) {
        return toast.error("You must be logged in to play a song");
      }

      const songData = await getSongWithUserLike(id);

      if (songData.status === "error" || !songData.data) {
        return toast.error(songData.errorMessage);
      }

      setSong(songData.data);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabase]);

  return useMemo(() => {
    return {
      song,
      isLoading,
    };
  }, [isLoading, song]);
}

export default useGetSongById;
