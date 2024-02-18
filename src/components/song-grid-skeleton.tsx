"use client";

import React from "react";

import { Skeleton } from "@nextui-org/react";

function SongGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {Array(8)
        .fill(0)
        .map((_, idx) => {
          return (
            <Skeleton
              className="relative flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 p-3 w-48 h-48"
              key={idx}
            >
              <Skeleton className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <div className="w-25 h-25"></div>
              </Skeleton>

              <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <Skeleton className="w-20" />
                <Skeleton className="w-10" />
              </div>
            </Skeleton>
          );
        })}
    </div>
  );
}

export default SongGridSkeleton;
