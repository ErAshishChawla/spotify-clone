import { createStore } from "zustand/vanilla";

export type PlayerState = {
  ids: string[];
  active_id?: string;
};

export type PlayerActions = {
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
};

export type PlayerStore = PlayerState & PlayerActions;

export const defaultInitState: PlayerState = {
  ids: [],
  active_id: undefined,
};

export const createPlayerStore = (
  initState: PlayerState = defaultInitState
) => {
  return createStore<PlayerStore>()((set) => {
    return {
      ...initState,
      setId: (id: string) => set((state) => ({ active_id: id })),
      setIds: (ids: string[]) => set((state) => ({ ids: ids })),
      reset: () => set((state) => ({ id: [], active_id: undefined })),
    };
  });
};
