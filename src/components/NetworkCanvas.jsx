import { useEffect, useRef } from "react";

const NODE_COUNT_BASE = 42;
const MAX_DIST = 170;
const MIN_SPEED = 6;
const MAX_SPEED = 18;

const network = { nodes: [] };

function targetCounts(width, height) {
  const area = width * height;
  return {
    dark: Math.round(Math.min(NODE_COUNT_BASE * 1.6, Math.max(22, area / 22000))),
    light: Math.round(Math.min(NODE_COUNT_BASE * 0.7, Math.max(12, area / 50000))),
  };
}

function topUpNodes(count, width, height) {
  while (network.nodes.length < count) {
    const angle = Math.random() * Math.PI * 2;
    const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    network.nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 1.6,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    });
  }
}

export function NetworkCanvas({ isDark }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDarkRef = useRef(isDark);
  const redrawRef = useRef(null);

  useEffect(() => {
    isDarkRef.current = isDark;
    redrawRef.current?.();
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;

    function visibleNodes() {
      const counts = targetCounts(width, height);
      return network.nodes.slice(0, isDarkRef.current ? counts.dark : counts.light);
    }

    function draw() {
      const dark = isDarkRef.current;
      ctx.clearRect(0, 0, width, height);

      const lineColor = dark ? "160, 160, 160" : "90, 90, 90";
      const nodeColor = dark ? "200, 200, 200" : "90, 90, 90";
      const nodes = visibleNodes();

      ctx.lineWidth = dark ? 1 : 0.75;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * (dark ? 0.75 : 0.45);
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = `rgba(${nodeColor}, ${dark ? 0.95 : 0.55})`;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, dark ? n.r : n.r * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function step(dt) {
      for (const n of network.nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0) { n.x = 0; n.vx = Math.abs(n.vx); }
        else if (n.x > width) { n.x = width; n.vx = -Math.abs(n.vx); }
        if (n.y < 0) { n.y = 0; n.vy = Math.abs(n.vy); }
        else if (n.y > height) { n.y = height; n.vy = -Math.abs(n.vy); }
      }
    }

    function tick(now) {
      const dt = Math.min((now - last) / 1000, 0.05); // cap so tab switches don't cause jumps
      last = now;
      step(dt);
      draw();
      frame = requestAnimationFrame(tick);
    }

    function resize() {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, window.screen ? window.screen.height : 0);
      if (w === width && h === height) return;
      width = w;
      height = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      topUpNodes(targetCounts(width, height).dark, width, height);
      draw();
    }

    redrawRef.current = draw;
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    if (!reduceMotion) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      redrawRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}