import React, { Suspense } from "react";

import SongSearchBar from "@/components/song-search-bar";
import AppViewColumn from "@/components/app-view-colums/app-view-column";

import { getSongsByTitleWithoutLogin } from "@/actions/userNotLoggedIn/getSongsByTitleWithoutLogin";
import { getSongsByTitleWithLogin } from "@/actions/userLoggedIn/getSongsByTitleWithLogin";

import { getUser } from "@/actions/getUser";
import MediaRowItemWithLikeSkeleton from "@/components/app-view-colums/media-row-item-with-like-skeleton";
import SearchContent from "@/components/search-content";

interface SearchPageProps {
  searchParams: {
    title: string;
  };
}

function SearchPage({ searchParams }: SearchPageProps) {
  const { title } = searchParams;

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-white text-3xl font-semibold">Search</h1>
      <SongSearchBar />
      <SearchContent title={title} />
    </div>
  );
}

export default SearchPage;
