import React from "react";

import AppViewGrid from "@/components/app-view-grid/app-view-grid";
import WelcomeMessage from "@/components/welcome-message";
import LikedSongsLink from "@/components/liked-songs-link";

import { getAllSongs } from "@/actions/getAllSongs";

function HomePage() {
  return (
    <div className="flex-1 p-8 flex flex-col gap-4">
      <WelcomeMessage />
      <LikedSongsLink />
      <AppViewGrid fetch={() => getAllSongs()} />
    </div>
  );
}

export default HomePage;
