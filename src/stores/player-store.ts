import { createStore } from "zustand/vanilla";

export type PlayerState = {
  allSongIds: string[];
  activeSongId?: string;
  isPlaying: boolean;
  volume: number;
};

export type PlayerActions = {
  setActiveSongId: (id: string) => void;
  setAllSongIds: (ids: string[]) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  reset: () => void;
};

export type PlayerStore = PlayerState & PlayerActions;

export const defaultInitState: PlayerState = {
  allSongIds: [],
  activeSongId: undefined,
  isPlaying: false,
  volume: 1,
};

export const createPlayerStore = (
  initState: PlayerState = defaultInitState
) => {
  return createStore<PlayerStore>()((set) => {
    return {
      ...initState,
      setActiveSongId: (activeSongId: string) =>
        set((state) => ({ activeSongId })),
      setAllSongIds: (allSongIds: string[]) => set((state) => ({ allSongIds })),
      setIsPlaying: (isPlaying: boolean) => set((state) => ({ isPlaying })),
      setVolume: (volume: number) => set((state) => ({ volume })),
      reset: () => set((state) => ({ ...defaultInitState })),
    };
  });
};
