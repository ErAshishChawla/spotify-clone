"use client";

import React from "react";

import { usePlayerStore } from "@/stores/usePlayerStore";
import useGetSongById from "@/hooks/useGetSongById";

function Player() {
  const player = usePlayerStore();
  const { song } = useGetSongById(player.active_id);

  if (!song || !player.active_id) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      Player
    </div>
  );
}

export default Player;
