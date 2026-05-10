"use client";

import { useEffect, useRef } from "react";

/**
 * Sends a single POST to /api/track-view when the component mounts.
 * useRef ensures it fires exactly once per page-load even under React strict mode.
 */
export function PageViewTracker({ path = "/" }: { path?: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    }).catch(() => {
      // silently ignore – never break UX for analytics
    });
  }, [path]);

  return null;
}
