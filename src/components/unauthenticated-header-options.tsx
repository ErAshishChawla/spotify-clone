import React from "react";
import Link from "next/link";

import { NavbarItem, Button } from "@nextui-org/react";

import { paths } from "@/paths";

function UnauthenicatedHeaderOptions() {
  return (
    <>
      <NavbarItem>
        <Button
          radius="full"
          className="bg-transparent text-white hover:scale-110"
        >
          <Link href={paths.signup()}>Signup</Link>
        </Button>
      </NavbarItem>
      <NavbarItem>
        <Button radius="full" className="hover:scale-110">
          <Link href={paths.login()}>Login</Link>
        </Button>
      </NavbarItem>
    </>
  );
}

export default UnauthenicatedHeaderOptions;
