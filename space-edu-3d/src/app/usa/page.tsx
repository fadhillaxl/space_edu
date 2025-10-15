"use client";

import MediaShowcase from "@/components/MediaShowcase";

export default function Page() {
  return (
    <main className="p-4">
      <MediaShowcase
        title="USA Shuttle Showcase"
        description="Video, images, and Sketchfab viewer for Space Shuttle Atlantis."
        youtubeUrl="https://www.youtube.com/embed/uuYoYl5kyVE?si=-DNIeFHh_TSVf1Pm"
        imageSrcs={["/globe.svg", "/window.svg", "/file.svg"]}
        sketchfabEmbedUrl="https://sketchfab.com/models/2f04130e3c78439d9765b5ac71b333d2/embed"
        sketchfabTitle="Space Shuttle Atlantis"
        sketchfabModelUrl="https://sketchfab.com/3d-models/space-shuttle-atlantis-2f04130e3c78439d9765b5ac71b333d2?utm_medium=embed&utm_campaign=share-popup&utm_content=2f04130e3c78439d9765b5ac71b333d2"
        sketchfabAuthorName="paburoviii"
        sketchfabAuthorUrl="https://sketchfab.com/paburoviii?utm_medium=embed&utm_campaign=share-popup&utm_content=2f04130e3c78439d9765b5ac71b333d2"
        sketchfabPlatformUrl="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=2f04130e3c78439d9765b5ac71b333d2"
      />
    </main>
  );
}