"use server";

import { cookies } from "next/headers";

import { loginFormResponseType } from "@/types/form-types";
import { loginFormSchema } from "@/schemas/loginFormSchema";

import { createClient } from "@/lib/supabase/server";

import { revalidateApp } from "@/actions/revalidateApp";
import { useUserStore } from "@/providers/user-store-provider";

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

  await revalidateApp();

  return {
    status: "success",
    successMessage: "Login successful",
    errors: {},
  };
}
