import React from "react";

import AppViewColumn from "@/components/app-view-colums/app-view-column";

import { Song } from "@/types/types";

interface LikedContentProps {
  songs: Song[];
}

function LikedContent({ songs }: LikedContentProps) {
  return <div>LikedContent</div>;
}

export default LikedContent;
