import { useRef, useEffect, useCallback, memo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, Group } from "three";
import useStore from "@/store";
import { Props } from "@/types/props";
import useRotateSection from "@/hooks/useRotateSection";

// 不能使用 import 引入，會報錯
const scenePath = new URL("@/assets/3d/shop-transformed.glb", import.meta.url)
  .href;

const SceneModel = memo(function SceneModel({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}: Props) {
  const { isRunning, setShowHint } = useStore();

  const { nodes, materials } = useGLTF(scenePath);
  const { gl, viewport } = useThree();
  const groupRef = useRef<Group | null>(null); // 要將類型設置為 Group，不然會報錯

  const lastX = useRef(0); // 記住最後滑鼠 X 座標位置
  const rotationSpeed = useRef(0); // 旋轉速度
  const dampingFactor = 0.95; // 阻尼感

  // 旋轉角度出現 section (搭配 InfoBox)
  const { handleRotateSection } = useRotateSection({ setCurrentStage });
  // 偵測每一幀
  useFrame(() => {
    if (groupRef.current) {
      if (!isRotating) {
        // 沒有旋轉就越飛越慢
        rotationSpeed.current *= dampingFactor;
        if (Math.abs(rotationSpeed.current) < 0.001) {
          rotationSpeed.current = 0;
        }

        groupRef.current.rotation.y += rotationSpeed.current; // 放開後還會滑行一段時間

        // 沒有旋轉就自動旋轉
        if (isRunning) {
          const rotation = (groupRef.current.rotation.y +=
            rotationSpeed.current - 0.002);
          handleRotateSection(rotation);
        }
      } else {
        const rotation = groupRef.current.rotation.y;
        handleRotateSection(rotation);
      }
    }
  });

  // 按住滑鼠
  const handlePointerDown = useCallback(
    (e: PointerEvent | TouchEvent) => {
      e.stopPropagation(); // 表示只會執行此函式的操作，並不會觸及任何內容
      e.preventDefault();

      if (setIsRotating && setShowHint) {
        setIsRotating(true);
        setShowHint();
      }

      // 記住當前滑鼠 X 座標位置
      let clientX: number;
      if ("touches" in e) {
        clientX = e.touches[0].clientX; // 是 TouchEvent
      } else {
        clientX = e.clientX; // 是 PointerEvent
      }

      lastX.current = clientX;
    },
    [setIsRotating, setShowHint]
  );

  // 鬆開滑鼠
  const handlePointerUp = useCallback(
    (e: PointerEvent | TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (setIsRotating) {
        setIsRotating(false);
      }
    },
    [setIsRotating]
  );

  // 拖曳滑鼠
  const handlePointerMove = useCallback(
    (e: PointerEvent | TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (isRotating) {
        // 記住當前滑鼠 X 座標位置
        let clientX: number;
        if ("touches" in e) {
          clientX = e.touches[0].clientX; // 是 TouchEvent
        } else {
          clientX = e.clientX; // 是 PointerEvent
        }

        const delta = (clientX - lastX.current) / viewport.width; // 計算當前 X 座標和上一次 X 座標所移動的距離

        if (groupRef.current) {
          groupRef.current.rotation.y += delta * 0.01 * Math.PI; // 依比例旋轉 Y 軸
        }

        lastX.current = clientX;
        rotationSpeed.current = delta * 0.01 * Math.PI;
      }
    },
    [isRotating, viewport.width]
  );

  // 監聽事件
  useEffect(() => {
    // 手機滑動
    const handleTouchMove = (e: TouchEvent) => {
      requestAnimationFrame(() => handlePointerMove(e));
    };

    const canvas = gl.domElement;

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    canvas.addEventListener("touchstart", handlePointerDown);
    canvas.addEventListener("touchend", handlePointerUp);
    canvas.addEventListener("touchmove", handleTouchMove);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);

      canvas.removeEventListener("touchstart", handlePointerDown);
      canvas.removeEventListener("touchend", handlePointerUp);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    // 因為場景要接收影子，所以要使用 group 這樣的方式
    <group
      {...props}
      dispose={null}
      // 預設值
      position={[0, -1.3, 0]}
      scale={[2.3, 2.3, 2.3]}
      rotation={[0, 5.1, 0]}
      ref={groupRef}
    >
      <mesh
        geometry={(nodes.Object_4 as Mesh).geometry} // 強制斷言，不然會報錯
        material={materials["Material.003"]}
        position={[0.292, 0.254, 0.507]}
        rotation={[1.59, -0.207, 1.612]}
        scale={[0.011, 0.014, 0.014]}
        castShadow
        receiveShadow
      />
    </group>
  );
});

export default SceneModel;

useGLTF.preload(scenePath);
