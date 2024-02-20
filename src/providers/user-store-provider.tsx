// src/providers/counter-store-provider.tsx
"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
} from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type UserStore,
  createUserStore,
  initUserStore,
} from "@/stores/user-store";

import { createClient } from "@/lib/supabase/client";

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null);

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const supabase = createClient();
  const storeRef = useRef<StoreApi<UserStore>>();
  if (!storeRef.current) {
    storeRef.current = createUserStore(initUserStore());
  }

  const getUser = () => {
    return supabase.auth.getUser();
  };

  const getSubscription = () => {
    return supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();
  };

  function authChange() {
    if (!storeRef.current) {
      return;
    }

    storeRef.current.setState({
      isFetchingUser: true,
      isReset: false,
      isLoggedIn: false,
      isSubscribed: false,
      userData: undefined,
      subscriptionData: undefined,
    });

    Promise.allSettled([
      getUser(),
      // , getSubscription()
    ]).then((results) => {
      if (!storeRef.current) {
        return;
      }

      const userDetailsPromise = results[0];
      // const subscriptionPromise = results[1];

      if (userDetailsPromise.status === "fulfilled") {
        storeRef.current.setState((state) => {
          return {
            userData: userDetailsPromise.value.data.user
              ? userDetailsPromise.value.data.user
              : undefined,
            isLoggedIn: userDetailsPromise.value.data.user ? true : false,
          };
        });
      }

      // if (subscriptionPromise.status === "fulfilled") {
      //   storeRef.current.setState((state) => ({
      //     subscriptionData: subscriptionPromise.value.data
      //       ? subscriptionPromise.value.data
      //       : undefined,
      //     isSubscribed: subscriptionPromise.value.data ? true : false,
      //   }));
      // }

      storeRef.current.setState((state) => ({
        isFetchingUser: false,
        isReset: false,
      }));
    });
  }

  useEffect(() => {
    if (!storeRef.current) {
      return;
    }

    authChange();

    const { data: subscriptionObj } = supabase.auth.onAuthStateChange(() => {
      authChange();
    });

    return () => {
      subscriptionObj.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
