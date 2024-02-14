import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function useTwMerge(...args: Parameters<typeof clsx>): string {
  const classNames = clsx(...args);
  const mergedClassNames = twMerge(classNames);
  return mergedClassNames;
}

export function getUrlWithoutDomain(url: string): string {
  const urlObj = new URL(url);
  return urlObj.pathname + urlObj.search + urlObj.hash;
}
