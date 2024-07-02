export type Props = {
  isRotating?: boolean;
  setIsRotating?: (isRotating: boolean) => void;
  currentStage?: number | null;
  setCurrentStage?: (currentStage: number | null) => void;
};
