"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { Button, Input } from "@nextui-org/react";

import { createClient } from "@/lib/supabase/client";
import { revalidateApp } from "@/actions/revalidateApp";

import { paths } from "@/paths";

import { loginFormSchema } from "@/schemas/loginFormSchema";
import { loginFormType } from "@/types/form-types";

function LoginForm() {
  const supabase = createClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (values: loginFormType) => {
    const validatedValues = loginFormSchema.safeParse(values);

    if (!validatedValues.success) {
      return toast.error("Validation failed");
    }

    const { data: userData, error: userError } =
      await supabase.auth.signInWithPassword({
        email: validatedValues.data.email,
        password: validatedValues.data.password,
      });

    if (userError || !userData.user) {
      setError("root", {
        message: userError?.message,
      });
    }

    await revalidateApp();

    router.replace(paths.home());
    router.refresh();
  };

  return (
    <form
      className="w-full flex flex-col items-center gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="email"
        placeholder="name@domain.com"
        label="Email address"
        labelPlacement="outside"
        radius="sm"
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        isRequired
        {...register("email")}
      />
      <Input
        type="password"
        placeholder="Password"
        label="Password"
        labelPlacement="outside"
        radius="sm"
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        isRequired
        {...register("password")}
      />

      {errors.root ? (
        <p className="text-sm bg-red-600 text-white p-2 border border-red-400 rounded-md w-full">
          {errors.root.message}
        </p>
      ) : null}

      <Button
        radius="full"
        fullWidth
        className="bg-emerald-600 font-bold text-black"
        isLoading={isSubmitting}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
