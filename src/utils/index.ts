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

export function secondsToTimeString(seconds: number): string {
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * 24 * 60 * 60;
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * 60 * 60;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  if (days > 0) {
    return `${days.toString().padStart(2, "0")}:${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${Math.floor(
      seconds
    )
      .toString()
      .padStart(2, "0")}`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${Math.floor(seconds).toString().padStart(2, "0")}`;
  } else {
    return `${minutes.toString().padStart(2, "0")}:${Math.floor(seconds)
      .toString()
      .padStart(2, "0")}`;
  }
}

// console.log(secondsToTimeString(300));  // Outputs: "05:00"
// console.log(secondsToTimeString(3600));  // Outputs: "01:00:00"
// console.log(secondsToTimeString(86400));  // Outputs: "01:00:00:00"
