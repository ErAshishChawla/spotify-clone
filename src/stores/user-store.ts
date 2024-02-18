// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";

import { Subscription } from "@/types/types";
import { User } from "@supabase/supabase-js";

export type UserState = {
  isReset: boolean;
  isFetchingUser: boolean;
  isLoggedIn: boolean;
  isSubscribed: boolean;
  userData?: User;
  subscriptionData?: Subscription;
};

export type UserActions = {
  setIsFetchingUser: (isFetchingUser: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserData: (userData: User) => void;
  setIsSubscribed: (isSubscribed: boolean) => void;
  setSubscriptionData: (subscriptionData: Subscription) => void;
  // fetchUser: () => Promise<void>;
  resetUser: () => void;
};

export type UserStore = UserState & UserActions;

export const initUserStore = (): UserState => {
  return {
    isReset: true,
    isFetchingUser: false,
    isLoggedIn: false,
    isSubscribed: false,
    userData: undefined,
    subscriptionData: undefined,
  };
};

export const defaultInitState: UserState = {
  isReset: true,
  isFetchingUser: false,
  isLoggedIn: false,
  isSubscribed: false,
  userData: undefined,
  subscriptionData: undefined,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setIsFetchingUser: (isFetchingUser: boolean) =>
      set((state) => ({ isFetchingUser })),
    setIsLoggedIn: (isLoggedIn: boolean) => set((state) => ({ isLoggedIn })),
    setUserData: (userData: User) => set((state) => ({ userData })),
    setIsSubscribed: (isSubscribed: boolean) =>
      set((state) => ({ isSubscribed })),
    setSubscriptionData: (subscriptionData: Subscription) =>
      set((state) => ({ subscriptionData })),
    resetUser: () => set((state) => ({ ...defaultInitState })),
  }));
};
