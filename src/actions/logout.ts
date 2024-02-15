"use server";

import { createClient } from "@/lib/supabase/server";

import { logoutFormResponseType } from "@/types/auth-form-types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { paths } from "@/paths";

export async function logout(
  formState: logoutFormResponseType,
  formData: FormData
): Promise<logoutFormResponseType> {
  const cookieStore = cookies();
  const client = createClient(cookieStore);

  const { error } = await client.auth.signOut();

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

  return {
    status: "success",
    successMessage: "Logout successful",
    errors: {},
  };
}
