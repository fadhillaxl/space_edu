"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFModelSuspense } from "@/components/Model";

type Props = {
  title: string;
  description?: string;
  referenceUrl?: string;
  videoSrc?: string; // e.g. /external/videos/buran.mp4
  youtubeUrl?: string; // e.g. https://youtu.be/VIDEO_ID or https://www.youtube.com/watch?v=VIDEO_ID
  imageSrcs?: string[]; // e.g. ["/images/one.jpg", ...]
  modelUrl?: string; // e.g. /external/models/buran.glb
  sketchfabEmbedUrl?: string; // e.g. https://sketchfab.com/models/.../embed
  sketchfabTitle?: string;
  sketchfabModelUrl?: string;
  sketchfabAuthorName?: string;
  sketchfabAuthorUrl?: string;
  sketchfabPlatformUrl?: string;
};

export default function MediaShowcase({ title, description, referenceUrl, videoSrc, youtubeUrl, imageSrcs = [], modelUrl, sketchfabEmbedUrl, sketchfabTitle = "Sketchfab Model", sketchfabModelUrl, sketchfabAuthorName, sketchfabAuthorUrl, sketchfabPlatformUrl = "https://sketchfab.com" }: Props) {
  const getYouTubeEmbed = (url?: string) => {
    if (!url) return undefined;
    try {
      const u = new URL(url);
      // If already an embed URL
      if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/embed/")) return url;
      // Short youtu.be/<id>
      if (u.hostname === "youtu.be" && u.pathname.length > 1) {
        const id = u.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}`;
      }
      // youtube.com/watch?v=<id>
      if (u.hostname.includes("youtube.com")) {
        const id = u.searchParams.get("v");
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const youtubeEmbed = getYouTubeEmbed(youtubeUrl);
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
            {youtubeEmbed ? (
              <div className="aspect-video w-full">
                <iframe
                  title="YouTube Video"
                  src={youtubeEmbed}
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="w-full h-full rounded"
                />
              </div>
            ) : videoSrc ? (
              <video src={videoSrc} controls className="w-full rounded" poster="/globe.svg" />
            ) : (
              <div className="h-48 flex items-center justify-center text-white/60">Provide youtubeUrl or place video at /public/external/videos/buran.mp4</div>
            )}
          </div>
        </section>

        <section className="rounded-lg ring-1 ring-white/10 overflow-hidden">
          <div className="p-2 border-b border-white/10 text-sm">Images</div>
          <div className="grid grid-cols-3 gap-3 p-3">
            {(imageSrcs.length ? imageSrcs : ["/globe.svg", "/window.svg", "/file.svg"]).map((src, i) => (
              <img key={i} src={src} alt={`image-${i}`} className="rounded ring-1 ring-white/10" />
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-lg ring-1 ring-white/10 overflow-hidden">
        <div className="p-2 border-b border-white/10 text-sm">3D Viewer</div>
        {sketchfabEmbedUrl ? (
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
            <Canvas camera={{ position: [4, 3, 6], fov: 50 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <group>
                {modelUrl ? (
                  <GLTFModelSuspense url={modelUrl} scale={0.28} position={[0, -1.6, 0]} />
                ) : (
                  <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <boxGeometry args={[1.3, 0.35, 0.7]} />
                    <meshStandardMaterial color={"#e5e7eb"} />
                    <Html position={[0, 0.6, 0]} center>
                      <div className="rounded bg-black/60 px-2 py-1 text-xs ring-1 ring-white/20">Add GLB to /public/external/models/buran.glb</div>
                    </Html>
                  </mesh>
                )}
              </group>
              <OrbitControls enablePan enableZoom enableRotate />
            </Canvas>
          </div>
        )}
      </section>
    </div>
  );
}