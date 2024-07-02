import { Props } from "@/types/props";

export default function useRotateSection({ setCurrentStage }: Props) {
  // 旋轉角度出現 section (搭配 InfoBox)
  const handleRotateSection = (rotation: number) => {
    // 資料正規化
    const normalizedRotation =
      ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    if (setCurrentStage)
      switch (true) {
        case normalizedRotation >= 5.25 && normalizedRotation <= 6.15:
          setCurrentStage(7);
          break;
        case normalizedRotation >= 0 && normalizedRotation <= 0.65:
          setCurrentStage(6);
          break;
        case normalizedRotation >= 0.9 && normalizedRotation <= 1.55:
          setCurrentStage(5);
          break;
        case normalizedRotation >= 1.8 && normalizedRotation <= 2.45:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 2.7 && normalizedRotation <= 3.35:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 3.6 && normalizedRotation <= 4.25:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.5 && normalizedRotation <= 5:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
  };
  return { handleRotateSection };
}
