import React, { Suspense } from "react";
import { getAllSongs } from "@/actions/getAllSongs";

import SongsGrid from "@/components/songs-grid";
import WelcomeMessage from "@/components/welcome-message";
import LikedSongsLink from "@/components/liked-songs-link";

async function HomePage() {
  return (
    <div className="flex-1 p-8 flex flex-col gap-4">
      <WelcomeMessage />
      <LikedSongsLink />
      <Suspense fallback={<div>Loading...</div>}>
        <SongsGrid fetch={() => getAllSongs()} />
      </Suspense>
    </div>
  );
}

export default HomePage;
