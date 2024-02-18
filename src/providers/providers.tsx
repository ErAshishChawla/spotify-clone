import NextUiProvider from "@/providers/next-ui-provider";
import ToastProvider from "@/providers/toast-provider";
import ModalProvider from "@/providers/modal-provider";
import { UserStoreProvider } from "@/providers/user-store-provider";

import React from "react";
import UserProvider from "./user-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserStoreProvider>
        <NextUiProvider>{children}</NextUiProvider>
        <ToastProvider />
        <ModalProvider />
      </UserStoreProvider>
    </>
  );
}

export default Providers;
