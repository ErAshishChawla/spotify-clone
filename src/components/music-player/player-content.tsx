"use client";

import React, { useEffect, useState } from "react";
import useSound from "use-sound";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { Slider } from "@nextui-org/react";

import MediaRowItem from "@/components/app-view-colums/media-row-item";
import MediaRowItemWithLike from "@/components/app-view-colums/media-row-item-with-like";
import LikeButton from "@/components/like-button";

import { Song } from "@/types/types";

import { usePlayerStore } from "@/providers/player-provider";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const player = usePlayerStore((state) => state);
  const { allSongIds, volume, isPlaying, activeSongId } = player;
  const { setActiveSongId, setIsPlaying, setVolume } = player;

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

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

    const currentSongIdIndex = allSongIds.findIndex(
      (id) => id === activeSongId
    );
    const previousSongId = allSongIds[currentSongIdIndex - 1];

    if (!previousSongId) {
      return setActiveSongId(allSongIds[allSongIds.length - 1]);
    }

    setActiveSongId(previousSongId);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    // onplay: () => setIsPlaying(true),
    // onend: () => {
    //   setIsPlaying(false);
    //   onPlayNext();
    // },
    // onpause: () => setIsPlaying(false),
    format: [".mp3"],
  });

  // useEffect(() => {
  //   sound?.play();

  //   return () => {
  //     sound?.unload();
  //   };
  // });

  const handlePlay = () => {
    console.log("ran");
    if (!isPlaying) {
      console.log(isPlaying);
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-4">
          <MediaRowItem song={song} />
          <LikeButton song={song} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white  p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6 self-center">
        <button onClick={onPlayPrevious}>
          <AiFillStepBackward
            size={30}
            className="text-neutral-400 hover:text-white transition"
          />
        </button>

        <div
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
          onClick={play}
        >
          <Icon size={30} className="text-black" />
        </div>

        <button onClick={onPlayNext}>
          <AiFillStepBackward
            size={30}
            className="text-neutral-400 hover:text-white transition"
          />
        </button>
      </div>

      <div className="hidden md:flex justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider
            step={0.1}
            maxValue={1}
            minValue={0}
            size="sm"
            aria-label="Volume"
            color="foreground"
            value={volume}
            onChange={(value) => {
              if (value instanceof Array) {
                return setVolume(value[0]);
              }
              return setVolume(value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayerContent;
