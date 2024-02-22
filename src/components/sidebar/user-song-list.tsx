"use client";

import React from "react";
import useSWR from "swr";

import MediaRowItem from "@/components/app-view-colums/media-row-item";

import { useUserStore } from "@/providers/user-store-provider";
import { getUserSongs } from "@/fetchers/getUserSongs";
import MediaRowItemSkeleton from "../app-view-colums/media-row-item-skeleton";

function UserSongList() {
  // Getting the user loggedin status and data
  const user = useUserStore((state) => state);

  // use useSWR to fetch user songs
  const { isLoading, data, error } = useSWR(
    user.isLoggedIn && user.userData && `user-songs/${user.userData.id}`,
    () => {
      if (!user.isLoggedIn || !user.userData || !user.userData.id) {
        return null;
      }

      return getUserSongs(user.userData.id);
    }
  );

  let content: React.ReactNode = null;

  if (isLoading || user.isFetchingUser || user.isReset) {
    content = Array(5)
      .fill(0)
      .map((_, i) => {
        return <MediaRowItemSkeleton key={i} />;
      });
  } else {
    if (!user.isLoggedIn) {
      content = (
        <div className="mt-4 text-neutral-400">You are not logged in</div>
      );
    }

    if (error) {
      content = (
        <div className="mt-4 text-neutral-400">Error fetching user songs</div>
      );
    }

    if (data && data.length === 0) {
      content = (
        <div className="mt-4 text-neutral-400">Your library is empty!</div>
      );
    }

    if (data && data.length > 0) {
      content = data.map((song) => {
        return <MediaRowItem key={song.id} song={song} />;
      });
    }
  }

  return content;
}

export default UserSongList;
