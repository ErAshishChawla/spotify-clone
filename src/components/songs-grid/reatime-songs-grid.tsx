"use client";

import React, { useState, useEffect } from "react";

import AppViewGrid from "../app-view-grid/app-view-grid";

import { createClient } from "@/lib/supabase/client";

import { Song } from "@/types/types";

interface RealtimeSongsGridProps {
  songs: Song[];
}

function RealtimeSongsGrid({ songs }: RealtimeSongsGridProps) {
  const [songsState, setSongsState] = useState(songs);

  const supabase = createClient();

  let content: React.ReactNode = null;

  useEffect(() => {
    const channel = supabase
      .channel("realtime:songs-grid")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "songs",
        },
        (payload) => {
          setSongsState((prevSongs) => {
            return [payload.new as Song, ...prevSongs];
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  if (!songsState || songsState.length === 0) {
    content = <div>No songs found!</div>;
  } else {
    content = <AppViewGrid songs={songsState} />;
  }

  return content;
}

export default RealtimeSongsGrid;
