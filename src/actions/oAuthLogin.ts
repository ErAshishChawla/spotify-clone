"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { paths } from "@/paths";

import { createClient } from "@/lib/supabase/server";
import { oAuthResponseType } from "@/types/auth-form-types";

export async function oAuthLogin(
  formState: oAuthResponseType,
  formData: FormData
): Promise<oAuthResponseType> {
  const supabase = createClient(cookies());

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: paths.oAuthCallback(),
    },
  });

  if (error) {
    console.log(error);
    console.log("Something went wrong");
    return {
      status: "error",
      errors: {
        _form: ["Something went wrong"],
      },
    };
  }

  redirect(data.url);
}
