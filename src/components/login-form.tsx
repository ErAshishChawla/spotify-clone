"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button, Input } from "@nextui-org/react";

import FormSubmitButton from "@/components/form-submit-button";

import { login } from "@/actions/login";

import { paths } from "@/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import { createClient } from "@/lib/supabase/client";
import { loginFormType } from "@/types/form-types";
import { toast } from "react-toastify";

function LoginForm() {
  const supabase = createClient();
  const [formState, loginAction] = useFormState(login, {
    status: "idle",
    errors: {},
  });
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   setError,
  // } = useForm<loginFormType>({
  //   resolver: zodResolver(loginFormSchema),
  // });

  // const onSubmit = async (values: loginFormType) => {
  //   const validatedValues = loginFormSchema.safeParse(values);

  //   if (!validatedValues.success) {
  //     return toast.error("Validation failed");
  //   }

  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: validatedValues.data.email,
  //     password: validatedValues.data.password,
  //   });

  //   if (error) {
  //     setError("root", {
  //       message: error.message,
  //     });
  //   }

  //   router.replace(paths.home());
  //   router.refresh();
  // };

  const router = useRouter();

  useEffect(() => {
    if (formState.status === "success") {
      toast.success(formState.successMessage);
      router.replace(paths.home());
    }
  }, [formState.status]);

  return (
    <form
      className="w-full flex flex-col items-center gap-6"
      action={loginAction}
      // onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name="email"
        type="email"
        placeholder="name@domain.com"
        label="Email address"
        labelPlacement="outside"
        radius="sm"
        isInvalid={!!formState.errors.email}
        errorMessage={formState.errors.email?.join(", ")}
        // isInvalid={!!errors.email}
        // errorMessage={errors.email?.message}
        isRequired
        // {...register("email")}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        label="Password"
        labelPlacement="outside"
        radius="sm"
        isInvalid={!!formState.errors.password}
        errorMessage={formState.errors.password?.join(", ")}
        // isInvalid={!!errors.password}
        // errorMessage={errors.password?.message}
        isRequired
        // {...register("password")}
      />
      {formState.errors._form ? (
        <p className="text-sm bg-red-600 text-white p-2 border border-red-400 rounded-md w-full">
          {formState.errors._form.join(", ")}
        </p>
      ) : null}
      {/* {errors.root ? (
        <p className="text-sm bg-red-600 text-white p-2 border border-red-400 rounded-md w-full">
          {errors.root.message}
        </p>
      ) : null} */}

      <FormSubmitButton
        radius="full"
        fullWidth
        className="bg-emerald-600 font-bold text-black"
      >
        Login
      </FormSubmitButton>
      {/* <Button
        radius="full"
        fullWidth
        className="bg-emerald-600 font-bold text-black"
        isLoading={isSubmitting}
        type="submit"
      >
        Login
      </Button> */}
    </form>
  );
}

export default LoginForm;
