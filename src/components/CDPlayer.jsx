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
  const [atEnd, setAtEnd] = useState(false);
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
    <Ctx.Provider value={{ AC: supported && !failed, failed, playing, buffering, active: playing || buffering, started, overlayOpen, setOverlayOpen, atEnd, setAtEnd, controlsVisible, setControlsVisible, time, dur, track, vol, setVol, shuffle, setShuffle, repeat, setRepeat, burst, toggle, next, prev, seek }}>
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
  const timeLabel = `${fmt(p.time)} / ${fmt(p.dur)}`;
  const status = !p.AC ? "Audio unavailable" : p.buffering ? "Buffering" : p.playing ? `Playing · ${timeLabel}` : p.time > 0 ? `Paused · ${timeLabel}` : "Press play · no autoplay";
  return (
    <div ref={rootRef} className="w-full text-left" aria-label="Music player">
      <div className="flex items-center gap-4">
        <button type="button" onClick={p.toggle} disabled={!p.AC} aria-label={p.active ? "Pause" : "Play"}
          className="cd-stage player-cd" data-playing={p.playing}>
          <span className="cd-disc">
            <span className="cd-grooves" />
            <span className="cd-label" />
          </span>
          <span className="cd-gloss" />
          <span className="player-cd-icon" aria-hidden="true">
            {p.active
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" rx="1" /><rect x="14" y="4" width="5" height="16" rx="1" /></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z" /></svg>}
          </span>
        </button>
        <div className="min-w-0 flex-1">
          <p className={`truncate font-display text-base font-bold leading-tight tracking-tight ${t.text}`}>{tr.title}</p>
          <p className={`mt-0.5 flex items-center gap-2 truncate font-mono text-[10px] uppercase tracking-[0.14em] ${t.textMuted}`} role="status" aria-live="polite">
            <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${p.playing ? "animate-pulse bg-accent-400 motion-reduce:animate-none" : p.buffering ? "bg-accent-400/60" : "bg-neutral-500"}`} />
            <span className="truncate">{status}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <button type="button" onClick={p.prev} aria-label="Previous track" disabled={!p.AC} className={`${btn} !h-9 !w-9 ${t.textMuted} hover:text-accent-400`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z" /></svg>
          </button>
          <button type="button" onClick={p.next} aria-label="Next track" disabled={!p.AC} className={`${btn} !h-9 !w-9 ${t.textMuted} hover:text-accent-400`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l11-7z" /></svg>
          </button>
        </div>
      </div>
      <input type="range" min="0" max={max} step="0.1" value={Math.min(p.time, max)} onChange={(e) => p.seek(+e.target.value)}
        aria-label="Track progress" aria-valuetext={`${fmt(p.time)} of ${fmt(p.dur)}`} disabled={!p.AC}
        className="cd-range mt-4 w-full" style={{ "--p": `${pct}%` }} />
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
      className={`fixed bottom-4 left-1/2 z-[85] flex w-[min(26rem,calc(100vw-2rem))] -translate-x-1/2 items-center gap-2.5 rounded-full border py-1.5 pl-2 pr-1.5 shadow-lg backdrop-blur-md ${t.border} ${t.surface}`}
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
          {p.atEnd ? "End of album" : p.buffering ? "Buffering" : p.playing ? "Playing" : "Paused"}
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