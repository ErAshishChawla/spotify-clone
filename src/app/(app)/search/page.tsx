import React from "react";

import { getSongsByTitle } from "@/actions/getSongsByTitle";

import SongsGrid from "@/components/songs-grid";
import SongSearchBar from "@/components/song-search-bar";
import SearchContent from "@/components/search-content";

interface SearchPageProps {
  searchParams: {
    title: string;
  };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const { title } = searchParams;

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-white text-3xl font-semibold">Search</h1>
      <SongSearchBar />
      <SearchContent fetch={() => getSongsByTitle(title)} />
    </div>
  );
}

export default SearchPage;
