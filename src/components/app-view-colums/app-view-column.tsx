import { Song } from "@/types/types";
import React from "react";

import MediaRowItemWithLike from "@/components/app-view-colums/media-row-item-with-like";

interface AppViewColumnProps {
  fetch: () => Promise<Song[] | null>;
}

async function AppViewColumn({ fetch }: AppViewColumnProps) {
  const songs = await fetch();

  if (!songs) {
    return <div className="mt-4 text-neutral-400">No songs found!</div>;
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {songs.map((song) => {
        return <MediaRowItemWithLike key={song.id} song={song} />;
      })}
    </div>
  );
}

export default AppViewColumn;
