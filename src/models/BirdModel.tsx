import { useRef, useEffect, memo } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

// 不能使用 import 引入，會報錯
const birdPath = new URL("@/assets/3d/bird-transformed.glb", import.meta.url)
  .href;

const BirdModel = memo(function BirdModel() {
  const { scene, animations } = useGLTF(birdPath);
  const birdRef = useRef<Mesh>(null!);

  // 震動翅膀
  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
    const action = actions["Flying"];
    if (action) {
      action.timeScale = 0.3;
      action.play();
    }
  }, [actions]);

  useFrame(({ clock, camera }) => {
    if (birdRef.current) {
      // 使用正弦上下移動
      birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

      if (birdRef.current.position.x > camera.position.x + 20) {
        // 飛遠後鳥轉向
        birdRef.current.rotation.y = Math.PI * 1.5;
      } else if (birdRef.current.position.x < camera.position.x - 10) {
        // 進入時
        birdRef.current.rotation.y = 2;
      }

      if (birdRef.current.rotation.y === 2) {
        // 飛遠
        birdRef.current.position.x += 0.03;
        birdRef.current.position.z -= 0.01;
      } else {
        // 飛回
        birdRef.current.position.x -= 0.03;
        birdRef.current.position.z += 0.01;
      }
    }
  });

  return (
    <mesh position={[-5, 2, -4]} scale={[0.15, 0.15, 0.15]} ref={birdRef}>
      <primitive object={scene} />
    </mesh>
  );
});

export default BirdModel;
