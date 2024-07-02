import { useEffect } from "react";
import useStore from "@/store";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";

export default function DarkButton() {
  const { isDark, setIsDark } = useStore();

  useEffect(() => {
    isDark
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [isDark]);

  return (
    <div>
      <button
        type="button"
        className="p-4"
        onClick={() => {
          setIsDark();
        }}
      >
        {isDark ? <BsSunFill size={24} /> : <BsFillMoonStarsFill size={20} />}
      </button>
    </div>
  );
}
