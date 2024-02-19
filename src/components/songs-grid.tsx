import React from "react";

import SongGridPlayerWrapper from "@/components/song-grid-player-wrapper";

import { Song } from "@/types/types";

interface SongsGridProps {
  fetch: () => Promise<Song[] | null>;
}

async function SongsGrid({ fetch }: SongsGridProps) {
  const songs = await fetch();

  if (!songs) {
    return <div className="mt-4 text-neutral-400">No songs found!</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      <SongGridPlayerWrapper songs={songs} />
    </div>
  );
}

export default SongsGrid;
