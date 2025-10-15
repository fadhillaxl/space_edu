"use client";

import GeoScene from "@/components/GeoScene";

export default function Page() {
  return (
    <section className="grid gap-4">
      <header>
        <h1 className="text-2xl font-semibold">Modul Satelit GEO</h1>
        <p className="text-white/70">Visualisasi orbit GEO mengelilingi Bumi, anotasi dan kontrol kamera.</p>
      </header>
      <GeoScene />
      <div className="rounded-lg ring-1 ring-white/10 overflow-hidden">
        <div className="sketchfab-embed-wrapper">
          <iframe
            title="Cube Satellite"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src="https://sketchfab.com/models/416d5304009544e185f896fecb2ba76e/embed"
            className="w-full h-[500px]"
          />
        </div>
        <p className="text-sm font-normal m-2 text-white/70">
          <a
            href="https://sketchfab.com/3d-models/cube-satellite-416d5304009544e185f896fecb2ba76e?utm_medium=embed&utm_campaign=share-popup&utm_content=416d5304009544e185f896fecb2ba76e"
            target="_blank"
            rel="nofollow"
            className="font-semibold text-cyan-400"
          >
            Cube Satellite
          </a>
          {" "}by{" "}
          <a
            href="https://sketchfab.com/dr.badass2142?utm_medium=embed&utm_campaign=share-popup&utm_content=416d5304009544e185f896fecb2ba76e"
            target="_blank"
            rel="nofollow"
            className="font-semibold text-cyan-400"
          >
            Brandon Westlake
          </a>
          {" "}on{" "}
          <a
            href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=416d5304009544e185f896fecb2ba76e"
            target="_blank"
            rel="nofollow"
            className="font-semibold text-cyan-400"
          >
            Sketchfab
          </a>
        </p>
      </div>
    </section>
  );
}