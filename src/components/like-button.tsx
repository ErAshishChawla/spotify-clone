"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { paths } from "@/paths";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { revalidatePath } from "next/cache";

interface LikeButtonProps {
  songId: string;
}

function LikeButton({ songId }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkIsLiked() {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        return;
      }

      const { data: likeData, error: likeError } = await supabase
        .from("liked_songs")
        .select("*")
        .eq("user_id", userData.user.id)
        .eq("song_id", songId);

      if (!likeError && likeData.length > 0) {
        setIsLiked(true);
      }

      return;
    }

    checkIsLiked();
  }, [songId, isLiked]);

  const handleLike = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      toast.error("You must be logged in to like a song");
      router.replace(paths.defaultInvalidUserRedirect());
      return;
    }

    if (isLiked) {
      const { error } = await supabase
        .from("liked_songs")
        .delete()
        .eq("user_id", userData.user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error("Failed to unlike song");
        setIsLiked(true);
        return;
      }

      setIsLiked(false);
    } else {
      const { error } = await supabase.from("liked_songs").insert([
        {
          user_id: userData.user.id,
          song_id: songId,
        },
      ]);

      if (error) {
        toast.error("Failed to like song");
        setIsLiked(false);
        return;
      }
      setIsLiked(true);
    }
    return router.refresh();
  };

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <form>
      <button
        type="submit"
        className="hover:opacity-75 transition"
        onClick={handleLike}
      >
        <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
      </button>
    </form>
  );
}

export default LikeButton;
