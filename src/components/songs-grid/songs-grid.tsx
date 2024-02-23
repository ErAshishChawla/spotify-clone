import React from "react";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import RealtimeSongsGrid from "@/components/songs-grid/reatime-songs-grid";

import { Song } from "@/types/types";

async function SongsGrid() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: songsData, error: songsError } = await supabase
    .from("songs")
    .select()
    .order("created_at", { ascending: false });

  let content: React.ReactNode = null;

  if (songsError || !songsData || songsData.length === 0) {
    content = <div className="mt-4 text-neutral-400">No songs found!</div>;
  }

  if (songsData && songsData.length > 0) {
    content = <RealtimeSongsGrid songs={songsData as Song[]} />;
  }

  return content;
}

export default SongsGrid;
