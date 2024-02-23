"use client";

import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import FormSubmitButton from "@/components/form-submit-button";

import { toggleSongLike } from "@/actions/userLoggedIn/toggleSongLike";
import { useUserStore } from "@/providers/user-store-provider";

import { createClient } from "@/lib/supabase/client";

import { Song } from "@/types/types";

interface LikeButtonProps {
  song: Song;
}

function LikeButton({ song }: LikeButtonProps) {
  const { userData, isLoggedIn } = useUserStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    userData: state.userData,
  }));

  const [isLiked, setIsLiked] = useState(song.is_liked || false);

  const [formState, toggleSongLikeAction] = useFormState(
    toggleSongLike.bind(null, song.id, isLiked),
    {
      status: "idle",
    }
  );

  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`realtime:like-button-${song.id}-${nanoid()}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "liked_songs",
          filter: `user_id=eq.${userData?.id}`,
        },
        (payload) => {
          if (
            userData &&
            payload.new.user_id === userData.id &&
            payload.new.song_id === song.id
          ) {
            console.log("triggered");
            setIsLiked(true);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "liked_songs",
          filter: `user_id=eq.${userData?.id}`,
        },
        (payload) => {
          if (
            userData &&
            payload.old.user_id === userData.id &&
            payload.old.song_id === song.id
          ) {
            setIsLiked(false);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, userData, song]);

  useEffect(() => {
    if (formState.status === "error") {
      toast.error(formState.errorMessage);
      formState.status = "idle";
    }

    if (formState.status === "success") {
      toast.success(formState.successMessage);
      formState.status = "idle";
    }
  }, [formState]);

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
