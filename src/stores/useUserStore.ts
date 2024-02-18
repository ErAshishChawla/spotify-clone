import { Subscription } from "@/types/types";
import { User } from "@supabase/supabase-js";

import { create } from "zustand";

import { createClient } from "@/lib/supabase/client";

interface UserStore {
  isReset: boolean;
  isFetchingUser: boolean;
  isLoggedIn: boolean;
  isSubscribed: boolean;
  userData?: User;
  subscriptionData?: Subscription;
  setIsFetchingUser: (isFetchingUser: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserData: (userData: User) => void;
  setIsSubscribed: (isSubscribed: boolean) => void;
  setSubscriptionData: (subscriptionData: Subscription) => void;
  fetchUser: () => Promise<void>;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isReset: true,
  isFetchingUser: false,
  isLoggedIn: false,
  isSubscribed: false,
  userData: undefined,
  subscriptionData: undefined,
  setIsFetchingUser: (isFetchingUser: boolean) =>
    set((state) => ({ isFetchingUser })),
  setIsLoggedIn: (isLoggedIn: boolean) => set((state) => ({ isLoggedIn })),
  setUserData: (userData: User) => set((state) => ({ userData })),
  setIsSubscribed: (isSubscribed: boolean) =>
    set((state) => ({ isSubscribed })),
  setSubscriptionData: (subscriptionData: Subscription) =>
    set((state) => ({ subscriptionData })),

  fetchUser: async () => {
    const supabase = createClient();
    console.log("fetchUser");

    set((state) => ({ isFetchingUser: true, isReset: false }));

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      // console.log("userError", userError);
      // console.log("userData", userData);
      set((state) => ({
        isFetchingUser: false,
        isLoggedIn: false,
        isReset: false,
      }));
      return;
    }

    set((state) => ({ userData: userData.user, isLoggedIn: true }));

    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

    if (subscriptionError || !subscriptionData) {
      // console.log("subscriptionError", subscriptionError);
      // console.log("subscriptionData", subscriptionData);
      set((state) => ({
        isFetchingUser: false,
        isSubscribed: false,
        isReset: false,
      }));
      return;
    }

    set((state) => ({
      subscriptionData,
      isFetchingUser: false,
      isSubscribed: true,
      isReset: false,
    }));

    return;
  },

  resetUser: () => {
    set((state) => ({
      isFetchingUser: false,
      isLoggedIn: false,
      isSubscribed: false,
      userData: undefined,
      subscriptionData: undefined,
      isReset: true,
    }));
  },
}));
