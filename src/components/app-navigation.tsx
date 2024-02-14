"use client";

import React from "react";
import { useRouter } from "next/navigation";

// import { useAppRouterStore } from "@/stores/useAppRouterStore";

// import { getUrlWithoutDomain } from "@/utils";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function AppNavigation() {
  const router = useRouter();
  //   const appRouterStore = useAppRouterStore();

  //   useEffect(() => {
  //     if (!window) {
  //       return;
  //     }

  //     // Adding The initial route to the store
  //     appRouterStore.pushRoute(getUrlWithoutDomain(window.location.href));
  //   }, [appRouterStore]);

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
        // disabled={!appRouterStore.isBackwardAllowed}
      >
        <IoChevronBack size={24} />
      </button>
      <button
        className="hover:bg-black p-2 rounded-full flex justify-center items-center transition disabled:cursor-not-allowed"
        onClick={moveForward}
        // disabled={!appRouterStore.isForwardAllowed}
      >
        <IoChevronForward size={24} />
      </button>
    </>
  );
}

export default AppNavigation;
