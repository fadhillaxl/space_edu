import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ======================
  // SUBPATH CONFIG (WAJIB)
  // ======================
  basePath: "/space-edu-3d",
  assetPrefix: "/space-edu-3d/",

  // ======================
  // PRODUCTION BUILD
  // ======================
  output: "standalone",

  // ======================
  // TRAILING SLASH (BIAR CONSISTENT DENGAN APACHE)
  // ======================
  trailingSlash: true,

  // ======================
  // HEADERS (PWA + CACHE CONTROL)
  // ======================
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Service-Worker-Allowed",
            value: "/space-edu-3d",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },

  // ======================
  // OPTIONAL (DEBUG / STABILITY)
  // ======================
  reactStrictMode: true,
};

export default nextConfig;