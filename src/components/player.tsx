"use client";

import React from "react";

import { usePlayerStore } from "@/providers/player-provider";
import useGetSongById from "@/hooks/useGetSongById";

import PlayerContent from "@/components/player-content";

function Player() {
  const player = usePlayerStore((state) => state);
  // console.log("player", player);
  const { song, isLoading } = useGetSongById(player.active_id);
  // console.log("song", song);

  if (!song || !player.active_id) {
    return;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent song={song} key={song.song_public_path} />
    </div>
  );
}

export default Player;
