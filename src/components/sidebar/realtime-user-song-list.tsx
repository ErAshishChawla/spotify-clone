"use client";

import React, { useEffect, useState } from "react";

import MediaRowItem from "@/components/app-view-colums/media-row-item";

import { useUserStore } from "@/providers/user-store-provider";
import { useConfigurePlayer } from "@/hooks/useConfigurePlayer";

import { Song } from "@/types/types";
import { createClient } from "@/lib/supabase/client";

interface RealtimeUserSongListProps {
  songs: Song[];
}

function RealtimeUserSongList({ songs }: RealtimeUserSongListProps) {
  const [songsState, setSongsState] = useState(songs);
  const onSongPlay = useConfigurePlayer(songs);

  const supabase = createClient();
  const user = useUserStore((state) => state.userData);

  useEffect(() => {
    const channel = supabase
      .channel("realtime:user-songs")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "songs",
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          setSongsState((prevSongs) => {
            return [...prevSongs, payload.new as Song];
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, user]);
  return (
    <>
      {songsState.map((song) => {
        return (
          <MediaRowItem
            key={song.id}
            song={song}
            onClick={() => {
              onSongPlay(song.id);
            }}
          />
        );
      })}
    </>
  );
}

export default RealtimeUserSongList;
