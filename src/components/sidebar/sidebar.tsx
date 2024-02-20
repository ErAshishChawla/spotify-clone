import React from "react";

import SidebarSongsLibrary from "@/components/sidebar/sidebar-songs-library";
import SidebarNavigation from "@/components/sidebar/sidebar-navigation";

function Sidebar() {
  return (
    <div className="flex-col h-full w-full flex gap-2">
      <div className="h-fit px-6 py-4 text-white bg-neutral-900/90 rounded-md">
        <SidebarNavigation />
      </div>
      <div className="flex-1 text-white bg-neutral-900/90 rounded-md px-6 py-4 overflow-y-auto">
        <SidebarSongsLibrary />
      </div>
    </div>
  );
}

export default Sidebar;
