import { StateCreator } from "zustand";

export type DarkSlice = {
  isDark: boolean;
  setIsDark: () => void;
};

const createDarkSlice: StateCreator<DarkSlice> = (set) => ({
  // 定義狀態數據
  isDark:
    typeof window !== "undefined"
      ? localStorage.getItem("isDark") === "true" || false
      : false,
  // 定義修改狀態數據的方法 (同步)
  setIsDark: () =>
    set((state) => {
      const newIsDark = !state.isDark;

      // 使用 vite-react-ssg 要記得加入 localStorage 的判斷
      if (typeof window !== "undefined") {
        localStorage.setItem("isDark", newIsDark.toString()); // 要轉為字串
      }

      return { isDark: newIsDark };
    }),
});

export default createDarkSlice;
