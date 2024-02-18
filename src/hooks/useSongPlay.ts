import { Song } from "@/types/types";

import { usePlayerStore } from "@/stores/usePlayerStore";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayerStore();
};
