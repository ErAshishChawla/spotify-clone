import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

import { createClient } from "@/lib/supabase/client";

import { Song } from "@/types/types";

function useGetSongById(id?: string) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [song, setSong] = React.useState<Song | undefined>(undefined);

  const supabase = createClient();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        console.error("Error fetching user", userError);
        toast.error("You must be logged in to play a song");
        setIsLoading(false);
        return;
      }

      const { data: songData, error: songError } = await supabase
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (songError) {
        setIsLoading(false);
        toast.error("Error fetching song");
        console.error("Error fetching song", songError);
        return;
      }

      const { data: songUrl } = supabase.storage
        .from("songs")
        .getPublicUrl(song?.song_path!);

      const { data: imageUrl } = supabase.storage
        .from("images")
        .getPublicUrl(song?.image_path!);

      if (!songUrl || !imageUrl) {
        setIsLoading(false);
        toast.error("Error fetching song from storage");
        return;
      }

      setSong({
        ...songData,
        song_public_path: songUrl.publicUrl,
        image_public_path: imageUrl.publicUrl,
      } as Song);
    };

    fetchSong();
  }, [id, supabase, song?.song_path, song?.image_path]);

  return useMemo(() => {
    return {
      song,
      isLoading,
    };
  }, [isLoading, song]);
}

export default useGetSongById;
