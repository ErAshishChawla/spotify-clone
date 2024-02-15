"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import { NavbarItem, Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

import FormSubmitButton from "@/components/form-submit-button";

import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";

import { paths } from "@/paths";

function AuthenticatedHeaderOptions({ src }: { src: string }) {
  const [formState, logoutAction] = useFormState(logout, {
    status: "idle",
    errors: {},
  });
  const router = useRouter();

  useEffect(() => {
    if (formState.status === "error") {
      toast.error(formState.errors._form?.join(", "));
    }

    if (formState.status === "success") {
      router.replace(paths.login());
      toast.success(formState.successMessage);
    }
  }, [formState.status]);

  return (
    <>
      <NavbarItem>
        <form action={logoutAction}>
          <FormSubmitButton
            radius="full"
            className="bg-transparent text-white hover:scale-110"
          >
            Logout
          </FormSubmitButton>
        </form>
      </NavbarItem>
      <NavbarItem>
        <Avatar color="success" isBordered src={src} alt="Avatar" size="sm" />
      </NavbarItem>
    </>
  );
}

export default AuthenticatedHeaderOptions;
