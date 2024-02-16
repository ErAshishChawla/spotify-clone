import React from "react";

import { getSongs } from "@/actions/getSongs";

import SongsGrid from "@/components/songs-grid";
import LikedSongsLink from "@/components/liked-songs-link";

function HomePage() {
  return (
    <div className="flex-1 p-8 flex flex-col gap-4">
      <h1 className="text-white text-3xl font-semibold">Welcome Back</h1>
      <LikedSongsLink />
      <SongsGrid fetch={() => getSongs()} />
    </div>
  );
}

export default HomePage;
