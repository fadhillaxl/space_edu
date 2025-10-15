"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFModelSuspense } from "@/components/Model";
import { useEffect, useState } from "react";

function Booster({ x }: { x: number }) {
  return (
    <mesh position={[x, 0, 0]}>
      <cylinderGeometry args={[0.28, 0.28, 2.2, 24]} />
      <meshStandardMaterial color={"#93c5fd"} />
    </mesh>
  );
}

export default function RusScene() {
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [info, setInfo] = useState<string | null>(null);
  const [hasBuranModel, setHasBuranModel] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "a") setShowAnnotations((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Check if a local Buran GLB is available; if not, keep placeholder
  useEffect(() => {
    const url = "/external/models/buran.glb";
    fetch(url, { method: "HEAD", cache: "no-store" })
      .then((res) => setHasBuranModel(res.ok))
      .catch(() => setHasBuranModel(false));
  }, []);

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <button className="rounded bg-white/10 px-3 py-1 ring-1 ring-white/20 hover:ring-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400" onClick={() => setShowAnnotations((s) => !s)}>
          Toggle Anotasi (A)
        </button>
        {info && <span className="text-sm text-white/80">{info}</span>}
      </div>
      <div className="h-[500px] rounded-lg ring-1 ring-white/10 overflow-hidden">
        <Canvas camera={{ position: [4, 3, 6], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <group>
            {/* Energiya core */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.55, 0.55, 3, 32]} />
              <meshStandardMaterial color={"#f59e0b"} />
            </mesh>
            {/* Boosters */}
            <Booster x={-1.0} />
            <Booster x={1.0} />
            {/* Buran orbiter */}
            {hasBuranModel ? (
              <GLTFModelSuspense url="/external/models/buran.glb" scale={0.28} position={[0, -1.6, 0]} />
            ) : (
              <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <boxGeometry args={[1.3, 0.35, 0.7]} />
                <meshStandardMaterial color={"#e5e7eb"} />
              </mesh>
            )}
            {showAnnotations && (
              <>
                <Html position={[0, 1.6, 0]} center>
                  <button className="rounded bg-black/60 px-2 py-1 text-xs ring-1 ring-white/20" onClick={() => setInfo("Roket Energiya: Tahap utama peluncuran Buran.")}>Energiya (Core)</button>
                </Html>
                <Html position={[-1.0, 1.2, 0]} center>
                  <button className="rounded bg-black/60 px-2 py-1 text-xs ring-1 ring-white/20" onClick={() => setInfo("Booster: Memberikan dorongan tambahan pada fase awal.")}>Booster Kiri</button>
                </Html>
                <Html position={[1.0, 1.2, 0]} center>
                  <button className="rounded bg-black/60 px-2 py-1 text-xs ring-1 ring-white/20" onClick={() => setInfo("Booster: Memberikan dorongan tambahan pada fase awal.")}>Booster Kanan</button>
                </Html>
                <Html position={[0, -1.5, 0]} center>
                  <div className="flex items-center gap-2">
                    <button className="rounded bg-black/60 px-2 py-1 text-xs ring-1 ring-white/20" onClick={() => setInfo("Buran: Pesawat ulang-alik Rusia.")}>Buran (Orbiter)</button>
                    <a href="https://www.artstation.com/artwork/LznQv" target="_blank" rel="noreferrer" className="rounded bg-black/60 px-2 py-1 text-xs ring-1 ring-white/20 hover:ring-cyan-400">Referensi ArtStation</a>
                  </div>
                </Html>
              </>
            )}
          </group>
          <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>
      </div>
    </div>
  );}