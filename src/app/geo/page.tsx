"use client";

import { Canvas } from "@react-three/fiber";
import { Bounds, Center, OrbitControls } from "@react-three/drei";
import GeoScene from "@/components/GeoScene";
import { GLTFModelSuspense } from "@/components/Model";

export default function Page() {
  return (
    <section className="grid gap-4">
      <header>
        <h1 className="text-2xl font-semibold">Modul Satelit GEO</h1>
        <p className="text-white/70">Visualisasi orbit GEO mengelilingi Bumi, anotasi dan kontrol kamera.</p>
      </header>
      <GeoScene />
      <div className="rounded-lg ring-1 ring-white/10 overflow-hidden">
        <div className="p-2 border-b border-white/10 text-sm">3D Viewer</div>
        <div className="h-[500px]">
          <Canvas shadows camera={{ position: [0, 1.5, 6], fov: 45, near: 0.1, far: 200 }}>
            <ambientLight intensity={0.65} />
            <directionalLight position={[5, 8, 5]} intensity={1.1} castShadow />
            <Bounds fit clip observe margin={1.1}>
              <Center>
                <GLTFModelSuspense url="/space-edu-3d/models/Satelit_Satria.glb" scale={0.35} position={[0, 0, 0]} />
              </Center>
            </Bounds>
            <OrbitControls
              makeDefault
              enableDamping
              enablePan={false}
              enableZoom
              enableRotate
              target={[0, 0, 0]}
              minDistance={1.8}
              maxDistance={10}
              minPolarAngle={0.35}
              maxPolarAngle={Math.PI - 0.35}
              rotateSpeed={0.8}
              zoomSpeed={0.9}
              dampingFactor={0.08}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
