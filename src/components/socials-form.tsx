"use client";

import React from "react";
import { useFormState } from "react-dom";

import { FaGithub } from "react-icons/fa";
import FormSubmitButton from "./form-submit-button";

import { oAuthLogin } from "@/actions/oAuthLogin";

function SocialsForm() {
  const [formState, oAuthLoginAction] = useFormState(oAuthLogin, {
    status: "idle",
    errors: {},
  });

  return (
    <form
      className="w-full flex flex-col items-center gap-3"
      action={oAuthLoginAction}
    >
      {formState.errors._form ? (
        <p className="text-sm bg-red-600 text-white p-2 border border-red-400 rounded-md w-full">
          {formState.errors._form.join(", ")}
        </p>
      ) : null}
      <FormSubmitButton
        type="submit"
        variant="bordered"
        radius="full"
        fullWidth
        className="hover:border-gray-300 relative justify-between"
      >
        <FaGithub size={24} />
        <p className="flex-1 truncate">Continue with Github</p>
      </FormSubmitButton>
    </form>
  );
}

export default SocialsForm;
