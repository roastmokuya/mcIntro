import { useRef, useEffect, memo } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Mesh, Object3D } from "three";
import useStore from "@/store";
import { Props } from "@/types/props";

// 不能使用 import 引入，會報錯
const runnerPath = new URL("@/assets/3d/runner.glb", import.meta.url).href;

const RunnerModel = memo(function RunnerModel({ isRotating }: Props) {
  const { isRunning } = useStore();

  const { scene, animations } = useGLTF(runnerPath);
  const runnerRef = useRef(null);
  const requestRef = useRef<number>(null!);

  // 跑步
  const { actions } = useAnimations(animations, runnerRef);

  useEffect(() => {
    const action = actions["Animation"];
    if (!action) return;

    const running = () => {
      if (action) {
        action.timeScale = 0.7; // 負值就可以反向播放
        action.play();
      }
    };

    if (isRunning) {
      running();
    } else {
      if (isRotating) {
        running();
      } else {
        // 停止
        const stopRun = () => {
          action.timeScale = 0;
          action.stop();
          cancelAnimationFrame(requestRef.current);
        };

        // 慢慢變慢
        const slowDown = () => {
          if (action.timeScale > 0.1) {
            action.timeScale -= 0.01;
            requestRef.current = requestAnimationFrame(slowDown);
          } else {
            stopRun();
          }
        };

        requestRef.current = requestAnimationFrame(slowDown);
      }
    }

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [actions, isRotating, isRunning]);

  // 製作陰影
  useEffect(() => {
    scene.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) {
        const meshChild = child as Mesh;
        meshChild.castShadow = true; // 模型投射陰影
        meshChild.receiveShadow = true; // 模型接收陰影
      }
    });
  }, [scene]);

  return (
    <mesh
      position={[0, -0.9, 1.87]}
      scale={[0.3, 0.3, 0.3]}
      rotation={[0, 1.5, 0]}
      ref={runnerRef}
      castShadow
    >
      <primitive object={scene} />
    </mesh>
  );
});

export default RunnerModel;
