import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function useTwMerge(...args: Parameters<typeof clsx>): string {
  const classNames = clsx(...args);
  const mergedClassNames = twMerge(classNames);
  return mergedClassNames;
}

export default useTwMerge;
