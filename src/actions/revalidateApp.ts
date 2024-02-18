"use server";

import { revalidatePath } from "next/cache";

import { paths } from "@/paths";

export async function revalidateApp() {
  revalidatePath(paths.home());
  revalidatePath(paths.search());
  revalidatePath(paths.liked());
}
