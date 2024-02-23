"use client";
import React, { use } from "react";
import useSWR from "swr";

import MediaRowItemWithLikeSkeleton from "./app-view-colums/media-row-item-with-like-skeleton";

import AppViewColumn from "./app-view-colums/app-view-column";

import { useUserStore } from "@/providers/user-store-provider";
import { getSongsByTitle } from "@/fetchers/getSongsByTitle";

import { Song } from "@/types/types";

interface SearchContentProps {
  songs: Song[];
}

function SearchContent({ songs }: SearchContentProps) {
  return (
    <>
      <AppViewColumn songs={songs} />
    </>
  );
}

export default SearchContent;
