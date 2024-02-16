import React from "react";

import { getUserSongs } from "@/actions/getUserSongs";
import UserSongListItem from "./user-song-list-item";

async function UserSongList() {
  const userSongs = await getUserSongs();

  if (!userSongs) {
    return <div className="mt-4 text-neutral-400">Your library is empty!</div>;
  }

  return (
    <>
      {userSongs.map((song) => {
        return <UserSongListItem key={song.id} song={song} />;
      })}
    </>
  );
}

export default UserSongList;
