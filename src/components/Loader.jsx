import React, { useEffect, useRef, useState } from "react";
import { preloadSite } from "../preload.js";

const MIN_MS_FIRST_VISIT = 1500; // long enough for the counter to read as intentional
const MIN_MS_REPEAT_VISIT = 500; // images are cached by then, so keep it quick
const MAX_MS = 12000; // never trap a visitor on a slow connection
const SEEN_KEY = "rk-loader-seen";

const seenBefore = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

/**
 * Full-screen preloader. It downloads and decodes the site's images (and fonts) while it
 * covers the page, calls onLoaded() once everything is ready, then lifts like a curtain
 * when `exiting` becomes true and calls onExited() when the curtain has gone.
 */
export function Loader({ exiting, onLoaded, onExited }) {
  const [pct, setPct] = useState(0);
  const [info, setInfo] = useState({ label: "Warming up", loaded: 0, total: 0 });
  const real = useRef(0);
  const onLoadedRef = useRef(onLoaded);
  onLoadedRef.current = onLoaded;

  useEffect(() => {
    let alive = true;
    const minMs = seenBefore() ? MIN_MS_REPEAT_VISIT : MIN_MS_FIRST_VISIT;
    const startedAt = performance.now();
    let shown = 0;
    let raf = 0;
    let called = false;

    preloadSite((state) => {
      if (!alive) return;
      real.current = state.pct;
      setInfo({ label: state.label, loaded: state.loaded, total: state.total });
    })
      .catch(() => {})
      .then(() => {
        real.current = 100;
      });
    const hardStop = setTimeout(() => {
      real.current = 100;
    }, MAX_MS);

    // The number eases toward the real progress, and can't reach 100 before minMs has passed.
    const tick = (now) => {
      if (!alive) return;
      const timeCap = Math.min(1, (now - startedAt) / minMs) * 100;
      const target = Math.min(real.current, timeCap);
      shown += (target - shown) * 0.14;
      if (target - shown < 0.3) shown = target;
      setPct(shown);
      if (shown >= 99.9 && real.current >= 100 && !called) {
        called = true;
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        onLoadedRef.current();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      clearTimeout(hardStop);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!exiting) return undefined;
    try {
      performance.mark("loader-exit");
    } catch {}
    const id = setTimeout(() => onExited(), 950);
    return () => clearTimeout(id);
  }, [exiting, onExited]);

  const value = Math.round(pct);
  const status = info.total && value < 100 ? `${info.label} · ${info.loaded} / ${info.total}` : info.label;

  return (
    <div
      className="loader-root"
      data-exit={exiting ? "true" : "false"}
      role="progressbar"
      aria-label="Loading portfolio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <div className="loader-inner">
        <div className="loader-stack">
          <p className="loader-name">
            <span className="loader-first">Rose Kate</span> <span className="loader-surname">Zonio</span>
          </p>
          <div className="loader-track" aria-hidden="true">
            <span style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
          <div className="loader-meta" aria-hidden="true">
            <span>{status}</span>
            <span className="tabular-nums">{value}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}