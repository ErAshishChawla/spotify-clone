"use server";

import { getSupabaseClient } from "@/actions/getSupabaseClient";

async function getUser() {
  const supabase = getSupabaseClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return null;
  }

  return userData.user;
}

export { getUser };
