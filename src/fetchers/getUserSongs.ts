import { createClient } from "@/lib/supabase/client";

export async function getUserSongs(userId?: string) {
  if (!userId) {
    return null;
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", userId);

  if (error || data.length === 0) {
    console.error(error);
    return null;
  }

  return data;
}
