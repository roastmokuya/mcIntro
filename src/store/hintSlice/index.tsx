import { StateCreator } from "zustand";

export type HintSlice = {
  showHint: boolean;
  setShowHint: () => void;
};

const createHintSlice: StateCreator<HintSlice> = (set) => ({
  showHint: true,
  setShowHint: () => set(() => ({ showHint: false })),
});

export default createHintSlice;
