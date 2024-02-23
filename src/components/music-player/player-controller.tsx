"use client";

import React, { useState } from "react";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { Slider } from "@nextui-org/react";

import { secondsToTimeString } from "@/utils";

interface PlayerControllerProps {
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

function PlayerController({
  state,
  controls,
  onPlayNext,
  onPlayPrevious,
}: PlayerControllerProps) {
  const [showThumb, setShowThumb] = useState(false);
  const Icon = state.playing ? BsPauseFill : BsPlayFill;

  const handlePlay = () => {
    if (state.paused) {
      controls.play();
    } else {
      controls.pause();
    }
  };

  return (
    <div className="hidden h-full md:flex flex-col w-full max-w-[722px] items-center gap-y-1">
      <div className="flex-1 flex flex-row justify-center items-center gap-x-6">
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
      <div className="w-full">
        <Slider
          step={1}
          maxValue={Math.ceil(state.duration)}
          minValue={0}
          size="sm"
          color="foreground"
          value={Math.ceil(state.time)}
          label={"Time"}
          renderLabel={() => {
            return <p></p>;
          }}
          hideThumb={!showThumb}
          onMouseEnter={() => {
            setShowThumb(true);
          }}
          onMouseLeave={() => {
            setShowThumb(false);
          }}
          renderValue={(value) => {
            return (
              <p className="text-xs">
                {secondsToTimeString(
                  Math.ceil(state.duration - Number(value.children))
                )}
              </p>
            );
          }}
          onChange={(value) => {
            if (value instanceof Array) {
              return controls.seek(value[0]);
            }
            return controls.seek(value);
          }}
        />
      </div>
    </div>
  );
}

export default PlayerController;
