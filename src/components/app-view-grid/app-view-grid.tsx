import React from "react";

import AppViewGridPlayerWrapper from "@/components/app-view-grid/app-view-grid-player-wrapper";

import { Song } from "@/types/types";

interface AppViewGridProps {
  fetch: () => Promise<Song[] | null>;
}

async function AppViewGrid({ fetch }: AppViewGridProps) {
  const songs = await fetch();

  if (!songs) {
    return <div className="mt-4 text-neutral-400">No songs found!</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      <AppViewGridPlayerWrapper songs={songs} />
    </div>
  );
}

export default AppViewGrid;
