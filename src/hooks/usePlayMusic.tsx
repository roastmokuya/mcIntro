import { useEffect, useRef } from "react";
import useStore from "@/store";
import musicPath from "/music/Ticket_To_Roam.mp3";

export default function usePlayMusic() {
  // 背景音樂
  const { isPlaying, setIsPlaying } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTimeRef = useRef(0); // 保存當前播放時間

  useEffect(() => {
    // 音樂初始化
    if (!audioRef.current) {
      audioRef.current = new Audio(musicPath);
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    const handlePlayPause = async () => {
      if (isPlaying) {
        audio.currentTime = currentTimeRef.current; // 恢復之前播放時間
        try {
          await audio.play();
        } catch (error) {
          console.error("Auto-play was prevented:", error);
        }
      } else {
        currentTimeRef.current = audio.currentTime; // 重新紀錄當前播放時間
        audio.pause();
      }
    };

    handlePlayPause();

    // 一定要卸載音樂，不然可能會有音樂重疊問題
    return () => {
      if (!isPlaying) {
        audio.pause();
      }
    };
  }, [isPlaying]);

  return {
    isPlaying,
    setIsPlaying,
  };
}
