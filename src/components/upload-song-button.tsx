"use client";
import React from "react";

import { IoAdd } from "react-icons/io5";

import { useUploadSongModalStore } from "@/stores/useUploadSongModalStore";

import { useUserStore } from "@/providers/user-store-provider";

function UploadSongButton() {
  const uploadSongModalStore = useUploadSongModalStore();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return (
    <button
      className=" text-white/70 hover:text-white rounded-full p-0.5 hover:bg-white/10 transition disabled:cursor-not-allowed disabled:text-neutral-500 disabled:hover:text-neutral-500 disabled:hover:bg-transparent"
      onClick={uploadSongModalStore.onOpen}
      disabled={!isLoggedIn}
    >
      <IoAdd size={26} />
    </button>
  );
}

export default UploadSongButton;
