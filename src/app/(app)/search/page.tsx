import React from "react";

import SongSearchBar from "@/components/song-search-bar";
import AppViewColumn from "@/components/app-view-colums/app-view-column";

import { getSongsByTitleWithoutLogin } from "@/actions/userNotLoggedIn/getSongsByTitleWithoutLogin";
import { getSongsByTitleWithLogin } from "@/actions/userLoggedIn/getSongsByTitleWithLogin";

import { getUser } from "@/actions/getUser";
import MediaRowItemWithLikeSkeleton from "@/components/app-view-colums/media-row-item-with-like-skeleton";
import SearchContent from "@/components/search-content";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

interface SearchPageProps {
  searchParams: {
    title: string;
  };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  const { title } = searchParams;

  let resolver: any;

  resolver = supabase.rpc("get_all_songs_with_user_liked_status", {
    input_user_id: userData.user?.id || null,
  });

  if (title) {
    resolver = resolver.ilike("title", `%${title}%`);
  }

  const { data: songsData, error: songsError } = await resolver;

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <h1 className="text-white text-3xl font-semibold">Search</h1>
      <SongSearchBar />
      <SearchContent songs={songsData || []} />
    </div>
  );
}

export default SearchPage;
