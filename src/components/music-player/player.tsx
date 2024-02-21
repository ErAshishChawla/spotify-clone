"use client";

import React from "react";

import { usePlayerStore } from "@/providers/player-provider";
import useGetSongById from "@/hooks/useGetSongById";

import PlayerContent from "@/components/music-player/player-content";
import { useGetSongPath } from "@/hooks/useGetSongPath";

function Player() {
  const activeSongId = usePlayerStore((state) => state.activeSongId);

  const { song, isLoading } = useGetSongById(activeSongId);
  const songPublicPath = useGetSongPath(song);

  if (!song || !activeSongId || !songPublicPath) {
    return;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[120px] px-4">
      <PlayerContent
        song={song}
        key={songPublicPath}
        songUrl={songPublicPath}
      />
    </div>
  );
}

export default Player;
