"use client";

import React from "react";

import { IoAdd } from "react-icons/io5";

import { useUploadSongModalStore } from "@/stores/useUploadSongModalStore";

function UploadSongButton() {
  const uploadSongModalStore = useUploadSongModalStore();
  return (
    <button
      className=" text-white/70 hover:text-white rounded-full p-0.5 hover:bg-white/10 transition"
      onClick={uploadSongModalStore.onOpen}
    >
      <IoAdd size={26} />
    </button>
  );
}

export default UploadSongButton;
