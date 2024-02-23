import React from "react";

import SongsGrid from "@/components/songs-grid/songs-grid";
import WelcomeMessage from "@/components/welcome-message";
import LikedSongsLink from "@/components/liked-songs-link";

function HomePage() {
  return (
    <div className="flex-1 p-8 flex flex-col gap-4">
      <WelcomeMessage />
      <LikedSongsLink />
      <SongsGrid />
    </div>
  );
}

export default HomePage;
