/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        upDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        upDown: "upDown 3s ease-in-out infinite",
      },
      dropShadow: {
        glow: ["0 0px 20px rgba(255, 255, 137, 0.35)"],
      },
    },
  },
  plugins: [],
};
