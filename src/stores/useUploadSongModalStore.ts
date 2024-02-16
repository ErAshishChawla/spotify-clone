import { create } from "zustand";

interface UploadSongModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange?: (isOpen: boolean) => void;
}

export const useUploadSongModalStore = create<UploadSongModalStore>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onOpenChange: (isOpen) => set({ isOpen }),
  };
});
