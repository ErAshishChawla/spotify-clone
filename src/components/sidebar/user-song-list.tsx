import React from "react";

import MediaRowItem from "@/components/app-view-colums/media-row-item";

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
        return <MediaRowItem key={song.id} song={song} />;
      });
    }
  }

  return content;
}

export default UserSongList;
