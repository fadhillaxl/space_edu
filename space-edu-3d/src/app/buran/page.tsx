"use client";

import MediaShowcase from "@/components/MediaShowcase";

export default function Page() {
  return (
    <main className="p-4">
      <MediaShowcase
        title="Energia-Buran Showcase"
        description="A combined presentation with video, images, and an interactive 3D viewer."
        referenceUrl="https://www.artstation.com/artwork/LznQv"
        youtubeUrl="https://youtu.be/QESuONPI7VY"
        imageSrcs={["/globe.svg", "/window.svg", "/file.svg"]}
        sketchfabEmbedUrl="https://sketchfab.com/models/5989c13e21674dbe83cac5ceafb4165b/embed"
        sketchfabTitle="Energia - Buran"
        sketchfabModelUrl="https://sketchfab.com/3d-models/energia-buran-5989c13e21674dbe83cac5ceafb4165b?utm_medium=embed&utm_campaign=share-popup&utm_content=5989c13e21674dbe83cac5ceafb4165b"
        sketchfabAuthorName="EgirX"
        sketchfabAuthorUrl="https://sketchfab.com/EgirX?utm_medium=embed&utm_campaign=share-popup&utm_content=5989c13e21674dbe83cac5ceafb4165b"
        sketchfabPlatformUrl="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=5989c13e21674dbe83cac5ceafb4165b"
      />
    </main>
  );
}