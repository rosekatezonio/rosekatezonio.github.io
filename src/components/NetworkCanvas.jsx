import { useEffect, useRef } from "react";

export function NetworkCanvas({ isDark }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");

    const NODE_COUNT_BASE = 42;
    const MAX_DIST = 170;

    let width = 0;
    let height = 0;
    let nodes = [];

    function seeded(seed) {
      let a = seed;
      return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function draw() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const lineColor = isDark ? "160, 160, 160" : "90, 90, 90";
      const nodeColor = isDark ? "200, 200, 200" : "90, 90, 90";

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * (isDark ? 0.75 : 0.45);
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = isDark ? 1 : 0.75;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, isDark ? n.r : n.r * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${isDark ? 0.95 : 0.55})`;
        ctx.fill();
      }
    }

    function build(nextWidth, nextHeight) {
      width = nextWidth;
      height = nextHeight;
      const rand = seeded(isDark ? 7919 : 104729);
      const count = isDark
        ? Math.round(Math.min(NODE_COUNT_BASE * 1.6, Math.max(22, (width * height) / 22000)))
        : Math.round(Math.min(NODE_COUNT_BASE * 0.7, Math.max(12, (width * height) / 50000)));
      nodes = Array.from({ length: count }, () => ({
        x: rand() * width,
        y: rand() * height,
        r: rand() * 1.4 + 1.6,
      }));
      draw();
    }

    function measure() {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, window.screen ? window.screen.height : 0);
      return { w, h };
    }

    const first = measure();
    build(first.w, first.h);

    const ro = new ResizeObserver(() => {
      const next = measure();
      if (next.w !== width || next.h > height) build(next.w, next.h);
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
    };
  }, [isDark]);

  return (
    <div ref={containerRef} aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
