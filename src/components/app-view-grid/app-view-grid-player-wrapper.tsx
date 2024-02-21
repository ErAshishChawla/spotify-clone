"use client";

import React from "react";

import AppViewGridItem from "@/components/app-view-grid/app-view-grid-item";
import { useConfigurePlayer } from "@/hooks/useConfigurePlayer";

import { Song } from "@/types/types";

interface AppViewGridPlayerWrapperProps {
  songs: Song[];
}

function AppViewGridPlayerWrapper({ songs }: AppViewGridPlayerWrapperProps) {
  const onSongPlay = useConfigurePlayer(songs);

  return songs.map((song) => {
    return (
      <AppViewGridItem
        key={song.id}
        song={song}
        onClick={() => {
          onSongPlay(song.id);
        }}
      />
    );
  });
}

export default AppViewGridPlayerWrapper;
