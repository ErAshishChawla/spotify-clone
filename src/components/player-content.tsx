import React from "react";

import { Song } from "@/types/types";
import UserSongListItem from "./user-song-list-item";
import LikeButton from "./like-button";

interface PlayerContentProps {
  song: Song;
}

function PlayerContent({ song }: PlayerContentProps) {
  return (
    <div className="grid grid-cols md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-4">
          <UserSongListItem song={song} />
          <LikeButton song={song} />
        </div>
      </div>
    </div>
  );
}

export default PlayerContent;
