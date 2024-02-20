"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { getSongsWithoutLogin } from "@/actions/userNotLoggedIn/getSongsWithoutLogin";

import { Song } from "@/types/types";

export async function getSongsByTitleWithoutLogin(
  title: string
): Promise<Song[] | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!title) {
    return getSongsWithoutLogin();
  }

  const { data: songsData, error: songsError } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (songsError || songsData.length === 0) {
    return null;
  }

  return songsData;
}
