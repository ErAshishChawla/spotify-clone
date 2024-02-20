"use client";

import React from "react";
import Image from "next/image";

import PlayButton from "@/components/app-view-grid/play-button";

import { useGetImagePath } from "@/hooks/useGetImagePath";

import { Song } from "@/types/types";

interface AppViewGridItemProps {
  song: Song;
  // onClick: () => Promise<void>;
}

function AppViewGridItem({ song }: AppViewGridItemProps) {
  const imagePublicUrl = useGetImagePath(song);

  return (
    <div
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
      // onClick={onClick}
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePublicUrl || "/images/liked.png"}
          fill
          alt="song image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{song.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          By {song.author}
        </p>
      </div>

      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
}

export default AppViewGridItem;
