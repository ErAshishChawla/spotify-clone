"use client";

import React from "react";

import MediaRowItemWithLike from "@/components/app-view-colums/media-row-item-with-like";

import { useConfigurePlayer } from "@/hooks/useConfigurePlayer";

import { Song } from "@/types/types";

interface AppViewColumnProps {
  songs: Song[];
}

function AppViewColumn({ songs }: AppViewColumnProps) {
  const onSongPlay = useConfigurePlayer(songs);

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {songs.map((song) => {
        return (
          <MediaRowItemWithLike
            key={song.id}
            song={song}
            onClick={() => {
              onSongPlay(song.id);
            }}
          />
        );
      })}
    </div>
  );
}

export default AppViewColumn;
