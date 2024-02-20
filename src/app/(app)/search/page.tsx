import React from "react";

import SongSearchBar from "@/components/song-search-bar";
import MediaRowItemWithLike from "@/components/app-view-colums/app-view-column";

import { getSongsByTitleWithoutLogin } from "@/actions/userNotLoggedIn/getSongsByTitleWithoutLogin";
import { getSongsByTitleWithLogin } from "@/actions/userLoggedIn/getSongsByTitleWithLogin";

import { getUser } from "@/actions/getUser";

interface SearchPageProps {
  searchParams: {
    title: string;
  };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const { title } = searchParams;

  const user = await getUser();

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-white text-3xl font-semibold">Search</h1>
      <SongSearchBar />
      <MediaRowItemWithLike
        fetch={() =>
          user
            ? getSongsByTitleWithLogin(title)
            : getSongsByTitleWithoutLogin(title)
        }
      />
    </div>
  );
}

export default SearchPage;
