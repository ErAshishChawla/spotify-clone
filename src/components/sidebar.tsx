import React from "react";

function Sidebar() {
  return (
    <div className="flex-col h-full hidden md:flex gap-4">
      <div className="h-fit px-6 py-4 text-white bg-neutral-900/90 rounded-md">
        nav list
      </div>
      <div className="flex-1  text-white bg-neutral-900/90 rounded-md px-6 py-4">
        library
      </div>
    </div>
  );
}

export default Sidebar;
