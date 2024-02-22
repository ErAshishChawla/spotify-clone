import { createClient } from "@/lib/supabase/client";

import { Song } from "@/types/types";

export async function getSongsByTitle(title?: string) {
  const supabase = createClient();

  let resolver: any;

  if (!title) {
    resolver = supabase.from("songs").select("*");
  } else {
    resolver = supabase.from("songs").select("*").ilike("title", `%${title}%`);
  }

  const { data, error } = await resolver;

  if (error || data.length === 0) {
    console.error(error);
    return null;
  }

  return data as Song[];
}
