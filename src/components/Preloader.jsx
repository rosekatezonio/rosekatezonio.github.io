import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "../data.js";
import { preloadAll } from "../preload.js";

const MIN_SHOW = 1700;
const HARD_LIMIT = 30000;
const FONT_WAIT = 1200;
const SETTLE = 600;
const FADE = 900;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function Preloader({ onReady, onDone }) {
  const [phase, setPhase] = useState("loading");
  const [fontOk, setFontOk] = useState(false);
  const [shown, setShown] = useState(0);
  const target = useRef(0);
  const callbacks = useRef({ onReady, onDone });
  callbacks.current = { onReady, onDone };

  useEffect(() => {
    let alive = true;
    const reveal = () => alive && setFontOk(true);
    const timer = setTimeout(reveal, FONT_WAIT);
    const fonts = document.fonts;
    (fonts && fonts.load ? fonts.load("700 1em Archivo") : Promise.resolve()).then(reveal, reveal);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let alive = true;
    const timers = [];
    const started = Date.now();
    const track = (value) => {
      target.current = value;
    };
    Promise.race([preloadAll(track).catch(() => {}), delay(HARD_LIMIT)]).then(() => {
      if (!alive) return;
      track(100);
      const wait = Math.max(0, MIN_SHOW - (Date.now() - started)) + SETTLE;
      timers.push(
        setTimeout(() => {
          if (!alive) return;
          setPhase("leaving");
          callbacks.current.onReady();
          timers.push(
            setTimeout(() => {
              if (!alive) return;
              setPhase("gone");
              callbacks.current.onDone();
            }, FADE)
          );
        }, wait)
      );
    });
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (phase === "gone") return undefined;
    let frame;
    const tick = () => {
      setShown((current) => {
        const next = current + (target.current - current) * 0.12;
        return Math.abs(target.current - next) < 0.15 ? target.current : next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  if (phase === "gone") return null;

  const percent = Math.round(shown);
  const [first, ...rest] = PROFILE.fullName.split(" ");
  const surname = rest.pop();
  const given = [first, ...rest].join(" ");

  return (
    <div
      className="pl"
      data-phase={phase}
      data-font={fontOk ? "1" : "0"}
      role="progressbar"
      aria-label={`Loading ${PROFILE.fullName}'s portfolio`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      style={{ "--p": `${shown.toFixed(2)}%`, "--pv": (shown / 100).toFixed(4) }}
    >
      <div className="pl-inner">
        <h1 className="pl-name" aria-label={PROFILE.fullName}>
          <span className="pl-line" aria-hidden="true">
            <span className="pl-first font-display" style={{ "--d": "60ms" }}>{given}</span>
          </span>
          <span className="pl-line pl-line-giant" aria-hidden="true">
            <span className="pl-last font-display" style={{ "--d": "180ms" }}>
              <span className="pl-outline">{surname}</span>
              <span className="pl-solid">{surname}</span>
            </span>
          </span>
        </h1>
        <div className="pl-meta font-mono" aria-hidden="true">
          <span className="pl-rule"><i /></span>
          <span className="pl-pct">{String(percent).padStart(3, "0")}%</span>
        </div>
      </div>
    </div>
  );
}
