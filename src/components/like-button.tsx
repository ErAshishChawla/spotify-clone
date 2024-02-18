"use client";

import { useFormState } from "react-dom";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { toggleSongLike } from "@/actions/userLoggedIn/toggleSongLike";

import { Song } from "@/types/types";
import { songLikeResponseType } from "@/types/form-types";
import FormSubmitButton from "./form-submit-button";

interface LikeButtonProps {
  song: Song;
}

function LikeButton({ song }: LikeButtonProps) {
  const isLiked = song.isliked || false;

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const [formState, toggleSongLikeAction] = useFormState<songLikeResponseType>(
    toggleSongLike.bind(null, song.id).bind(null, isLiked),
    {
      status: "idle",
      successMessage: "",
      errors: {
        _form: [],
      },
    }
  );

  useEffect(() => {
    if (formState.status === "success") {
      toast.success(formState.successMessage);
    } else if (formState.status === "error") {
      if (formState.errors?._form) {
        toast.error(formState.errors?._form[0]);
      } else {
        toast.error("An error occurred while liking the song");
      }
    }
  }, [formState, isLiked]);

  return (
    <form action={toggleSongLikeAction}>
      <FormSubmitButton
        type="submit"
        className="hover:opacity-75 transition p-0 min-w-fit bg-transparent"
      >
        <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
      </FormSubmitButton>
    </form>
  );
}

export default LikeButton;
