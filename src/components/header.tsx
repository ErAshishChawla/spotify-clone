import React from "react";

import { Navbar, NavbarContent, Spinner } from "@nextui-org/react";

import AppNavigation from "@/components/app-navigation";
import AuthHeaderOptions from "@/components/auth-header-options";

function Header() {
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
        <AuthHeaderOptions />
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
