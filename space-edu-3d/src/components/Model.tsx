"use client";

import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";

type Props = {
  url: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
};

export function GLTFModel({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: Props) {
  const gltf = useGLTF(url, true);
  return <primitive object={gltf.scene} scale={scale} position={position} rotation={rotation} />;
}

export function GLTFModelSuspense(props: Props) {
  return (
    <Suspense fallback={null}>
      <GLTFModel {...props} />
    </Suspense>
  );
}

useGLTF.preload("/nasa/models/space_shuttle_d.glb");