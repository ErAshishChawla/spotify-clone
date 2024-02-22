import { Song } from "@/types/types";
import React from "react";

import MediaRowItemWithLike from "@/components/app-view-colums/media-row-item-with-like";

interface AppViewColumnProps {
  songs: Song[];
}

function AppViewColumn({ songs }: AppViewColumnProps) {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      {songs.map((song) => {
        return <MediaRowItemWithLike key={song.id} song={song} />;
      })}
    </div>
  );
}

export default AppViewColumn;
