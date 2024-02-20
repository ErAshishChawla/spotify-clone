"use client";

import React from "react";

import AppViewGridItem from "@/components/app-view-grid/app-view-grid-item";
import { useOnPlay } from "@/hooks/useSongPlay";

import { Song } from "@/types/types";

interface AppViewGridPlayerWrapperProps {
  songs: Song[];
}

function AppViewGridPlayerWrapper({ songs }: AppViewGridPlayerWrapperProps) {
  const onPlay = useOnPlay(songs);

  return songs.map((song) => {
    return (
      <AppViewGridItem
        key={song.id}
        song={song}
        onClick={async () => {
          onPlay(song.id);
        }}
      />
    );
  });
}

export default AppViewGridPlayerWrapper;
