"use client";

import MediaShowcase from "@/components/MediaShowcase";

export default function Page() {
  return (
    <main className="p-4">
      <MediaShowcase
        title="Energia-Buran Showcase"
        description="A combined presentation with video, images, and an interactive 3D viewer."
        referenceUrl="https://www.artstation.com/artwork/LznQv"
        videoSrc="/space-edu-3d/video/RocketLaunchEnergia-Buran720.mp4"
        imageSrcs={["/space-edu-3d/globe.svg", "/space-edu-3d/window.svg", "/space-edu-3d/file.svg"]}
        modelUrl="/space-edu-3d/models/space_shuttle_buran.glb"
      />
    </main>
  );
}
