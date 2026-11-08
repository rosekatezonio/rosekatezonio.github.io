import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PortfolioImage } from "../images.jsx";
import { yearOf, taglineOf, thumbFor, hasLink } from "../data.js";
import { ArrowRight, ArrowUpRight } from "../icons.jsx";

const TAGLINES = {
  "Salo Sa Antipolo": "A restaurant point-of-sale web app built on Firebase.",
  "Home Network Device Monitor": "A single-file Python monitor that shows who is on your WiFi.",
};

const CORNERS = ["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"];

export function ProjectShowcase({ t, isDark, item, icon: FallbackIcon, onOpenProject }) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
  }, [item.title]);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e) => e.key === "Escape" && setZoomed(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoomed]);

  const thumb = item.thumbnail ? thumbFor(item, isDark) : null;
  const tagline = item.tagline || TAGLINES[item.title] || taglineOf(item);
  const underlineLink = `inline-flex items-center gap-1.5 border-b pb-1 font-body text-sm font-semibold ${t.text} ${
    isDark ? "border-neutral-600" : "border-slate-300"
  } hover:border-accent-400 hover:text-accent-400 transition-colors`;

  return (
    <div>
      <div className="grid items-center gap-x-14 gap-y-8 lg:grid-cols-[1.08fr_1fr]">
        <div key={`frame-${item.title}`} className="bento-swap-in">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <span className="font-body text-sm font-semibold text-accent-400">{item.title}</span>
            <span className={`font-mono text-xs ${t.textFaint}`}>{yearOf(item)}</span>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => thumb && setZoomed(true)}
              aria-label={`Zoom into ${item.title} preview`}
              className={`group relative block aspect-[16/10] w-full ${thumb ? "cursor-zoom-in" : "cursor-default"} overflow-hidden border border-accent-400 ${t.surface}`}
            >
              {thumb ? (
                <PortfolioImage
                  imageKey={thumb}
                  alt={`${item.title} preview`}
                  fallbackLabel={item.title}
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              ) : (
                <span className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-accent-400/10 ${t.accent}`}>
                  {FallbackIcon && <FallbackIcon size={40} />}
                  <span className="font-mono text-xs uppercase tracking-widest">{item.eyebrow}</span>
                </span>
              )}
            </button>
            {CORNERS.map((pos) => (
              <span key={pos} aria-hidden="true" className={`pointer-events-none absolute h-2 w-2 bg-accent-400 ${pos}`} />
            ))}
          </div>
        </div>

        <div key={`info-${item.title}`} className="bento-swap-in min-w-0">
          <p className={`font-mono text-[11px] uppercase tracking-[0.2em] sm:text-xs ${t.textFaint}`}>{item.eyebrow}</p>
          <h3 className="mt-4 font-serif-read font-normal text-[2rem] leading-[1.05] tracking-[-0.025em] sm:text-5xl">
            <span className={t.text}>{item.title}.</span> <span className={t.textFaint}>{tagline}</span>
          </h3>

          <ul className="mt-6 space-y-3">
            {item.highlights.slice(0, 3).map((line) => (
              <li key={line} className={`flex items-start gap-3.5 font-body text-[15px] leading-relaxed sm:text-base ${t.text}`}>
                <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-accent-400" />
                <span className="copy-justify min-w-0 flex-1">{line}</span>
              </li>
            ))}
          </ul>

          <ul className={`mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs ${t.textMuted}`}>
            {item.tags.map((tag) => (
              <React.Fragment key={tag}>
                <li>{tag}</li>
                <li aria-hidden="true">·</li>
              </React.Fragment>
            ))}
            <li className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              {item.status || "Completed"}
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <button
              type="button"
              onClick={() => onOpenProject(item.title)}
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent-400 px-7 font-body text-sm font-semibold text-onaccent transition-[filter] hover:brightness-110"
            >
              View project <ArrowRight size={15} />
            </button>
            {hasLink(item.github) && (
              <a href={item.github} target="_blank" rel="noreferrer" className={underlineLink}>
                GitHub <ArrowUpRight size={14} />
              </a>
            )}
            {hasLink(item.view) && (
              <a href={item.view} target="_blank" rel="noreferrer" className={underlineLink}>
                Live demo <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      {zoomed &&
        thumb &&
        createPortal(
          <div
            role="dialog"
            aria-label={`${item.title} preview`}
            onClick={() => setZoomed(false)}
            className="bento-swap-in fixed inset-0 z-[65] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10"
          >
            <PortfolioImage
              imageKey={thumb}
              alt={`${item.title} preview`}
              fallbackLabel={item.title}
              className="max-h-full max-w-full border border-accent-400 object-contain"
            />
            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
              Click or press esc to zoom out
            </span>
          </div>,
          document.body
        )}
    </div>
  );
}