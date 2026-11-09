import React, { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";
import july from "../assets/music/July.mp3";
import snow from "../assets/music/Snow_on_The_Bluff.mp3";
import radiate from "../assets/music/Radiate.mp3";

export const TRACKS = [
  { title: "July", src: july, duration: 214.465 },
  { title: "Snow on The Bluff", src: snow, duration: 186.122 },
  { title: "Radiate", src: radiate, duration: 178.834 },
];

const fmt = (s) => {
  const v = Number.isFinite(s) ? s : 0;
  return `${Math.floor(v / 60)}:${String(Math.floor(v % 60)).padStart(2, "0")}`;
};
const Ctx = createContext(null);
export const usePlayer = () => useContext(Ctx);

export function PlayerProvider({ children }) {
  const supported = typeof Audio !== "undefined";
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(TRACKS[0].duration);
  const [vol, setVol] = useState(0.6);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [burst, setBurst] = useState(0);
  const [failed, setFailed] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [started, setStarted] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const flowing = useRef(false);
  const audio = useRef(null);
  const trackRef = useRef(0);
  const shufRef = useRef(false);
  const repRef = useRef(false);
  shufRef.current = shuffle;
  repRef.current = repeat;

  const load = useCallback((n, autoplay) => {
    const a = audio.current;
    if (!a) return;
    trackRef.current = n;
    setTrack(n);
    setTime(0);
    setDur(TRACKS[n].duration);
    setFailed(false);
    a.src = TRACKS[n].src;
    if (autoplay) a.play().catch(() => setPlaying(false));
  }, []);

  const randomOther = () => {
    let n;
    do n = Math.floor(Math.random() * TRACKS.length);
    while (n === trackRef.current && TRACKS.length > 1);
    return n;
  };

  const next = useCallback(() => {
    const a = audio.current;
    load(shufRef.current ? randomOther() : (trackRef.current + 1) % TRACKS.length, a && !a.paused);
  }, [load]);

  const prev = useCallback(() => {
    const a = audio.current;
    if (a.currentTime > 3) {
      a.currentTime = 0;
      return;
    }
    load((trackRef.current - 1 + TRACKS.length) % TRACKS.length, !a.paused);
  }, [load]);

  useEffect(() => {
    if (!supported) return;
    const a = new Audio();
    a.preload = "none";
    a.src = TRACKS[0].src;
    audio.current = a;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => {
      if (Number.isFinite(a.duration) && a.duration > 0) setDur(a.duration);
    };
    const onPlay = () => setBuffering(true);
    const onPlaying = () => {
      if (!flowing.current) setBurst((b) => b + 1);
      flowing.current = true;
      setPlaying(true);
      setBuffering(false);
      setStarted(true);
    };
    const onPause = () => {
      flowing.current = false;
      setPlaying(false);
      setBuffering(false);
    };
    const onWait = () => {
      flowing.current = false;
      setPlaying(false);
      if (!a.paused) setBuffering(true);
    };
    const onError = () => {
      flowing.current = false;
      setFailed(true);
      setPlaying(false);
      setBuffering(false);
    };
    const onEnd = () => {
      if (repRef.current) {
        a.currentTime = 0;
        a.play().catch(() => setPlaying(false));
      } else if (shufRef.current) {
        load(randomOther(), true);
      } else if (trackRef.current < TRACKS.length - 1) {
        load(trackRef.current + 1, true);
      } else {
        load(0, false);
      }
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("durationchange", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("playing", onPlaying);
    a.addEventListener("waiting", onWait);
    a.addEventListener("stalled", onWait);
    a.addEventListener("pause", onPause);
    a.addEventListener("error", onError);
    a.addEventListener("ended", onEnd);
    return () => {
      a.pause();
      a.removeAttribute("src");
      a.load();
    };
  }, [supported, load]);

  useEffect(() => {
    if (audio.current) audio.current.volume = vol;
  }, [vol]);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      setFailed(false);
      a.play().catch(() => { setFailed(true); setPlaying(false); });
    } else {
      a.pause();
    }
  };

  const seek = (v) => {
    if (audio.current) audio.current.currentTime = v;
    setTime(v);
  };

  return (
    <Ctx.Provider value={{ AC: supported && !failed, failed, playing, buffering, active: playing || buffering, started, overlayOpen, setOverlayOpen, controlsVisible, setControlsVisible, time, dur, track, vol, setVol, shuffle, setShuffle, repeat, setRepeat, burst, toggle, next, prev, seek }}>
      {children}
    </Ctx.Provider>
  );
}

export function StereoMeter() {
  const { playing } = usePlayer();
  return (
    <span className="stereo" data-on={playing} aria-hidden="true">
      <em>L</em><i /><i /><em>R</em>
    </span>
  );
}

export function EqMeter() {
  const { playing } = usePlayer();
  return (
    <span className={`eq eq-sm ${playing ? "eq-on" : ""}`} aria-hidden="true"><i /><i /><i /><i /><i /></span>
  );
}

const WAVE = Array.from({ length: 72 }, (_, i) => 0.2 + 0.8 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17)));

export function WaveDivider({ className = "" }) {
  const { playing } = usePlayer();
  return (
    <div className={`wave ${className}`} data-on={playing} aria-hidden="true">
      {WAVE.map((h, i) => (
        <i key={i} style={{ height: `${h * 100}%`, animationDelay: `${(i % 9) * -0.15}s` }} />
      ))}
    </div>
  );
}

export function CDDisc() {
  const { AC, playing, active, burst, toggle, track, time, dur } = usePlayer();
  const pct = dur > 0 ? Math.min(1, time / dur) : 0;
  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!AC}
      className="cd-stage"
      data-playing={playing}
      aria-label={active ? "Pause track" : "Play track"}
    >
      <span className="cd-ring" style={{ "--prog": `${pct * 360}deg` }} aria-hidden="true" />
      {burst > 0 && <span key={burst} className="cd-burst" aria-hidden="true" />}
      <span key={track} className="cd-disc" aria-hidden="true">
        <span className="cd-grooves" />
        <span className="cd-label"><span>{String(track + 1).padStart(2, "0")}</span></span>
        <span className="cd-hole" />
      </span>
      <span className="cd-gloss" aria-hidden="true" />
    </button>
  );
}

const I = ({ children }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const btn = "group relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-accent-400";

export function PlayerControls({ t }) {
  const p = usePlayer();
  const [volOpen, setVolOpen] = useState(false);
  const rootRef = useRef(null);
  const { setControlsVisible } = p;
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([entry]) => setControlsVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => {
      io.disconnect();
      setControlsVisible(false);
    };
  }, [setControlsVisible]);
  const tr = TRACKS[p.track];
  const max = p.dur > 0 ? p.dur : 1;
  const pct = Math.min(100, (p.time / max) * 100);
  const toggleBtn = (on, set, label, icon) => (
    <button type="button" onClick={() => set(!on)} aria-pressed={on} aria-label={label}
      className={`${btn} ${on ? "text-accent-400" : t.textMuted} hover:text-accent-400`}>
      {icon}{on && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent-400" />}
    </button>
  );
  return (
    <div ref={rootRef} className="w-full max-w-[26rem] self-center text-left max-md:max-w-none max-md:self-stretch md:max-w-[30rem] lg:max-w-[26rem] lg:self-end" aria-label="Music player">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className={`truncate font-display text-xl font-bold leading-tight tracking-tight ${t.text}`}>
            <span className={`mr-2 font-mono text-xs font-normal tracking-widest ${t.accent}`}>{String(p.track + 1).padStart(2, "0")}</span>
            {tr.title}
          </p>
          <p className={`mt-1 flex items-center gap-2 truncate font-mono text-[11px] uppercase tracking-widest ${t.textMuted}`} role="status" aria-live="polite">
            <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${p.playing ? "animate-pulse bg-accent-400 motion-reduce:animate-none" : p.buffering ? "bg-accent-400/60" : "bg-neutral-500"}`} />
            {!p.AC ? "Audio unavailable" : p.buffering ? "Buffering" : p.playing ? "Now spinning" : p.time > 0 ? "Paused" : "Press play · no autoplay"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className={`eq ${p.playing ? "eq-on" : ""}`} aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <button type="button" onClick={() => setVolOpen((o) => !o)} aria-expanded={volOpen} aria-label="Volume" className={`${btn} lg:hidden ${volOpen ? "text-accent-400" : t.textMuted}`}>
            <I><path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7" /></I>
          </button>
        </div>
      </div>

      <input type="range" min="0" max={max} step="0.1" value={Math.min(p.time, max)} onChange={(e) => p.seek(+e.target.value)}
        aria-label="Track progress" aria-valuetext={`${fmt(p.time)} of ${fmt(p.dur)}`} disabled={!p.AC}
        className="cd-range mt-2 w-full" style={{ "--p": `${pct}%` }} />
      <div className={`-mt-1 flex justify-between text-[11px] tabular-nums ${t.textFaint}`}><span>{fmt(p.time)}</span><span>{fmt(p.dur)}</span></div>
      {volOpen && (
        <input type="range" min="0" max="1" step="0.05" value={p.vol} onChange={(e) => p.setVol(+e.target.value)}
          aria-label="Volume" className="cd-range mt-1 w-full lg:hidden" style={{ "--p": `${p.vol * 100}%` }} />
      )}

      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex w-full items-center justify-between lg:w-auto lg:justify-start">
          {toggleBtn(p.shuffle, p.setShuffle, "Shuffle", <I><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></I>)}
          <button type="button" onClick={p.prev} aria-label="Previous track" disabled={!p.AC} className={`${btn} ${t.text} hover:text-accent-400 hover:-translate-x-0.5`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z" /></svg>
          </button>
          <button type="button" onClick={p.toggle} disabled={!p.AC} aria-label={p.active ? "Pause" : "Play"}
            className="mx-1 flex h-12 w-12 items-center justify-center rounded-full bg-accent-400 text-onaccent transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(182,255,46,.45)] active:scale-95 disabled:opacity-40">
            {p.active
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" rx="1" /><rect x="14" y="4" width="5" height="16" rx="1" /></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z" /></svg>}
          </button>
          <button type="button" onClick={p.next} aria-label="Next track" disabled={!p.AC} className={`${btn} ${t.text} hover:text-accent-400 hover:translate-x-0.5`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l11-7z" /></svg>
          </button>
          {toggleBtn(p.repeat, p.setRepeat, "Repeat track", <I><path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3" /></I>)}
        </div>
        <label className="hidden min-w-[7rem] flex-1 items-center gap-2 lg:flex lg:max-w-[8rem]">
          <span className={t.textMuted}><I><path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7" /></I></span>
          <input type="range" min="0" max="1" step="0.05" value={p.vol} onChange={(e) => p.setVol(+e.target.value)}
            aria-label="Volume" className="cd-range w-full" style={{ "--p": `${p.vol * 100}%` }} />
        </label>
      </div>
    </div>
  );
}

export function MiniPlayer({ t }) {
  const p = usePlayer();
  const tr = TRACKS[p.track];
  if (!p.started || !(p.overlayOpen || !p.controlsVisible)) return null;
  const mini = `flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:text-accent-400 ${t.text}`;
  return (
    <div
      role="group"
      aria-label="Mini music player"
      className={`fixed bottom-4 left-1/2 z-[85] flex w-[min(26rem,calc(100vw-8.5rem))] -translate-x-1/2 items-center gap-2.5 rounded-full border py-1.5 pl-2 pr-1.5 shadow-lg backdrop-blur-md ${t.border} ${t.surface}`}
    >
      <span className="cd-stage mini-cd" data-playing={p.playing} aria-hidden="true">
        <span className="cd-disc">
          <span className="cd-grooves" />
          <span className="cd-label" />
          <span className="cd-hole" />
        </span>
        <span className="cd-gloss" />
      </span>
      <div className="min-w-0 flex-1">
        <p className={`truncate font-display text-sm font-bold leading-tight ${t.text}`}>{tr.title}</p>
        <p className={`truncate font-mono text-[10px] uppercase tracking-widest ${t.textMuted}`}>
          {p.buffering ? "Buffering" : p.playing ? "Playing" : "Paused"}
        </p>
      </div>
      <button type="button" onClick={p.prev} aria-label="Previous track" className={mini}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z" /></svg>
      </button>
      <button type="button" onClick={p.toggle} aria-label={p.active ? "Pause" : "Play"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-400 text-onaccent transition-transform active:scale-95">
        {p.active
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" rx="1" /><rect x="14" y="4" width="5" height="16" rx="1" /></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z" /></svg>}
      </button>
      <button type="button" onClick={p.next} aria-label="Next track" className={mini}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l11-7z" /></svg>
      </button>
    </div>
  );
}