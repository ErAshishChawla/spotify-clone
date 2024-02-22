import { createClient } from "@/lib/supabase/client";

import { Song } from "@/types/types";

export async function getSongsByTitleLoggedIn(title?: string) {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (!userData || userError) {
    return null;
  }

  const userId = userData.user.id;

  let resolver: any;

  if (!title) {
    resolver = supabase.rpc("get_all_songs_with_user_liked_status", {
      input_user_id: userId,
    });
  } else {
    resolver = supabase
      .rpc("get_all_songs_with_user_liked_status", {
        input_user_id: userId,
      })
      .ilike("title", `%${title}%`);
  }

  const { data, error } = await resolver;

  if (error || data.length === 0) {
    console.error(error);
    return null;
  }

  return data as Song[];
}
