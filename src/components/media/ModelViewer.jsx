"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, Center } from "@react-three/drei";
import { GLTFModelSuspense } from "@/components/Model";

const cubesatModelUrl = new URL("../../3d-parts/cubesat.glb", import.meta.url).href;

export default function ModelViewer({ title }) {
  return (
    <div className="space-y-4">
      {title ? <h2 className="text-xl font-semibold text-cyan-300">{title}</h2> : null}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/80">
        <div className="h-[420px] w-full">
          <Canvas shadows camera={{ position: [0, 1.5, 6], fov: 45, near: 0.1, far: 200 }}>
            <ambientLight intensity={0.65} />
            <directionalLight position={[5, 8, 5]} intensity={1.1} />
            <Bounds fit clip observe margin={1.1}>
              <Center>
                <GLTFModelSuspense url={cubesatModelUrl} scale={0.35} position={[0, 0, 0]} />
              </Center>
            </Bounds>
            <OrbitControls autoRotate autoRotateSpeed={1.5} enablePan={false} enableZoom />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
