import { useRouter } from "next/navigation";

import { Song } from "@/types/types";

import { usePlayerStore } from "@/providers/player-provider";
import { useUserStore } from "@/providers/user-store-provider";

import { createClient } from "@/lib/supabase/client";

import { toast } from "react-toastify";

export const useOnPlay = (songs: Song[]) => {
  const router = useRouter();
  const player = usePlayerStore((state) => state);
  const userData = useUserStore((state) => state.userData);

  const supabase = createClient();

  const onPlay = async (id: string) => {
    if (!userData) {
      toast.error("You must be logged in to play a song");
      await supabase.auth.signOut();
      return router.replace("/login");
    }

    player.setActiveSongId(id);
    player.setAllSongIds(songs.map((song) => song.id));
  };

  return onPlay;
};
