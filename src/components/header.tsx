"use client";

import React from "react";
import AppNavigation from "@/components/app-navigation";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";

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
        <NavbarItem>
          <Button
            radius="full"
            className="bg-transparent text-white hover:scale-110"
          >
            Signup
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button radius="full" className="bg-white hover:scale-110">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
