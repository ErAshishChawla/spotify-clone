import React from "react";
import Link from "next/link";

import { Divider } from "@nextui-org/react";

import SocialsForm from "@/components/socials-form";

import { paths } from "@/paths";
import LoginForm from "@/components/login-form";

function LoginPage() {
  return (
    <div className="flex justify-center">
      <div className="flex-1 sm:w-[480px] sm:flex-none flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Login to Spotify</h1>
        <LoginForm />
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
          Don&apos;t have an account?{" "}
          <Link href={paths.signup()} className="text-white underline">
            Sign up for Spotify
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
