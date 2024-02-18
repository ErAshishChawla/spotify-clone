import React from "react";
import Image from "next/image";
import Link from "next/link";

import { FaPlay } from "react-icons/fa";

import { paths } from "@/paths";

function LikedSongsLink() {
  return (
    <Link
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4 w-72"
      href={paths.liked()}
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image
          src={"/images/liked.png"}
          alt="Heart icon"
          fill
          className="object-cover "
        />
      </div>
      <p className="font-medium truncate py-5">Liked Songs</p>
      <div className="absolute transition opacity-0 flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110 rounded-full">
        <FaPlay className="text-black" />
      </div>
    </Link>
  );
}

export default LikedSongsLink;
