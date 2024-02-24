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

  // Handle side effects like showing a toast in a useEffect
  useEffect(() => {
    if (!isLoggedIn && activeSongId) {
      toast.error("You need to be logged in to play music");
    }
  }, [isLoggedIn, activeSongId]); // Dependencies ensure this runs only when isLoggedIn or activeSongId changes

  if (!song || !activeSongId || !songPublicPath || !isLoggedIn) {
    return null;
  } else if (isLoading || isFetchingUser) {
    return <Skeleton className="w-full h-[80px] rounded-full" />;
  } else {
    return (
      <div className="bg-black pt-6 pb-2 px-4">
        <PlayerContent
          song={song}
          key={songPublicPath}
          songUrl={songPublicPath}
        />
      </div>
    );
  }
}

export default Player;
