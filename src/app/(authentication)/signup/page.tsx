import React from "react";
import Link from "next/link";

import { Divider } from "@nextui-org/react";

import SignupForm from "@/components/signup-form";
import SocialsForm from "@/components/socials-form";

import { paths } from "@/paths";

function SignupPage() {
  return (
    <div className="flex justify-center">
      <div className="flex-1 sm:w-[480px] sm:flex-none flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Sign up to start listening</h1>
        <SignupForm />
        <div className="flex flex-row items-center gap-4">
          <Divider className="flex-1 bg-neutral-500/70" />
          <p className="text-sm text-gray-400">or</p>
          <Divider className="flex-1 bg-neutral-500/70" />
        </div>
        <SocialsForm />
        <div className="flex flex-row items-center gap-4">
          <Divider className="flex-1 bg-neutral-500/70" />
        </div>
        <p className="text-neutral-400 text-sm text-center">
          Already have an account?{" "}
          <Link href={paths.login()} className="text-white underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
