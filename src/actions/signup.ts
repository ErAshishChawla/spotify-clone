"use server";

import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

import { signupFormSchema } from "@/schemas/signupFormSchema";
import { signupFormResponseType, signupFormType } from "@/types/form-types";

export async function signup(
  formData: signupFormType
): Promise<signupFormResponseType> {
  console.log("signup action");
  const validatedData = signupFormSchema.safeParse({
    email: formData.email,
    password: formData.password,
  });

  if (!validatedData.success) {
    return {
      status: "error",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const cookieStore = cookies();
  const client = createClient(cookieStore);

  const { email, password } = validatedData.data;

  const { error: signupError, data } = await client.auth.signUp({
    email: email,
    password: password,
  });

  if (signupError) {
    console.error(signupError);
    return {
      status: "error",
      errors: {
        _form: [signupError.message],
      },
    };
  }

  return {
    status: "success",
    successMessage:
      "Signup successful. A confirmation email has been sent to your email address. Please confirm your email address to login.",
    errors: {},
  };
}
