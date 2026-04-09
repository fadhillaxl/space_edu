"use client";

import MediaShowcase from "@/components/MediaShowcase";

export default function Page() {
  return (
    <main className="p-4">
      <MediaShowcase
        title="USA Shuttle Showcase"
        description="Video, images, and interactive 3D viewer for Space Shuttle Atlantis."
        videoSrc="/space-edu-3d/video/Shuttle-launch720p.mp4"
        imageSrcs={["/space-edu-3d/globe.svg", "/space-edu-3d/window.svg", "/space-edu-3d/file.svg"]}
        modelUrl="/space-edu-3d/models/space_shuttle_atlantis.glb"
      />
    </main>
  );
}
