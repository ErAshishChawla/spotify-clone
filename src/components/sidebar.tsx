import React from "react";

import Navigation from "@/components/navigation";
import SongsLibrary from "@/components/songs-library";

function Sidebar() {
  return (
    <div className="flex-col h-full w-full flex gap-2">
      <div className="h-fit px-6 py-4 text-white bg-neutral-900/90 rounded-md">
        <Navigation />
      </div>
      <div className="flex-1 text-white bg-neutral-900/90 rounded-md px-6 py-4 overflow-y-auto">
        <SongsLibrary />
      </div>
    </div>
  );
}

export default Sidebar;
