"use client";

export default function VideoPlayer({ src, title }) {
  return (
    <div className="space-y-4">
      {title ? <h2 className="text-xl font-semibold text-cyan-300">{title}</h2> : null}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/80">
        <video controls playsInline className="w-full h-full min-h-[260px] bg-black" preload="metadata">
          <source src={src} type="video/mp4" />
          Your browser does not support embedded videos.
        </video>
      </div>
    </div>
  );
}
