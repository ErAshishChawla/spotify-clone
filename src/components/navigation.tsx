"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaSpotify } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";

import { paths } from "@/paths";

import useTwMerge from "@/hooks/useTwMerge";

function Navigation() {
  const pathname = usePathname();

  const routes = useMemo(() => {
    return [
      {
        label: "Home",
        href: paths.home(),
        icon: <GrHomeRounded size={26} />,
        isActive: pathname === paths.home(),
      },
      {
        label: "Search",
        href: paths.search(),
        icon: <IoSearch size={26} />,
        isActive: pathname === paths.search(),
      },
    ];
  }, [pathname]);

  return (
    <div className="flex flex-col flex-1 gap-6">
      <Link href={paths.home()} className="flex items-center gap-0.5">
        <FaSpotify size={26} />
        <p className="font-semibold">Spotify</p>
      </Link>

      {routes.map((route) => {
        return (
          <Link
            key={route.href}
            href={route.href}
            className={useTwMerge(
              "flex items-center gap-6 text-white hover:text-white transition",
              {
                "text-white/70": !route.isActive,
              }
            )}
          >
            {route.icon}
            <p>{route.label}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default Navigation;
