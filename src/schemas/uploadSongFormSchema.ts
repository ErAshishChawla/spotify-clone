import { z } from "zod";

export const uploadSongFormSchema = z.object({
  songTitle: z.string().min(1, { message: "Song title is required" }),
  songAuthor: z.string().min(1, { message: "Song author is required" }),
  songFile: z.instanceof(File),
  songImage: z.instanceof(File),
});
