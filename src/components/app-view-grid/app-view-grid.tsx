import React from "react";

import AppViewGridPlayerWrapper from "@/components/app-view-grid/app-view-grid-player-wrapper";

import { Song } from "@/types/types";

interface AppViewGridProps {
  songs: Song[];
}

function AppViewGrid({ songs }: AppViewGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      <AppViewGridPlayerWrapper songs={songs} />
    </div>
  );
}

export default AppViewGrid;
