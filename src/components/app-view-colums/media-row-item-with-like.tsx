import { Song } from "@/types/types";
import React from "react";

import MediaRowItem from "@/components/app-view-colums/media-row-item";
import LikeButton from "@/components/like-button";

interface MediaRowItemWithLikeProps {
  song: Song;
  onClick?: () => void;
}

function MediaRowItemWithLike({ song, onClick }: MediaRowItemWithLikeProps) {
  return (
    <div className="flex items-center gap-x-4 w-full">
      <div className="flex-1">
        <MediaRowItem song={song} onClick={onClick} />
      </div>
      <LikeButton song={song} />
    </div>
  );
}

export default MediaRowItemWithLike;
