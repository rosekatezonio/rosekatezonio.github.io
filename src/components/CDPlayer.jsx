import React, { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";
import july from "../assets/music/July.mp3";
import snow from "../assets/music/Snow_on_The_Bluff.mp3";
import radiate from "../assets/music/Radiate.mp3";

export const TRACKS = [
  { title: "July", src: july },
  { title: "Snow on The Bluff", src: snow },
  { title: "Radiate", src: radiate },
];

const fmt = (s) => {
  const v = Number.isFinite(s) ? s : 0;
  return `${Math.floor(v / 60)}:${String(Math.floor(v % 60)).padStart(2, "0")}`;
};
const Ctx = createContext(null);
const usePlayer = () => useContext(Ctx);

export function PlayerProvider({ children }) {
  const supported = typeof Audio !== "undefined";
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(0.6);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [burst, setBurst] = useState(0);
  const [failed, setFailed] = useState(false);
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
    setDur(0);
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
    a.preload = "metadata";
    a.src = TRACKS[0].src;
    audio.current = a;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDur(a.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => { setFailed(true); setPlaying(false); };
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
      setBurst((b) => b + 1);
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
    <Ctx.Provider value={{ AC: supported && !failed, failed, playing, time, dur, track, vol, setVol, shuffle, setShuffle, repeat, setRepeat, burst, toggle, next, prev, seek }}>
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

export function CDDisc() {
  const { playing, burst } = usePlayer();
  return (
    <div className="cd-stage" data-playing={playing} role="img" aria-label={playing ? "Compact disc, spinning" : "Compact disc, stopped"}>
      {burst > 0 && <span key={burst} className="cd-burst" aria-hidden="true" />}
      <div className="cd-disc" aria-hidden="true">
        <div className="cd-grooves" />
        <div className="cd-label" />
        <div className="cd-hole" />
      </div>
      <div className="cd-gloss" aria-hidden="true" />
    </div>
  );
}

const I = ({ children }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const btn = "group relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-accent-400";

export function PlayerControls({ t }) {
  const p = usePlayer();
  const [volOpen, setVolOpen] = useState(false);
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
    <div className="w-full max-w-[26rem] self-center text-left max-md:max-w-none max-md:self-stretch md:max-w-[30rem] lg:max-w-[26rem] lg:self-end" aria-label="Music player">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className={`truncate font-display text-base font-bold ${t.text}`}>{tr.title}</p>
          <p className={`truncate text-xs ${t.textMuted}`} role="status" aria-live="polite">
            {!p.AC ? "Audio unavailable" : p.playing ? "Now playing" : p.time > 0 ? "Paused" : "Press play. Nothing autoplays."}
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
        aria-label="Track progress" aria-valuetext={`${fmt(p.time)} of ${fmt(p.dur)}`} disabled={!p.AC || !p.dur}
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
          <button type="button" onClick={p.toggle} disabled={!p.AC} aria-label={p.playing ? "Pause" : "Play"}
            className="mx-1 flex h-12 w-12 items-center justify-center rounded-full bg-accent-400 text-onaccent transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(182,255,46,.45)] active:scale-95 disabled:opacity-40">
            {p.playing
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