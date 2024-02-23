import Image from "next/image";
import React from "react";

import { useGetImagePath } from "@/hooks/useGetImagePath";

import { Song } from "@/types/types";

interface MediaRowItemProps {
  song: Song;
}

function MediaRowItem({ song }: MediaRowItemProps) {
  const imagePublicUrl = useGetImagePath(song);

  return (
    <div className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md">
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imagePublicUrl || "/images/liked.png"}
          alt="song image"
          className="object-cover"
          sizes="100%"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{song.title}</p>
        <p className="text-neutral-400 text-sm truncate">{song.author}</p>
      </div>
    </div>
  );
}

export default MediaRowItem;
