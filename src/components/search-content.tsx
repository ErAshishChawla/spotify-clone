"use client";
import React, { use } from "react";

import AppViewColumn from "./app-view-colums/app-view-column";

import { Song } from "@/types/types";

interface SearchContentProps {
  songs: Song[];
}

function SearchContent({ songs }: SearchContentProps) {
  return (
    <>
      <AppViewColumn songs={songs} />
    </>
  );
}

export default SearchContent;
