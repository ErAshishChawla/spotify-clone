"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { Input, Button } from "@nextui-org/react";

import { signup } from "@/actions/signup";

import { signupFormSchema } from "@/schemas/signupFormSchema";
import { signupFormType } from "@/types/auth-form-types";

function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<signupFormType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: signupFormType) => {
    const formResponse = await signup(data);
    console.log(formResponse);
    if (formResponse.status === "error") {
      // handle error
      setError("email", { message: formResponse.errors.email?.join(", ") });
      setError("password", {
        message: formResponse.errors.password?.join(", "),
      });
      setError("root", { message: formResponse.errors._form?.join(", ") });
      return;
    }

    if (formResponse.status === "success") {
      // handle success
      toast.success(formResponse.successMessage);
      reset();
      setTimeout(() => {
        router.replace("/auth/login");
      }, 1000);
    }
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
        {...register("email")}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <Input
        type="password"
        placeholder="Password"
        label="Password"
        labelPlacement="outside"
        radius="sm"
        {...register("password")}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
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
        type="submit"
        isLoading={isSubmitting}
      >
        Register
      </Button>
    </form>
  );
}

export default SignupForm;
