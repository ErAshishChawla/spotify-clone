import { create } from "zustand";

import { useDisclosure } from "@nextui-org/react";

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onOpenChange: () => set((state) => ({ isOpen: !state.isOpen })),
  };
});
