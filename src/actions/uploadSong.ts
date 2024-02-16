"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { nanoid } from "nanoid";

import { songUploadResponseType } from "@/types/auth-form-types";
import { uploadSongFormSchema } from "@/schemas/uploadSongFormSchema";
import { revalidatePath } from "next/cache";

import { Database } from "@/types/supabase";

async function uploadSong(
  formState: songUploadResponseType,
  formData: FormData
): Promise<songUploadResponseType> {
  const validatedValues = uploadSongFormSchema.safeParse({
    songTitle: formData.get("songTitle"),
    songAuthor: formData.get("songAuthor"),
    songFile: formData.get("songFile"),
    songImage: formData.get("songImage"),
  });

  if (!validatedValues.success) {
    return {
      status: "error",
      successMessage: "",
      errors: validatedValues.error.flatten().fieldErrors,
    };
  }

  const { songTitle, songAuthor, songFile, songImage } = validatedValues.data;

  const supabase = createClient(cookies());
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return {
      status: "error",
      successMessage: "",
      errors: { _form: ["You are not logged in."] },
    };
  }

  // We handle File Upload and send success message
  const randomId = nanoid();
  const { data: songData, error: songError } = await supabase.storage
    .from("songs")
    .upload(`song-${randomId}-${userData.user.id}`, songFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (songError) {
    return {
      status: "error",
      successMessage: "",
      errors: { _form: ["Error uploading song file"] },
    };
  }

  const { data: imageData, error: imageError } = await supabase.storage
    .from("images")
    .upload(`image-${randomId}-${userData.user.id}`, songImage, {
      cacheControl: "3600",
      upsert: false,
    });

  if (imageError) {
    return {
      status: "error",
      successMessage: "",
      errors: { _form: ["Error uploading song image"] },
    };
  }

  const { error: dbError } = await supabase.from("songs").insert({
    author: songAuthor,
    image_path: imageData.path,
    song_path: songData.path,
    title: songTitle,
    user_id: userData.user.id,
  } as never);

  if (dbError) {
    return {
      status: "error",
      successMessage: "",
      errors: { _form: ["Error uploading song to database"] },
    };
  }

  // revalidate paths for song load
  revalidatePath("/");

  return {
    status: "success",
    successMessage: "Song uploaded successfully",
    errors: {},
  };
}

export { uploadSong };
