import { memo } from "react";
import useStore from "@/store";
import usePlayMusic from "@/hooks/usePlayMusic";
import { GiRunningShoe, GiStopSign } from "react-icons/gi";

// 這邊 props 參數需有默認值，不然會出錯
const RunButton = memo(function RunButton() {
  const { isRunning, setIsRunning, setShowHint } = useStore();
  const { setIsPlaying } = usePlayMusic();

  return (
    <button
      type="button"
      className="play-btn"
      onClick={() => {
        setIsRunning();
        setIsPlaying();
        setShowHint();
      }}
    >
      {isRunning ? <GiStopSign size={34} /> : <GiRunningShoe size={32} />}
    </button>
  );
});

export default RunButton;
