const VERSION = "v3";
const CACHE_SHELL = `space-edu-shell-${VERSION}`;
const CACHE_PAGES = `space-edu-pages-${VERSION}`;
const CACHE_STATIC = `space-edu-static-${VERSION}`;
const CACHE_MEDIA = `space-edu-media-${VERSION}`;
const OFFLINE_PAGE = "/space-edu-3d/offline.html";

const APP_SHELL_ASSETS = [
  "/space-edu-3d/",
  "/space-edu-3d/usa/",
  "/space-edu-3d/buran/",
  "/space-edu-3d/geo/",
  "/space-edu-3d/offline.html",
  "/space-edu-3d/manifest.json",
  "/space-edu-3d/globe.svg",
  "/space-edu-3d/window.svg",
  "/space-edu-3d/file.svg",
  "/space-edu-3d/icons/icon-192.png",
  "/space-edu-3d/icons/icon-512.png",
  "/space-edu-3d/video/Shuttle-launch720p.mp4",
  "/space-edu-3d/video/RocketLaunchEnergia-Buran720.mp4",
  "/space-edu-3d/video/Space%20Shuttle%20Launch%20Audio%20-%20play%20LOUD%20%28no%20music%29%20HD%201080p%20-%20indiegun%20%28720p%2C%20h264%29.mp4",
  "/space-edu-3d/video/How%20did%20the%20Space%20Shuttle%20launch%20work%20-%20Jared%20Owen%20%28720p%2C%20h264%29.mp4",
  "/space-edu-3d/image/usa-gallery/shuttle-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-2.png",
  "/space-edu-3d/image/usa-gallery/shuttle-3.png",
  "/space-edu-3d/image/usa-gallery/shuttle-4.png",
  "/space-edu-3d/image/usa-gallery/shuttle-5.png",
  "/space-edu-3d/image/usa-gallery/shuttle-6.png",
  "/space-edu-3d/image/usa-gallery/shuttle-7.png",
  "/space-edu-3d/image/usa-gallery/shuttle-8.png",
  "/space-edu-3d/image/usa-gallery/shuttle-9.png",
  "/space-edu-3d/image/usa-gallery/shuttle-10-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-11-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-12-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-13-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-14-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-15-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-16-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-17-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-18.png",
  "/space-edu-3d/models/space_shuttle_buran.glb",
  "/space-edu-3d/models/space_shuttle_atlantis.glb",
  "/space-edu-3d/models/Satelit_Satria.glb",
  "/space-edu-3d/nasa/models/space_shuttle_d.glb",
];
const MEDIA_ASSETS = APP_SHELL_ASSETS.filter((asset) =>
  asset.endsWith(".mp4") ||
  asset.endsWith(".webm") ||
  asset.endsWith(".glb") ||
  asset.endsWith(".gltf")
);
const APP_SHELL_NON_MEDIA_ASSETS = APP_SHELL_ASSETS.filter((asset) => !MEDIA_ASSETS.includes(asset));
const APP_ROUTES = ["/space-edu-3d/", "/space-edu-3d/usa/", "/space-edu-3d/buran/", "/space-edu-3d/geo/"];
const CACHE_STATUS = {
  phase: "idle",
  total: APP_SHELL_NON_MEDIA_ASSETS.length + MEDIA_ASSETS.length,
  cached: 0,
  failed: 0,
  ready: false,
  updatedAt: 0,
};

async function broadcastCacheStatus() {
  CACHE_STATUS.updatedAt = Date.now();
  const clients = await self.clients.matchAll({ includeUncontrolled: true, type: "window" });
  clients.forEach((client) => {
    client.postMessage({ type: "CACHE_STATUS", payload: CACHE_STATUS });
  });
}

async function warmRouteAssets() {
  const shellCache = await caches.open(CACHE_SHELL);
  const pageCache = await caches.open(CACHE_PAGES);
  const staticCache = await caches.open(CACHE_STATIC);
  const discovered = new Set();

  for (const route of APP_ROUTES) {
    try {
      const res = await fetch(route, { cache: "no-cache" });
      if (!res.ok) continue;

      await shellCache.put(route, res.clone());
      await pageCache.put(route, res.clone());
      const html = await res.text();

      const assetMatches = html.match(/\/space-edu-3d\/_next\/static\/[^"' )]+/g) || [];
      assetMatches.forEach((m) => discovered.add(m));
    } catch (err) {
      console.warn("Route warm-up failed:", route, err);
    }
  }

  await Promise.all(
    [...discovered].map(async (assetUrl) => {
      try {
        const assetRes = await fetch(assetUrl, { cache: "no-cache" });
        if (assetRes.ok) await staticCache.put(assetUrl, assetRes.clone());
      } catch (err) {
        console.warn("Static warm-up failed:", assetUrl, err);
      }
    })
  );
}

async function precacheAsset(cache, asset) {
  const response = await fetch(asset, { cache: "no-cache" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  if (response.status === 206) {
    const contentRange = response.headers.get("Content-Range");
    const match = contentRange ? /bytes\s+(\d+)-(\d+)\/(\d+)/i.exec(contentRange) : null;
    if (!match) throw new Error("HTTP 206 without Content-Range");

    const start = Number(match[1]);
    const end = Number(match[2]);
    const total = Number(match[3]);
    const buf = await response.arrayBuffer();
    const isCompletePayload = start === 0 && end + 1 === total && buf.byteLength === total;
    if (!isCompletePayload) throw new Error("HTTP 206 partial chunk cannot be precached");

    const headers = new Headers(response.headers);
    headers.delete("Content-Range");
    headers.set("Content-Length", String(total));
    const normalized = new Response(buf, { status: 200, statusText: "OK", headers });
    await cache.put(asset, normalized);
    return;
  }

  try {
    await cache.put(asset, response.clone());
  } catch {
    // Some servers return cache-incompatible headers for media. Rebuild a clean 200 response and retry.
    const buf = await response.arrayBuffer();
    if (!buf.byteLength) throw new Error("Empty response body cannot be cached");
    const headers = new Headers(response.headers);
    headers.delete("Content-Range");
    headers.set("Content-Length", String(buf.byteLength));
    const normalized = new Response(buf, { status: 200, statusText: "OK", headers });
    await cache.put(asset, normalized);
  }
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      CACHE_STATUS.phase = "installing";
      CACHE_STATUS.total = APP_SHELL_NON_MEDIA_ASSETS.length + MEDIA_ASSETS.length;
      CACHE_STATUS.cached = 0;
      CACHE_STATUS.failed = 0;
      CACHE_STATUS.ready = false;
      await broadcastCacheStatus();

      const shellCache = await caches.open(CACHE_SHELL);
      await Promise.all(
        APP_SHELL_NON_MEDIA_ASSETS.map(async (asset) => {
          try {
            await precacheAsset(shellCache, asset);
            CACHE_STATUS.cached += 1;
          } catch (err) {
            CACHE_STATUS.failed += 1;
            console.warn("Precache failed:", asset, err);
          } finally {
            await broadcastCacheStatus();
          }
        })
      );

      // Ensure media is also available in dedicated media cache for offline playback.
      const mediaCache = await caches.open(CACHE_MEDIA);
      await Promise.all(
        MEDIA_ASSETS.map(async (asset) => {
          try {
            await precacheAsset(mediaCache, asset);
            CACHE_STATUS.cached += 1;
          } catch (err) {
            CACHE_STATUS.failed += 1;
            console.warn("Media precache failed:", asset, err);
          } finally {
            await broadcastCacheStatus();
          }
        })
      );

      CACHE_STATUS.phase = "warming";
      await broadcastCacheStatus();
      await warmRouteAssets();

      CACHE_STATUS.phase = "ready";
      CACHE_STATUS.ready = true;
      await broadcastCacheStatus();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith("space-edu-") && !key.endsWith(VERSION))
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
      await broadcastCacheStatus();
    })()
  );
});

self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type === "GET_CACHE_STATUS" && event.source) {
    event.source.postMessage({ type: "CACHE_STATUS", payload: CACHE_STATUS });
  }
});

function isStaticRequest(request, url) {
  return (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font" ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".json")
  );
}

function isMediaRequest(request, url) {
  return (
    request.destination === "video" ||
    url.pathname.endsWith(".mp4") ||
    url.pathname.endsWith(".webm") ||
    url.pathname.endsWith(".glb") ||
    url.pathname.endsWith(".gltf")
  );
}

async function networkFirstPage(request) {
  const url = new URL(request.url);
  const pageCache = await caches.open(CACHE_PAGES);
  const shellCache = await caches.open(CACHE_SHELL);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      await pageCache.put(request, networkResponse.clone());
      await shellCache.put(url.pathname, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cachedShellRoute =
      (await shellCache.match(request, { ignoreSearch: true })) ||
      (await shellCache.match(url.pathname)) ||
      (await shellCache.match(`${url.pathname}/`));
    if (cachedShellRoute) return cachedShellRoute;

    return (await shellCache.match(OFFLINE_PAGE)) || Response.error();
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const networkResponse = await fetch(request);
  if (networkResponse && networkResponse.ok && networkResponse.status === 200) {
    await cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: true });

  const networkPromise = fetch(request)
    .then((res) => {
      if (res && res.ok && res.status === 200) {
        cache.put(request, res.clone());
      }
      return res;
    })
    .catch(() => null);

  if (cached) return cached;
  const networkResponse = await networkPromise;
  if (networkResponse) return networkResponse;
  return Response.error();
}

async function createVideoRangeResponse(request, fullResponse) {
  const rangeHeader = request.headers.get("range");
  if (!rangeHeader) return fullResponse;

  const match = /bytes=(\d+)-(\d+)?/.exec(rangeHeader);
  if (!match) return fullResponse;

  const start = Number(match[1]);
  const blob = await fullResponse.blob();
  const end = match[2] ? Number(match[2]) : blob.size - 1;
  const chunk = blob.slice(start, end + 1);

  return new Response(chunk, {
    status: 206,
    statusText: "Partial Content",
    headers: {
      "Content-Type": fullResponse.headers.get("Content-Type") || "video/mp4",
      "Content-Range": `bytes ${start}-${end}/${blob.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": String(chunk.size),
    },
  });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (isMediaRequest(request, url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_MEDIA);
        const shellCache = await caches.open(CACHE_SHELL);
        try {
          const networkResponse = await fetch(request);
          // Cache only complete successful responses, not range chunks.
          if (networkResponse && networkResponse.ok && networkResponse.status === 200) {
            await cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          const cachedMedia = await cache.match(request, { ignoreVary: true });
          const cachedShell = await shellCache.match(request, { ignoreVary: true });
          const cached = cachedMedia || cachedShell;
          if (cached) {
            if (request.headers.get("range") && request.destination === "video") {
              return createVideoRangeResponse(request, cached);
            }
            return cached;
          }
          return Response.error();
        }
      })()
    );
    return;
  }

  if (isStaticRequest(request, url)) {
    event.respondWith(staleWhileRevalidate(request, CACHE_STATIC));
    return;
  }
});
