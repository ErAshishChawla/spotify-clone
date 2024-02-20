"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function AppNavigation() {
  const router = useRouter();

  const moveForward = () => {
    router.forward();
  };

  const moveBackward = () => {
    router.back();
  };
  return (
    <>
      <button
        className="hover:bg-black p-2 rounded-full flex justify-center items-center transition disabled:cursor-not-allowed"
        onClick={moveBackward}
      >
        <IoChevronBack size={24} />
      </button>
      <button
        className="hover:bg-black p-2 rounded-full flex justify-center items-center transition disabled:cursor-not-allowed"
        onClick={moveForward}
      >
        <IoChevronForward size={24} />
      </button>
    </>
  );
}

export default AppNavigation;
