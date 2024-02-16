import NextUiProvider from "@/providers/next-ui-provider";
import ToastProvider from "@/providers/toast-provider";
import ModalProvider from "@/providers/modal-provider";

import React from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextUiProvider>{children}</NextUiProvider>
      <ToastProvider />
      <ModalProvider />
    </>
  );
}

export default Providers;
