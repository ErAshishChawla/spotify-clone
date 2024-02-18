"use server";

import { logoutFormResponseType } from "@/types/form-types";

import { getSupabaseClient } from "@/actions/getSupabaseClient";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { paths } from "@/paths";

export async function logout(): Promise<logoutFormResponseType> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    return {
      status: "error",
      errors: {
        _form: [error.message],
      },
    };
  }

  revalidatePath(paths.home());
  revalidatePath(paths.search());
  revalidatePath(paths.liked());

  redirect(paths.home());
}
