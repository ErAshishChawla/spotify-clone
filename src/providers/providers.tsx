import NextUiProvider from "@/providers/next-ui-provider";
import ToastProvider from "@/providers/toast-provider";
import ModalProvider from "@/providers/modal-provider";
import { PlayerProvider } from "@/providers/player-provider";
import { UserStoreProvider } from "@/providers/user-store-provider";

import React from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserStoreProvider>
        <PlayerProvider>
          <NextUiProvider>{children}</NextUiProvider>
          <ToastProvider />
          <ModalProvider />
        </PlayerProvider>
      </UserStoreProvider>
    </>
  );
}

export default Providers;
