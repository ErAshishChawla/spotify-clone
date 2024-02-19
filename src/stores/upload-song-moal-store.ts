import { createStore } from "zustand/vanilla";

export type UploadSongModalState = {
  isOpen: boolean;
};

export type UploadSongModalActions = {
  onOpen: () => void;
  onClose: () => void;
  onOpenChange?: (isOpen: boolean) => void;
};

export type UploadSongModalStore = UploadSongModalState &
  UploadSongModalActions;

export const defaultInitState: UploadSongModalState = {
  isOpen: false,
};

export const createCounterStore = (
  initState: UploadSongModalState = defaultInitState
) => {
  return createStore<UploadSongModalStore>()((set) => {
    return {
      ...initState,
      onOpen: () => set({ isOpen: true }),
      onClose: () => set({ isOpen: false }),
      onOpenChange: (isOpen) => set({ isOpen }),
    };
  });
};
