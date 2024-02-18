import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export function getSupabaseClient() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return supabase;
}
