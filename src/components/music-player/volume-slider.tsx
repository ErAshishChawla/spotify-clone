"use client";

import React from "react";
import { HTMLMediaState } from "react-use/lib/factory/createHTMLMediaHook";

import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Slider } from "@nextui-org/react";

interface VolumeSliderProps {
  state: HTMLMediaState;
  controls: {
    play: () => Promise<void> | undefined;
    pause: () => void;
    seek: (time: number) => void;
    volume: (volume: number) => void;
    mute: () => void;
    unmute: () => void;
  };
}

function VolumeSlider({ state, controls }: VolumeSliderProps) {
  const VolumeIcon = state.volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const toggleMute = () => {
    if (state.volume === 0) {
      controls.volume(1);
    } else {
      controls.volume(0);
    }
  };

  return (
    <div className="flex items-center gap-x-2 w-[120px]">
      <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={34} />
      <Slider
        step={0.1}
        maxValue={1}
        minValue={0}
        size="sm"
        aria-label="Volume"
        color="foreground"
        value={state.volume}
        onChange={(value) => {
          if (value instanceof Array) {
            return controls.volume(value[0]);
          }
          return controls.volume(value);
        }}
      />
    </div>
  );
}

export default VolumeSlider;
