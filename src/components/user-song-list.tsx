import React, { Suspense } from "react";

import UserSongListItem from "@/components/user-song-list-item";

import { getUserSongs } from "@/actions/userLoggedIn/getUserSongs";
import { getUser } from "@/actions/getUser";

async function UserSongList() {
  const user = await getUser();

  let content: React.ReactNode = null;

  if (!user) {
    content = (
      <div className="mt-4 text-neutral-400">You are not logged in</div>
    );
  } else {
    const userSongs = await getUserSongs();

    if (!userSongs) {
      content = (
        <div className="mt-4 text-neutral-400">Your library is empty!</div>
      );
    } else {
      content = userSongs.map((song) => {
        return <UserSongListItem key={song.id} song={song} />;
      });
    }
  }

  return content;
}

export default UserSongList;
