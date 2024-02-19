"use client";

import React from "react";

import { Song } from "@/types/types";
import { useOnPlay } from "@/hooks/useSongPlay";

import SongItem from "@/components/song-item";

interface SongGridPlayerWrapperProps {
  songs: Song[];
}

function SongGridPlayerWrapper({ songs }: SongGridPlayerWrapperProps) {
  const onPlay = useOnPlay(songs);

  return (
    <>
      {songs.map((song) => {
        return (
          <SongItem key={song.id} song={song} onClick={() => onPlay(song.id)} />
        );
      })}
    </>
  );
}

export default SongGridPlayerWrapper;
