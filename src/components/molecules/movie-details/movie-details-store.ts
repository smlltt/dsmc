import { create } from "zustand";

export const useMovieDetailsStore = create<{
  movieDetailsId: number | null;
  setId: (id: number) => void;
  clear: () => void;
}>((set) => ({
  movieDetailsId: null,
  setId: (id: number) => set(() => ({ movieDetailsId: id })),
  clear: () => set({ movieDetailsId: null }),
}));
