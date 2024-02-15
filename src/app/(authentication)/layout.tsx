import React from "react";

import Link from "next/link";

import { Navbar, NavbarBrand } from "@nextui-org/react";
import { FaSpotify } from "react-icons/fa6";

import { paths } from "@/paths";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-screen h-screen bg-black flex flex-col gap-8">
      <Navbar maxWidth="full" className="bg-transparent">
        <NavbarBrand>
          <Link
            href={paths.home()}
            className="flex items-center gap-2 text-white "
          >
            <FaSpotify size={26} />
            <p className="font-semibold">Spotify</p>
          </Link>
        </NavbarBrand>
      </Navbar>
      <div className="w-full h-auto px-8">{children}</div>
    </div>
  );
}

export default AuthLayout;
