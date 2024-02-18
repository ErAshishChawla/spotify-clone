import { create } from "zustand";

interface PlayerStore {
  id: string[];
  active_id?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayerStore = create<PlayerStore>((set) => ({
  id: [],
  active_id: undefined,
  setId: (id: string) => set((state) => ({ active_id: id })),
  setIds: (ids: string[]) => set((state) => ({ id: ids })),
  reset: () => set((state) => ({ id: [], active_id: undefined })),
}));

export { usePlayerStore };
