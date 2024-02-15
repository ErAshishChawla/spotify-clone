import React from "react";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

import AppNavigation from "@/components/app-navigation";
import UnauthenicatedHeaderOptions from "./unauthenticated-header-options";

import { Navbar, NavbarContent } from "@nextui-org/react";

import AuthenticatedHeaderOptions from "./authenticated-header-options";

async function Header() {
  const cookieStore = cookies();
  const client = createClient(cookieStore);

  const { data: userData, error } = await client.auth.getUser();

  return (
    <Navbar
      className="bg-stone-950/30 rounded-md shadow-inner"
      isBordered
      maxWidth="full"
    >
      <NavbarContent justify="start" className="">
        <AppNavigation />
      </NavbarContent>
      <NavbarContent justify="end">
        {!userData ? (
          <UnauthenicatedHeaderOptions />
        ) : (
          <AuthenticatedHeaderOptions
            src={userData.user?.user_metadata?.avatar_url || ""}
          />
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
