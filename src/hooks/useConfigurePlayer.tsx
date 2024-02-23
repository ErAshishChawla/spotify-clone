import { usePlayerStore } from "@/providers/player-provider";
import { useUserStore } from "@/providers/user-store-provider";

import { Song } from "@/types/types";
import { toast } from "react-toastify";

export const useConfigurePlayer = (songs: Song[]) => {
  const playerActions = usePlayerStore((state) => ({
    setAllSongIds: state.setAllSongIds,
    setActiveSongId: state.setActiveSongId,
    reset: state.reset,
  }));

  const userData = useUserStore((state) => state.userData);

  const onSongPlay = (songId: string) => {
    if (!songId || !songs) {
      console.log("No song id or songs found");
      return playerActions.reset();
    }

    if (!userData) {
      toast.error("You need to be logged in to play a song");
      return playerActions.reset();
    }

    playerActions.setActiveSongId(songId);
    playerActions.setAllSongIds(songs.map((song) => song.id));

    return;
  };

  return onSongPlay;
};
