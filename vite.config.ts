import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/mcIntro/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.gltf", "**/*.glb"], // 沒有添加會發生錯誤
  ssr: {
    noExternal: ["react-helmet-async"], // 解決 vite-react-ssg 不提供名為 HelmetProvider 的導出問題
  },
});
