import { create } from "zustand";
import createDarkSlice, { type DarkSlice } from "./darkSlice";
import createRunSlice, { type RunSlice } from "./runSlice";
import createMusicSlice, { type MusicSlice } from "./musicSlice";
import createHintSlice, { type HintSlice } from "./hintSlice";

type Store = DarkSlice & RunSlice & MusicSlice & HintSlice;

const useStore = create<Store>((...a) => ({
  ...createDarkSlice(...a), // 合併所有 Slice 到主 store
  ...createRunSlice(...a),
  ...createMusicSlice(...a),
  ...createHintSlice(...a),
}));

export default useStore;
