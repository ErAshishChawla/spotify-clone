import React, { Suspense } from "react";

import { TbPlaylist } from "react-icons/tb";
import { Skeleton } from "@nextui-org/react";

import UserSongList from "@/components/user-song-list";
import UploadSongButton from "@/components/upload-song-button";

function SongsLibrary() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-white/70 hover:text-white transition cursor-pointer">
          <TbPlaylist size={26} />
          <p className="truncate text-sm">Your Library</p>
        </div>
        <UploadSongButton />
      </div>
      <div className="flex-1 flex-col flex">
        <Suspense fallback={<div>Loading...</div>}>
          <UserSongList />
        </Suspense>
      </div>
    </div>
  );
}

export default SongsLibrary;
