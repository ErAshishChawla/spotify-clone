import { Song } from "@/types/types";
import React from "react";

import UserSongListItem from "@/components/user-song-list-item";
import LikeButton from "@/components/like-button";

interface SearchContentProps {
  fetch: () => Promise<Song[] | null>;
}

async function SearchContent({ fetch }: SearchContentProps) {
  const songs = await fetch();

  if (!songs) {
    return <div className="mt-4 text-neutral-400">No songs found!</div>;
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {songs.map((song) => {
        return (
          <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <UserSongListItem song={song} />
            </div>
            <LikeButton songId={song.id} />
          </div>
        );
      })}
    </div>
  );
}

export default SearchContent;
