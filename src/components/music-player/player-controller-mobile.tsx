"use client";

import React from "react";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";

import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

interface PlayerControllerMobileProps {
  state: HTMLMediaState;
  controls: {
    play: () => Promise<void> | undefined;
    pause: () => void;
    seek: (time: number) => void;
    volume: (volume: number) => void;
    mute: () => void;
    unmute: () => void;
  };
  onPlayPrevious: () => void;
  onPlayNext: () => void;
}

function PlayerControllerMobile({
  state,
  controls,
  onPlayNext,
  onPlayPrevious,
}: PlayerControllerMobileProps) {
  const Icon = state.playing ? BsPauseFill : BsPlayFill;

  const handlePlay = () => {
    if (state.paused) {
      controls.play();
    } else {
      controls.pause();
    }
  };
  return (
    <div className="flex md:hidden col-auto w-full justify-end items-center gap-x-6">
      <button onClick={onPlayPrevious}>
        <AiFillStepBackward
          size={30}
          className="text-neutral-400 hover:text-white transition"
        />
      </button>

      <button
        className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        onClick={handlePlay}
      >
        <Icon size={30} className="text-black" />
      </button>

      <button onClick={onPlayNext}>
        <AiFillStepForward
          size={30}
          className="text-neutral-400 hover:text-white transition"
        />
      </button>
    </div>
  );
}

export default PlayerControllerMobile;
