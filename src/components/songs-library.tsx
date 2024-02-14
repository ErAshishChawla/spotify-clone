import { Button } from "@nextui-org/react";
import React from "react";

import { IoAdd } from "react-icons/io5";
import { TbPlaylist } from "react-icons/tb";

function SongsLibrary() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-white/70 hover:text-white transition cursor-pointer">
          <TbPlaylist size={26} />
          <p className="truncate text-sm">Your Library</p>
        </div>
        <button className=" text-white/70 hover:text-white rounded-full p-0.5 hover:bg-white/10 transition">
          <IoAdd size={26} />
        </button>
      </div>
      <div>Songs list</div>
    </div>
  );
}

export default SongsLibrary;
