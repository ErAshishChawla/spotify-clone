import Image from "next/image";
import React from "react";

import AppViewColumn from "@/components/app-view-colums/app-view-column";

import { getLikedSongs } from "@/actions/userLoggedIn/getLikedSongs";

function LikedPage() {
  return (
    <div className="flex-1 p-8 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center gap-x-5">
        <div className="relative h-32 w-32 lg:h-44 lg:w-44">
          <Image
            fill
            src={"/images/liked.png"}
            alt="Heart icon"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
          <p className="hidden md:block font-semibold text-sm">Playlist</p>
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Liked Songs
          </h1>
        </div>
      </div>
      <AppViewColumn fetch={() => getLikedSongs()} />
    </div>
  );
}

export default LikedPage;
