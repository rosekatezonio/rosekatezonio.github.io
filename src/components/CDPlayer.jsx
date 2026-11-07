import React, { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";

const TICKS = 128;
const SCALE = [110, 130.8, 146.8, 164.8, 196, 220, 261.6, 293.7, 329.6];
export const TRACKS = [
  { title: "Build Pipeline", step: 0.25, root: 1, wave: "triangle", peak: 0.22, pat: [0, 4, 2, 5, 3, 6, 4, 7, 2, 5, 3, 8, 4, 6, 2, 5] },
  { title: "Packet Loss", step: 0.2, root: 1.125, wave: "square", peak: 0.07, pat: [0, 2, 4, 2, 5, 4, 2, 0, 3, 5, 7, 5, 6, 4, 3, 1] },
  { title: "Hot Reload", step: 0.3, root: 0.89, wave: "sine", peak: 0.28, pat: [0, 3, 5, 3, 6, 5, 3, 2, 4, 7, 8, 7, 5, 4, 2, 3] },
];
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const Ctx = createContext(null);
const usePlayer = () => useContext(Ctx);

export function PlayerProvider({ children }) {
  const AC = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);
  const [playing, setPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const [track, setTrack] = useState(0);
  const [vol, setVol] = useState(0.6);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [burst, setBurst] = useState(0);
  const ctxRef = useRef(null), gainRef = useRef(null), timer = useRef(null);
  const tickRef = useRef(0), trackRef = useRef(0), playRef = useRef(false), shufRef = useRef(false), repRef = useRef(false);
  shufRef.current = shuffle; repRef.current = repeat;

  const tone = useCallback((freq, type, dur, peak, when, slide) => {
    const c = ctxRef.current, o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, when);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, when + 0.15);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(peak, when + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    o.connect(g).connect(gainRef.current);
    o.start(when); o.stop(when + dur + 0.05);
  }, []);

  const stopTimer = () => clearInterval(timer.current);
  const startTimer = useCallback(() => {
    stopTimer();
    timer.current = setInterval(() => stepRef.current(), TRACKS[trackRef.current].step * 1000);
  }, []);
  const stepRef = useRef(() => {});

  const goTo = useCallback((n) => {
    trackRef.current = n; tickRef.current = 0;
    setTrack(n); setTick(0);
    if (playRef.current) startTimer();
  }, [startTimer]);

  const randomOther = () => { let n; do n = Math.floor(Math.random() * TRACKS.length); while (n === trackRef.current && TRACKS.length > 1); return n; };
  const next = useCallback(() => goTo(shufRef.current ? randomOther() : (trackRef.current + 1) % TRACKS.length), [goTo]);
  const prev = useCallback(() => {
    if (tickRef.current * TRACKS[trackRef.current].step > 3) { tickRef.current = 0; setTick(0); return; }
    goTo((trackRef.current - 1 + TRACKS.length) % TRACKS.length);
  }, [goTo]);

  const pause = useCallback(async () => {
    stopTimer(); playRef.current = false; setPlaying(false);
    await ctxRef.current?.suspend();
  }, []);

  stepRef.current = () => {
    const tr = TRACKS[trackRef.current], i = tickRef.current;
    if (i >= TICKS) {
      if (repRef.current) { tickRef.current = 0; setTick(0); return; }
      if (shufRef.current || trackRef.current < TRACKS.length - 1) return next();
      goTo(0); return pause();
    }
    const now = ctxRef.current.currentTime + 0.02;
    if (i % 4 === 0) tone(120, "sine", 0.25, 0.8, now, 42);
    if (i % 2 === 1) tone(SCALE[tr.pat[i % 16]] * 2 * tr.root, tr.wave, 0.35, tr.peak, now);
    if (i % 16 === 0) tone(SCALE[(Math.floor(i / 16) % 3) * 2] * tr.root, "sawtooth", 3.6, 0.07, now);
    tickRef.current = i + 1; setTick(i + 1);
  };

  const toggle = async () => {
    if (!AC) return;
    if (playing) return pause();
    if (!ctxRef.current) {
      ctxRef.current = new AC();
      gainRef.current = ctxRef.current.createGain();
      gainRef.current.connect(ctxRef.current.destination);
    }
    gainRef.current.gain.value = vol * 0.5;
    await ctxRef.current.resume();
    playRef.current = true; setPlaying(true); setBurst((b) => b + 1);
    startTimer();
  };
  const seek = (v) => { tickRef.current = v; setTick(v); };

  useEffect(() => { if (gainRef.current) gainRef.current.gain.value = vol * 0.5; }, [vol]);
  useEffect(() => () => { stopTimer(); ctxRef.current?.close(); }, []);

  return (
    <Ctx.Provider value={{ AC, playing, tick, track, vol, setVol, shuffle, setShuffle, repeat, setRepeat, burst, toggle, next, prev, seek }}>
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
  const tr = TRACKS[p.track], len = TICKS * tr.step, cur = (p.tick % TICKS) * tr.step;
  const toggleBtn = (on, set, label, icon) => (
    <button type="button" onClick={() => set(!on)} aria-pressed={on} aria-label={label}
      className={`${btn} ${on ? "text-accent-400" : t.textMuted} hover:text-accent-400`}>
      {icon}{on && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent-400" />}
    </button>
  );
  return (
    <div className="w-full max-w-[26rem] self-center md:max-w-[30rem] lg:max-w-[26rem] lg:self-end text-left" aria-label="Music player">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className={`truncate font-display text-base font-bold ${t.text}`}>{tr.title}</p>
          <p className={`truncate text-xs ${t.textMuted}`} role="status" aria-live="polite">
            {!p.AC ? "Audio isn't supported in this browser" : p.playing ? "Now playing" : p.tick ? "Paused" : "Press play. Nothing autoplays."}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className={`eq ${p.playing ? "eq-on" : ""}`} aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <button type="button" onClick={() => setVolOpen((o) => !o)} aria-expanded={volOpen} aria-label="Volume" className={`${btn} lg:hidden ${volOpen ? "text-accent-400" : t.textMuted}`}>
            <I><path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7" /></I>
          </button>
        </div>
      </div>

      <input type="range" min="0" max={TICKS - 1} value={p.tick % TICKS} onChange={(e) => p.seek(+e.target.value)}
        aria-label="Track progress" aria-valuetext={`${fmt(cur)} of ${fmt(len)}`} disabled={!p.AC}
        className="cd-range mt-2 w-full" style={{ "--p": `${((p.tick % TICKS) / (TICKS - 1)) * 100}%` }} />
      <div className={`-mt-1 flex justify-between text-[11px] tabular-nums ${t.textFaint}`}><span>{fmt(cur)}</span><span>{fmt(len)}</span></div>
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