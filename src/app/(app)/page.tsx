import React, { Suspense } from "react";
import { getAllSongs } from "@/actions/getAllSongs";

import SongsGrid from "@/components/songs-grid";
import WelcomeMessage from "@/components/welcome-message";
import LikedSongsLink from "@/components/liked-songs-link";

import { getSongsWithoutLogin } from "@/actions/userNotLoggedIn/getSongsWithoutLogin";
import { getSongsWithLogin } from "@/actions/userLoggedIn/getSongsWithLogin";
import { getUser } from "@/actions/getUser";

async function HomePage() {
  const user = await getUser();

  return (
    <div className="flex-1 p-8 flex flex-col gap-4">
      <WelcomeMessage />
      <LikedSongsLink />
      <Suspense fallback={<div>Loading...</div>}>
        <SongsGrid
          fetch={() => (!user ? getSongsWithoutLogin() : getSongsWithLogin())}
        />
      </Suspense>
    </div>
  );
}

export default HomePage;
