"use client";

import { useEffect, useMemo, useState } from "react";

type CacheStatus = {
  phase: "idle" | "installing" | "warming" | "ready";
  total: number;
  cached: number;
  failed: number;
  ready: boolean;
  updatedAt: number;
};

const initialStatus: CacheStatus = {
  phase: "idle",
  total: 0,
  cached: 0,
  failed: 0,
  ready: false,
  updatedAt: 0,
};

export default function RegisterSW() {
  const [cacheStatus, setCacheStatus] = useState<CacheStatus>(initialStatus);

  const statusLabel = useMemo(() => {
    if (cacheStatus.phase === "installing") {
      return `Caching ${cacheStatus.cached}/${cacheStatus.total || 0}`;
    }
    if (cacheStatus.phase === "warming") {
      return "Finalizing offline cache...";
    }
    if (cacheStatus.ready) {
      return cacheStatus.failed > 0
        ? `Offline ready (${cacheStatus.failed} failed)`
        : "Offline ready";
    }
    return "Offline cache idle";
  }, [cacheStatus]);

  const statusClass = useMemo(() => {
    if (cacheStatus.ready && cacheStatus.failed === 0) return "bg-emerald-950/70 text-emerald-200 border-emerald-700/60";
    if (cacheStatus.phase === "installing" || cacheStatus.phase === "warming") return "bg-amber-950/70 text-amber-200 border-amber-700/60";
    if (cacheStatus.ready && cacheStatus.failed > 0) return "bg-yellow-950/70 text-yellow-200 border-yellow-700/60";
    return "bg-slate-900/70 text-slate-200 border-slate-700/60";
  }, [cacheStatus]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const swUrl = "/space-edu-3d/sw.js?v=7";
      const onSwMessage = (event: MessageEvent) => {
        const data = event.data as { type?: string; payload?: CacheStatus };
        if (data?.type === "CACHE_STATUS" && data.payload) {
          setCacheStatus(data.payload);
        }
      };

      navigator.serviceWorker.addEventListener("message", onSwMessage);

      const requestStatus = () => {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ type: "GET_CACHE_STATUS" });
        }
      };

      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register(swUrl, { scope: "/space-edu-3d/" })
          .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope);
            registration.update().catch(() => {});
            requestStatus();
          })
          .catch((error) => {
            console.warn("Service Worker registration failed:", error);
          });
      });

      // Handle controller changes (e.g. reload on manual update)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        // Silent update for now, just log it. 
        // More complex logic could prompt the user with a Toast.
        console.log("New Service Worker activated.");
        requestStatus();
      });

      const poll = window.setInterval(requestStatus, 3000);
      requestStatus();

      return () => {
        window.clearInterval(poll);
        navigator.serviceWorker.removeEventListener("message", onSwMessage);
      };
    }
  }, []);

  return (
    <div className="fixed bottom-3 right-3 z-50 pointer-events-none">
      <div className={`rounded-md border px-3 py-1 text-xs font-medium shadow-lg backdrop-blur ${statusClass}`}>
        {statusLabel}
      </div>
    </div>
  );
}
