"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";

import PlayerContent from "@/components/music-player/player-content";

import { useGetSongPath } from "@/hooks/useGetSongPath";
import { useUserStore } from "@/providers/user-store-provider";
import { usePlayerStore } from "@/providers/player-provider";
import useGetSongById from "@/hooks/useGetSongById";
import { Skeleton } from "@nextui-org/react";

function Player() {
  const { isLoggedIn, userData, isFetchingUser } = useUserStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    userData: state.userData,
    isFetchingUser: state.isFetchingUser,
  }));

  const activeSongId = usePlayerStore((state) => state.activeSongId);

  const { song, isLoading } = useGetSongById(activeSongId, userData?.id);

  const songPublicPath = useGetSongPath(song!);

  let content: React.ReactNode = null;

  if (!song || !activeSongId || !songPublicPath) {
    return null;
  } else if (!isLoggedIn) {
    return toast.error("You need to be logged in to play music");
  } else if (isLoading || isFetchingUser) {
    content = <Skeleton className="w-full h-full" />;
  } else {
    content = (
      <PlayerContent
        song={song}
        key={songPublicPath}
        songUrl={songPublicPath}
      />
    );
  }

  return <div className=" bg-black pt-6 pb-2 px-4 h-fit">{content}</div>;
}

export default Player;
