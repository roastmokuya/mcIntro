import { memo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import useStore from "@/store";
import { Props } from "@/types/props";

const SkyModel = memo(function SkyModel({ isRotating }: Props) {
  const { isDark, isRunning } = useStore();

  const skyPath = isDark
    ? new URL("@/assets/3d/sky-dark.glb", import.meta.url).href
    : new URL("@/assets/3d/sky.glb", import.meta.url).href;

  const { scene } = useGLTF(skyPath);
  const skyRef = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    // 手動旋轉時
    if (isRotating) {
      skyRef.current.rotation.y += 0.2 * delta;
    }

    // 自動播放時
    if (isRunning) skyRef.current.rotation.y += 0.05 * delta;
  });

  return (
    <mesh
      scale={isDark ? [3, 3, 3] : [0.8, 0.8, 0.8]}
      rotation={[0, 2.5, 0]}
      receiveShadow
      ref={skyRef}
    >
      <primitive object={scene} />
    </mesh>
  );
});

export default SkyModel;
