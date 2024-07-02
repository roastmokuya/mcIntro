import { StateCreator } from "zustand";

export type RunSlice = {
  isRunning: boolean;
  setIsRunning: () => void;
};

const createRunSlice: StateCreator<RunSlice> = (set) => ({
  isRunning: false,
  setIsRunning: () => set((state) => ({ isRunning: !state.isRunning })),
});

export default createRunSlice;
