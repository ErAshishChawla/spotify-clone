"use client";

import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import FormSubmitButton from "@/components/form-submit-button";

import { toggleSongLike } from "@/actions/userLoggedIn/toggleSongLike";
import { useUserStore } from "@/providers/user-store-provider";
import { getSongWithUserLike } from "@/actions/getSongWithUserLike";

import { Song } from "@/types/types";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  song: Song;
}

function LikeButton({ song }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(song.is_liked || false);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const [isTouched, setIsTouched] = useState(false);

  const router = useRouter();

  const [formState, toggleSongLikeAction] = useFormState(
    toggleSongLike.bind(null, song.id, isLiked),
    {
      status: "idle",
    }
  );

  const refetchLike = async () => {
    if (!isLoggedIn) {
      console.log("User is not logged in");
      return;
    }

    console.log("refetching like");

    const songData = await getSongWithUserLike(song.id);

    if (songData.status === "error" || !songData.data) {
      setIsLiked((s) => !s);
      return toast.error(songData.errorMessage);
    }

    setIsLiked(songData.data.is_liked || false);
    return;
  };

  const res = useSWR(isTouched && `song-like/${song.id}`, refetchLike);

  useEffect(() => {
    if (formState.status === "error") {
      toast.error(formState.errorMessage);
      formState.status = "idle";
    }

    if (formState.status === "success") {
      toast.success(formState.successMessage);
      setIsTouched(true);
      mutate(`song-like/${song.id}`);
      router.refresh();
      formState.status = "idle";
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
