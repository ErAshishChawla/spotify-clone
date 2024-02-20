"use client";

import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import FormSubmitButton from "@/components/form-submit-button";

import { toggleSongLike } from "@/actions/userLoggedIn/toggleSongLike";
import { useUserStore } from "@/providers/user-store-provider";

import { Song } from "@/types/types";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  song: Song;
}

function LikeButton({ song }: LikeButtonProps) {
  const isLiked = song.isliked || false;
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const router = useRouter();

  const [formState, toggleSongLikeAction] = useFormState(
    toggleSongLike.bind(null, song.id, isLiked),
    {
      status: "idle",
    }
  );

  useEffect(() => {
    if (formState.status === "error") {
      toast.error(formState.errorMessage);
    }

    if (formState.status === "success") {
      toast.success(formState.successMessage);
    }
  }, [formState, isLiked, router]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <form action={toggleSongLikeAction}>
      <FormSubmitButton
        className="hover:opacity-75 transition p-0 min-w-fit bg-transparent disabled:cursor-not-allowed"
        isDisabled={!isLoggedIn}
      >
        <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
      </FormSubmitButton>
    </form>
  );
}

export default LikeButton;
