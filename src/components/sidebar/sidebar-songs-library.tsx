import React from "react";

import { TbPlaylist } from "react-icons/tb";

import UserSongList from "@/components/sidebar/user-song-list";
import UploadSongButton from "@/components/upload-song-button";

function SidebarSongsLibrary() {
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
        <UserSongList />
      </div>
    </div>
  );
}

export default SidebarSongsLibrary;
