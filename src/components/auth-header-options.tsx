"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { NavbarItem, Button, Avatar, Spinner } from "@nextui-org/react";

import { paths } from "@/paths";

import { useUserStore } from "@/providers/user-store-provider";
import { createClient } from "@/lib/supabase/client";
import { revalidateApp } from "@/actions/revalidateApp";

function AuthHeaderOptions() {
  const supabase = createClient();
  const router = useRouter();

  const { isFetchingUser, isReset, userData } = useUserStore((state) => {
    return {
      isFetchingUser: state.isFetchingUser,
      isReset: state.isReset,
      userData: state.userData,
    };
  });
  const avatarUrl = userData?.user_metadata.avatar_url || "";

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm();
  const onSubmit = async () => {
    await revalidateApp();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      router.refresh();
    }
  };

  let content: React.ReactNode = null;

  if (isReset) {
    content = <Spinner />;
  } else {
    if (isFetchingUser) {
      content = <Spinner />;
    } else {
      content = (
        <NavbarItem>
          <form
            className="flex flex-row items-center gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {!userData && (
              <Button
                type="button"
                radius="full"
                className="bg-transparent text-white hover:scale-110"
              >
                <Link href={paths.signup()}>Signup</Link>
              </Button>
            )}
            {!userData && (
              <Button radius="full" className="hover:scale-110" type="button">
                <Link href={paths.login()}>Login</Link>
              </Button>
            )}

            {userData && (
              <Button
                radius="full"
                className="bg-transparent text-white hover:scale-110"
                isLoading={isSubmitting}
                type="submit"
              >
                Logout
              </Button>
            )}

            {userData && (
              <Avatar
                color="success"
                isBordered
                src={avatarUrl}
                alt="Avatar"
                size="sm"
              />
            )}
          </form>
        </NavbarItem>
      );
    }
  }

  return content;
}

export default AuthHeaderOptions;
