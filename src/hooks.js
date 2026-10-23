import { useState, useEffect, useRef, useCallback } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const scrollTop = h.scrollTop || document.body.scrollTop;
        const scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
        setProgress(scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function useOverlayClose(onClose) {
  const [closing, setClosing] = useState(false);
  const saved = useRef(onClose);
  saved.current = onClose;
  const timer = useRef(null);
  const requestClose = useCallback(() => {
    if (timer.current) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      saved.current();
      return;
    }
    setClosing(true);
    timer.current = setTimeout(() => saved.current(), 620);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  return [closing, requestClose];
}
