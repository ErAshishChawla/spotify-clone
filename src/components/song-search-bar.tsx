"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

import useDebounce from "@/hooks/useDebounce";

function SongSearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("title") || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const onChange = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearchTerm) {
      params.set("title", debouncedSearchTerm);
    } else {
      params.delete("title");
    }

    const url = `${pathname}?${params.toString()}`;
    router.replace(url);
  }, [debouncedSearchTerm, router, pathname, searchParams]);

  return (
    <div className="w-full">
      <Input
        radius="full"
        size="sm"
        width={96}
        isClearable
        variant="bordered"
        placeholder="Search for songs"
        startContent={<IoSearch size={24} className="cursor-pointer" />}
        fullWidth
        value={searchTerm}
        onValueChange={onChange}
      />
    </div>
  );
}

export default SongSearchBar;
