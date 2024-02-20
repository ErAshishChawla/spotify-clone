import React from "react";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

import { getSongsByTitleWithoutLogin } from "@/actions/userNotLoggedIn/getSongsByTitleWithoutLogin";
import { getSongsByTitleWithLogin } from "@/actions/userLoggedIn/getSongsByTitleWithLogin";

import SongsGrid from "@/components/app-view-grid/app-view-grid";
import SongSearchBar from "@/components/song-search-bar";
import SearchContent from "@/components/media-row-item-with-like";

interface SearchPageProps {
  searchParams: {
    title: string;
  };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const { title } = searchParams;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  let isLoggedIn: boolean = false;

  if (userError || !userData.user) {
    isLoggedIn = false;
  }

  if (userData.user) {
    isLoggedIn = true;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-white text-3xl font-semibold">Search</h1>
      <SongSearchBar />
      <SearchContent
        fetch={() =>
          isLoggedIn
            ? getSongsByTitleWithLogin(title)
            : getSongsByTitleWithoutLogin(title)
        }
      />
    </div>
  );
}

export default SearchPage;
