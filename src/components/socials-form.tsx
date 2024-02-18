"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

import { FaGithub } from "react-icons/fa";
import FormSubmitButton from "./form-submit-button";

import { oAuthLogin } from "@/actions/oAuthLogin";
import { Button } from "@nextui-org/react";
import { createClient } from "@/lib/supabase/client";
import { paths } from "@/paths";
import { toast } from "react-toastify";
import { revalidateApp } from "@/actions/revalidateApp";

function SocialsForm() {
  const supabase = createClient();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async () => {
    const { data: userData, error: userError } =
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: paths.oAuthCallback(),
        },
      });

    if (userError || !userData.url) {
      setError("root", {
        message: userError?.message,
      });
    }

    await revalidateApp();
    return router.replace(userData.url!);
  };

  return (
    <form
      className="w-full flex flex-col items-center gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.root ? (
        <p className="text-sm bg-red-600 text-white p-2 border border-red-400 rounded-md w-full">
          {errors.root.message}
        </p>
      ) : null}

      <Button
        isLoading={isSubmitting}
        type="submit"
        variant="bordered"
        radius="full"
        fullWidth
        className="hover:border-gray-300 relative justify-between"
      >
        <FaGithub size={24} />
        <p className="flex-1 truncate">Continue with Github</p>
      </Button>
    </form>
  );
}

export default SocialsForm;
