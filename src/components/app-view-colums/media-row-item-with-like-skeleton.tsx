import React from "react";

import { Skeleton } from "@nextui-org/react";

function MediaRowItemWithLikeSkeleton() {
  return (
    <div className="flex items-center gap-x-4 w-full">
      <div className="flex-1">
        <div className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2">
          <Skeleton className="rounded-md">
            <div className="relative rounded-md h-[48px] w-[48px] overflow-hidden bg-neutral-800" />
          </Skeleton>
          <div className="flex flex-col gap-y-3 overflow-hidden">
            <Skeleton className="rounded-md">
              <div className="text-white truncate w-24 h-5" />
            </Skeleton>
            <Skeleton className="rounded-md">
              <div className="text-white truncate w-16 h-3" />
            </Skeleton>
          </div>
        </div>
      </div>
      <Skeleton className="rounded-full">
        <div className="w-5 h-5" />
      </Skeleton>
    </div>
  );
}

export default MediaRowItemWithLikeSkeleton;
