"use client";
import React, { use } from "react";
import useSWR from "swr";

import MediaRowItemWithLikeSkeleton from "./app-view-colums/media-row-item-with-like-skeleton";

import AppViewColumn from "./app-view-colums/app-view-column";

import { useUserStore } from "@/providers/user-store-provider";
import { getSongsByTitle } from "@/fetchers/getSongsByTitle";

interface SearchContentProps {
  title: string;
}

function SearchContent({ title }: SearchContentProps) {
  // // User state for different fetching functions
  // const user = useUserStore((state) => state);
  // const {
  //   data: loggedInSongData,
  //   error: loggedInSongError,
  //   isLoading: loggedInSongIsLoading,
  // } = useSWR(!user.userData && `songs/${title}`, () => {
  //   return getSongsByTitle(title);
  // });

  // const {
  //   data: loggedOutSongData,
  //   error: loggedOutSongError,
  //   isLoading: loggedOutSongIsLoading,
  // } = useSWR(user.userData && `songs/${user.userData}/${title}`, () => {
  //   return getSongsByTitle(title);
  // });

  // let content: React.ReactNode = null;

  // if (isLoading || user.isFetchingUser || user.isReset) {
  //   content = Array(5)
  //     .fill(0)
  //     .map((_, i) => <MediaRowItemWithLikeSkeleton key={i} />);
  // } else if (error) {
  //   content = (
  //     <div className="mt-4 text-neutral-400">Error fetching songs!</div>
  //   );
  // } else if ((data && data.length === 0) || !data) {
  //   content = <div className="mt-4 text-neutral-400">No songs found!</div>;
  // } else if (data && data.length > 0) {
  //   content = <AppViewColumn songs={data} />;
  // }

  // return content;

  const user = useUserStore((state) => state);

  let content: React.ReactNode = null;

  // if user is in reset state, we show skeleton
  // if user is not in reset state and is fetching user, we show skeleton,
  if (user.isReset || user.isFetchingUser) {
    content = (
      <div className="flex flex-col gap-y-2 w-full">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <MediaRowItemWithLikeSkeleton key={i} />
          ))}
      </div>
    );
  }

  // if user is not in reset state and is not fetching user and is not logged in , we show search content for user not logged in

  // if (user is not in reset state and is not fetching user and is is logged in, we show search content for user logged in)
}

export default SearchContent;
