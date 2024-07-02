import { useState, Suspense, lazy, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import useStore from "@/store";

import Loader from "@/components/Loader";
import ButtonGroup from "@/components/ButtonGroup"; // 不能使用懶加載，音樂會出不來
import MetaData from "@/components/MetaData";

const MoveHand = lazy(() => import("@/components/MoveHand"));
const InfoBox = lazy(() => import("@/components/InfoBox"));

const SceneModel = lazy(() => import("@/models/SceneModel"));
const SkyModel = lazy(() => import("@/models/SkyModel"));
const BirdModel = lazy(() => import("@/models/BirdModel"));
const RunnerModel = lazy(() => import("@/models/RunnerModel"));

export default function Home() {
  const { isDark, showHint } = useStore();

  const [currentStage, setCurrentStage] = useState<number | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  // 為了加載時不要顯示按鈕，所以確保非同步完成時才顯示
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => {
      clearTimeout(timer);
    };
  }, [showHint]);

  return (
    <>
      <MetaData
        description="This is Meng-Che Wu's (Will's) self-introduction for applying for the position of Front-End Engineer. This website is implemented using React 18, Vite 5, TypeScript, Three.js, and TailwindCSS 3 to create a 3D page for interview purposes. 這是吳孟哲的自我介紹，用於應徵前端工程師。本網站使用 React 18 + Vite 5 + TypeScript + Three.js + Tailwindcss 3 實作 3D 頁面，以便用於面試之用。"
        image="https://storage.googleapis.com/vue-course-api.appspot.com/letcla-fashion/1719823624312.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=MAViRyuCnc7MP8u6dr6vCTFT3KsZ8OR86jPg%2FSq%2BZi7PfE6vgyVRByTrn7BNuTcEcCAl0NQZ9BZ8Y1i1bVp3s3PicGVa5COvwF4VV3nGbgGV5r2pYU5ZTTHG%2BeiB5wPI1hyHRFQiiLd7r9wFi8s2U0bkO8oXu8garKAW87GJeEik8HyZCAOAc8pG1bNcaFxdBNRZ0ypX78iPdpFLTPOACDkPcF18ira76DuQFQtcNU06yBvciJeYEI6fOuDnAhzVX0Wf5F1YnUe2ndFONrJyjDCJ%2BgB1RBFNn8LYLWnaxwkrQWmQ4eXR2IUZKw7VcB%2BiKGVO3rUfS0OYZQe7BwQmHw%3D%3D"
      />
      <Suspense fallback={<Loader />}>
        {/* 上方顯示區塊 */}
        {isLoaded && showHint && <MoveHand />}
        <InfoBox currentStage={currentStage} />
        {/* 左下按鈕群 */}
        {!showHint && <ButtonGroup />}
        {/* 主 3D 場景 */}
        <Canvas
          camera={{ fov: 50, near: 0.1, far: 1000, position: [0, 1.3, 4.8] }}
          className={`${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
          shadows
        >
          <OrbitControls
            enableDamping={true}
            dampingFactor={0.1}
            minDistance={5}
            maxDistance={8}
          />
          {isDark ? (
            <>
              {/* 人物光 */}
              <pointLight
                position={[-0.05, -0.85, 2.22]}
                intensity={1.3}
                color="#fde68a"
              />
              {/* 商店光 */}
              <pointLight
                position={[0, 0.5, 0]}
                intensity={4}
                color="#f2d42b"
              />
              {/* logo 光 */}
              <pointLight
                position={[0, 0.75, 0.2]}
                intensity={4}
                color="#4d3ef2"
                castShadow
              />
            </>
          ) : (
            <>
              {/* 環境光 */}
              <ambientLight intensity={0.5} />
              {/* 方向光（可以是太陽光） */}
              <directionalLight
                position={[1, 2, 3]}
                intensity={5}
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-left={-5}
                shadow-camera-right={5}
                shadow-camera-top={5}
                shadow-camera-bottom={-5}
              />
              {/* 半球燈，用漸層照亮場景 */}
              <hemisphereLight groundColor="#fde68a" intensity={1.2} />
            </>
          )}

          {!isDark && <BirdModel />}
          <SkyModel isRotating={isRotating} />
          <RunnerModel isRotating={isRotating} />
          <SceneModel
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Canvas>
      </Suspense>
    </>
  );
}
