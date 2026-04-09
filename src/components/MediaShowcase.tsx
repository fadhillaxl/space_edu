"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Center, Bounds } from "@react-three/drei";
import { GLTFModelSuspense } from "@/components/Model";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  description?: string;
  referenceUrl?: string;
  videoSrc?: string; // e.g. /external/videos/buran.mp4
  imageSrcs?: string[]; // e.g. ["/images/one.jpg", ...]
  onImagePreviewClick?: (index: number) => void;
  modelUrl?: string; // e.g. /external/models/buran.glb
  sketchfabEmbedUrl?: string; // e.g. https://sketchfab.com/models/.../embed
  sketchfabTitle?: string;
  sketchfabModelUrl?: string;
  sketchfabAuthorName?: string;
  sketchfabAuthorUrl?: string;
  sketchfabPlatformUrl?: string;
};

export default function MediaShowcase({ title, description, referenceUrl, videoSrc, imageSrcs = [], onImagePreviewClick, modelUrl, sketchfabEmbedUrl, sketchfabTitle = "Sketchfab Model", sketchfabModelUrl, sketchfabAuthorName, sketchfabAuthorUrl, sketchfabPlatformUrl = "https://sketchfab.com" }: Props) {
  const fallbackPoster = "/space-edu-3d/globe.svg";
  const [videoPoster, setVideoPoster] = useState(fallbackPoster);

  useEffect(() => {
    if (!videoSrc) {
      setVideoPoster(fallbackPoster);
      return;
    }

    let cancelled = false;
    let captured = false;

    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    video.src = videoSrc;
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    const captureFrame = () => {
      if (cancelled || captured) return;
      if (!video.videoWidth || !video.videoHeight) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setVideoPoster(dataUrl);
        captured = true;
      } catch {
        setVideoPoster(fallbackPoster);
      }
    };

    const onLoadedMetadata = () => {
      const targetTime = Number.isFinite(video.duration) && video.duration > 0.2 ? 0.2 : 0;
      if (targetTime === 0) {
        captureFrame();
        return;
      }
      try {
        video.currentTime = targetTime;
      } catch {
        captureFrame();
      }
    };

    const onLoadedData = () => {
      // Some browsers can draw the first frame without seeking.
      if (!captured) captureFrame();
    };

    const onSeeked = () => {
      captureFrame();
    };

    const onError = () => {
      if (!cancelled) setVideoPoster(fallbackPoster);
    };

    setVideoPoster(fallbackPoster);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      video.src = "";
    };
  }, [videoSrc]);

  return (
    <div className="grid gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {description && <p className="text-sm text-white/70 mt-1">{description}</p>}
        </div>
        {referenceUrl && (
          <a href={referenceUrl} target="_blank" rel="noreferrer" className="rounded bg-white/10 px-3 py-1 ring-1 ring-white/20 hover:ring-cyan-400">
            ArtStation Reference
          </a>
        )}
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="rounded-lg ring-1 ring-white/10 overflow-hidden">
          <div className="p-2 border-b border-white/10 text-sm">Video</div>
          <div className="p-3">
            {videoSrc ? (
              <video src={videoSrc} controls className="w-full rounded" poster={videoPoster} preload="metadata" />
            ) : (
              <div className="h-48 flex items-center justify-center text-white/60">Place video at /public/video and pass videoSrc.</div>
            )}
          </div>
        </section>

        <section className="rounded-lg ring-1 ring-white/10 overflow-hidden">
          <div className="p-2 border-b border-white/10 text-sm">Images</div>
          <div className="grid grid-cols-3 gap-3 p-3 max-h-72 overflow-y-auto">
            {(imageSrcs.length ? imageSrcs : ["/space-edu-3d/globe.svg", "/space-edu-3d/window.svg", "/space-edu-3d/file.svg"]).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onImagePreviewClick?.(i)}
                className={`rounded ring-1 ring-white/10 overflow-hidden ${onImagePreviewClick ? "cursor-pointer hover:ring-cyan-300" : "cursor-default"}`}
                aria-label={`Open image ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`image-${i}`}
                  width={300}
                  height={200}
                  priority={i === 0}
                  className="w-full h-auto"
                />
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-lg ring-1 ring-white/10 overflow-hidden">
        <div className="p-2 border-b border-white/10 text-sm">3D Viewer</div>
        {modelUrl ? (
          <div className="h-[500px]">
            <Canvas shadows camera={{ position: [0, 1.5, 6], fov: 45, near: 0.1, far: 200 }}>
              <ambientLight intensity={0.65} />
              <directionalLight position={[5, 8, 5]} intensity={1.1} castShadow />
              <Bounds fit clip observe margin={1.1}>
                <Center>
                  <GLTFModelSuspense url={modelUrl} scale={0.28} position={[0, 0, 0]} />
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
        ) : sketchfabEmbedUrl ? (
          <div className="p-0">
            <div className="sketchfab-embed-wrapper">
              <iframe
                title={sketchfabTitle}
                src={sketchfabEmbedUrl}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                className="w-full h-[500px]"
              />
            </div>
            <div className="px-3 py-2 text-xs text-white/70">
              {sketchfabModelUrl && (
                <a href={sketchfabModelUrl} target="_blank" rel="noreferrer" className="font-semibold text-cyan-400">
                  {sketchfabTitle}
                </a>
              )}
              {sketchfabAuthorName && sketchfabAuthorUrl && (
                <>
                  {" "}by{" "}
                  <a href={sketchfabAuthorUrl} target="_blank" rel="noreferrer" className="font-semibold text-cyan-400">
                    {sketchfabAuthorName}
                  </a>
                </>
              )}
              {" "}on{" "}
              <a href={sketchfabPlatformUrl} target="_blank" rel="noreferrer" className="font-semibold text-cyan-400">
                Sketchfab
              </a>
            </div>
          </div>
        ) : (
          <div className="h-[500px]">
            <Canvas shadows camera={{ position: [0, 1.5, 6], fov: 45, near: 0.1, far: 200 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <group>
                <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <boxGeometry args={[1.3, 0.35, 0.7]} />
                  <meshStandardMaterial color={"#e5e7eb"} />
                  <Html position={[0, 0.6, 0]} center>
                    <div className="rounded bg-black/60 px-2 py-1 text-xs ring-1 ring-white/20">Add GLB to /public/external/models/buran.glb</div>
                  </Html>
                </mesh>
              </group>
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
        )}
      </section>
    </div>
  );
}
