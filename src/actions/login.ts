"use server";

import { cookies } from "next/headers";

import { loginFormResponseType } from "@/types/auth-form-types";
import { loginFormSchema } from "@/schemas/loginFormSchema";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { paths } from "@/paths";

export async function login(
  formState: loginFormResponseType,
  formData: FormData
): Promise<loginFormResponseType> {
  const validatedValues = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedValues.success) {
    return {
      status: "error",
      errors: validatedValues.error.flatten().fieldErrors,
    };
  }

  const cookieStore = cookies();
  const client = createClient(cookieStore);

  const { data, error } = await client.auth.signInWithPassword({
    email: validatedValues.data.email,
    password: validatedValues.data.password,
  });

  if (error) {
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
    successMessage: "Login successful",
    errors: {},
  };
}
