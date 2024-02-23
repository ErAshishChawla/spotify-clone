"use client";

import React from "react";
import { useAudio } from "react-use";

import MediaRowItem from "@/components/app-view-colums/media-row-item";
import VolumeSlider from "@/components/music-player/volume-slider";
import LikeButton from "@/components/like-button";
import PlayerControllerMobile from "@/components/music-player/player-controller-mobile";
import PlayerController from "@/components/music-player/player-controller";

import { Song } from "@/types/types";

import { usePlayerStore } from "@/providers/player-provider";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const player = usePlayerStore((state) => state);
  const { allSongIds, activeSongId } = player;
  const { setActiveSongId } = player;

  const onPlayNext = () => {
    if (allSongIds.length === 0) {
      return;
    }

    const currentSongIdIndex = allSongIds.findIndex(
      (id) => id === activeSongId
    );
    const nextSongId = allSongIds[currentSongIdIndex + 1];

    if (!nextSongId) {
      return setActiveSongId(allSongIds[0]);
    }

    setActiveSongId(nextSongId);
  };

  const onPlayPrevious = () => {
    if (allSongIds.length === 0) {
      return;
    }

    if (state.time > 10) {
      return controls.seek(0);
    }

    const currentSongIdIndex = allSongIds.findIndex(
      (id) => id === activeSongId
    );
    const previousSongId = allSongIds[currentSongIdIndex - 1];

    if (!previousSongId) {
      return setActiveSongId(allSongIds[allSongIds.length - 1]);
    }

    setActiveSongId(previousSongId);
  };

  const [audio, state, controls, ref] = useAudio({
    src: songUrl,
    autoPlay: true,
    onEnded: () => {
      onPlayNext();
    },
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full w-full">
      {audio}
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-4">
          <MediaRowItem song={song} />
          <LikeButton song={song} />
        </div>
      </div>

      <PlayerControllerMobile
        state={state}
        controls={controls}
        onPlayNext={onPlayNext}
        onPlayPrevious={onPlayPrevious}
      />

      <PlayerController
        state={state}
        controls={controls}
        onPlayNext={onPlayNext}
        onPlayPrevious={onPlayPrevious}
      />

      <div className="hidden md:flex justify-end pr-2">
        <VolumeSlider state={state} controls={controls} />
      </div>
    </div>
  );
}

export default PlayerContent;
