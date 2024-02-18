"use client";

import { useEffect, useState } from "react";

import { useUserStore } from "@/stores/useUserStore";

function UserProvider() {
  const userStore = useUserStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      await userStore.fetchUser();
    }

    fetchUser();
    setIsMounted(true);
    console.log(isMounted);
  }, [isMounted]);

  return null;
}

export default UserProvider;
