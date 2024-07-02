import { StateCreator } from "zustand";

export type MusicSlice = {
  isPlaying: boolean;
  setIsPlaying: () => void;
};

const createMusicSlice: StateCreator<MusicSlice> = (set) => ({
  isPlaying: false,
  setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
});

export default createMusicSlice;
