"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Earth() {
  return (
    <mesh>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial color={"#60a5fa"} />
    </mesh>
  );
}

function Satellite({ radius = 5.6 }: { radius?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const x = Math.cos(t * 0.2) * radius;
    const z = Math.sin(t * 0.2) * radius;
    if (ref.current) {
      ref.current.position.set(x, 0, z);
      ref.current.rotation.y += delta * 2;
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.3, 0.2, 0.2]} />
      <meshStandardMaterial color={"#fde68a"} />
    </mesh>
  );
}

export default function GeoScene() {
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "a") setShowAnnotations((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
        <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <group>
            <Earth />
            <Satellite />
            {/* Orbit path */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}> 
              <ringGeometry args={[5.6, 5.65, 64]} />
              <meshBasicMaterial color={"#93c5fd"} side={THREE.DoubleSide} />
            </mesh>
            {showAnnotations && (
              <>
                <Html position={[0, 1.8, 0]} center>
                  <button className="rounded bg-black/60 px-2 py-1 text-xs ring-1 ring-white/20" onClick={() => setInfo("Orbit GEO ~35.786 km di atas permukaan Bumi.")}>Orbit GEO (35.786 km)</button>
                </Html>
                <Html position={[0, 0, 0]} center>
                  <button className="rounded bg-black/60 px-2 py-1 text-xs ring-1 ring-white/20" onClick={() => setInfo("Bumi (model sederhana)")}>Bumi</button>
                </Html>
              </>
            )}
          </group>
          <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>
      </div>
    </div>
  );
}