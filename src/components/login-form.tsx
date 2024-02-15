"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Input } from "@nextui-org/react";

import FormSubmitButton from "@/components/form-submit-button";

import { login } from "@/actions/login";

function LoginForm() {
  const [formState, loginAction] = useFormState(login, {
    status: "idle",
    errors: {},
  });
  const router = useRouter();

  useEffect(() => {
    if (formState.status === "success") {
      router.replace("/");
      toast.success(formState.successMessage);
    }
  }, [formState.status]);

  return (
    <form
      className="w-full flex flex-col items-center gap-6"
      action={loginAction}
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
      />
      {formState.errors._form ? (
        <p className="text-sm bg-red-600 text-white p-2 border border-red-400 rounded-md w-full">
          {formState.errors._form.join(", ")}
        </p>
      ) : null}

      <FormSubmitButton
        radius="full"
        fullWidth
        className="bg-emerald-600 font-bold text-black"
      >
        Login
      </FormSubmitButton>
    </form>
  );
}

export default LoginForm;
