"use client";

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Button, Spinner } from "@nextui-org/react";

import { useUserStore } from "@/providers/user-store-provider";
import { createClient } from "@/lib/supabase/client";

interface LikeButtonProps {
  songId: string;
}

enum FetchingStatus {
  idle = "idle",
  loading = "loading",
  completed = "completed",
}

function LikeButton({ songId }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(FetchingStatus.idle);

  const user = useUserStore((state) => state.userData);

  const supabase = createClient();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    if (!user) {
      return toast.error("You must be logged in to like a song");
    }

    if (isLiked) {
      const { error } = await supabase
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        console.log(error);
        toast.error("An error occurred");
      } else {
        setIsLiked(false);
        toast.success("You unliked a song");
      }
    } else {
      const { error } = await supabase.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        console.log(error);
        toast.error("An error occurred");
      } else {
        setIsLiked(true);
        toast.success("You liked a song");
      }
    }

    router.refresh();
  };

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchLikedStatus = async () => {
      if (!songId) {
        return;
      }

      setIsLoading(FetchingStatus.loading);

      const { data, error } = await supabase
        .from("liked_songs")
        .select("*")
        .eq("song_id", songId)
        .eq("user_id", user.id)
        .single();

      if (error || !data) {
        return setIsLoading(FetchingStatus.completed);
      }

      setIsLiked(true);
      return setIsLoading(FetchingStatus.completed);
    };

    fetchLikedStatus();
  }, [songId, supabase, user?.id]);

  let content;

  if (isLoading !== FetchingStatus.completed) {
    content = (
      <div>
        <Spinner />
      </div>
    );
  } else {
    content = (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          type="submit"
          className="hover:opacity-75 transition p-0 min-w-fit bg-transparent"
          isLoading={isSubmitting}
        >
          <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
        </Button>
      </form>
    );
  }

  return content;
}

export default LikeButton;
