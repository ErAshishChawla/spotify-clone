import React from "react";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

import RealtimeUserSongList from "@/components/sidebar/realtime-user-song-list";
import { Song } from "@/types/types";

async function UserSongList() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let content: React.ReactNode = null;

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    content = (
      <div className="mt-4 text-neutral-400">You are not logged in</div>
    );
  }

  const { data: userSongsData, error: userSongsError } = await supabase
    .from("songs")
    .select()
    .eq("user_id", userData.user?.id);

  if (userSongsError) {
    content = (
      <div className="mt-4 text-neutral-400">Error fetching user songs</div>
    );
  }

  if (userSongsData && userSongsData.length === 0) {
    content = (
      <div className="mt-4 text-neutral-400">Your library is empty!</div>
    );
  }

  if (userSongsData && userSongsData.length > 0) {
    content = <RealtimeUserSongList songs={userSongsData as Song[]} />;
  }

  return content;
}

export default UserSongList;
