import React, { useEffect, useRef } from "react";
import { EqMeter, WaveDivider } from "./CDPlayer.jsx";
import { useReveal, useOverlayClose } from "../hooks.js";
import { ArrowRight, ArrowUp, ArrowUpRight } from "../icons.jsx";

export const headline = "font-serif-read font-normal leading-[0.92] tracking-[-0.035em] text-balance";

export function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function renderDescription(description, t) {
  if (typeof description === "string") return description;
  return description.map((part, i) =>
    typeof part === "string" ? (
      <React.Fragment key={i}>{part}</React.Fragment>
    ) : (
      <span key={i} className="font-medium">
        {part.hl}
      </span>
    )
  );
}

export function SectionHeading({ eyebrow, title, subtitle, caption, icon: Icon, t }) {
  return (
    <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-14">
      <p className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest ${t.accent} mb-3`}>
        {Icon && <Icon size={13} />} {eyebrow}
      </p>
      <h2 className={`${headline} text-[3.25rem] sm:text-[5.5rem] lg:text-[8rem] ${t.text} mb-6`}>{title}</h2>
      {subtitle && <p className={`font-body text-sm sm:text-base ${t.textMuted} mx-auto`}>{subtitle}</p>}
      {caption && <p className={`font-mono text-xs ${t.textFaint} mt-3`}>{caption}</p>}
    </div>
  );
}

export function ActivityLink({ link, t, isDark }) {
  return (
    <a
      href={link.page || link.url}
      {...(link.page ? {} : { target: "_blank", rel: "noreferrer" })}
      className={`group inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b pb-1.5 font-body text-sm font-medium ${t.text} ${isDark ? "border-neutral-600" : "border-slate-300"} hover:border-accent-400 hover:text-accent-400 transition-colors`}
    >
      {link.short ? (
        <>
          <span className="sm:hidden">{link.short}</span>
          <span className="hidden sm:inline">{link.label}</span>
        </>
      ) : (
        link.label
      )}
      {link.page ? (
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      ) : (
        <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </a>
  );
}

export function BackButton({ t, onClick }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 text-sm ${t.textMuted} transition-colors hover:text-accent-400`}>
      <ArrowRight size={14} className="rotate-180" /> Back to portfolio
    </button>
  );
}

export function PageHeader({ eyebrow, EyebrowIcon, title, subtitle, t, isDark, centered = false }) {
  return (
    <>
      <header className={`mt-10 sm:mt-14 ${centered ? "text-center" : ""}`}>
        {eyebrow && (
          <p className={`mb-5 inline-flex items-center gap-2 font-mono text-xs tracking-widest ${t.accent}`}>
            {EyebrowIcon && <EyebrowIcon size={13} />} {eyebrow}
          </p>
        )}
        <h1 className={`font-serif-read text-[3.5rem] font-normal leading-[0.9] tracking-[-0.035em] sm:text-[6rem] lg:text-[8.5rem] ${centered ? "text-balance" : ""}`}>{title}</h1>
        {subtitle && <p className={`mt-6 max-w-xl text-balance text-lg leading-snug ${centered ? "mx-auto" : ""} ${t.textMuted}`}>{subtitle}</p>}
      </header>
      <div className={`mt-10 w-56 max-w-full sm:mt-14 ${centered ? "mx-auto" : ""}`}>
        <WaveDivider className="wave-short" />
      </div>
    </>
  );
}

export function SectionPanel({ t, onClose, listenEsc = true, children }) {
  const [closing, requestClose] = useOverlayClose(onClose);
  useEffect(() => {
    if (!listenEsc) return;
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose, listenEsc]);

  return (
    <div id="panel-scroll" className={`${closing ? "overlay-sink" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto no-scrollbar ${t.bg} ${t.text}`}>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-10 sm:pt-10 lg:px-12">
        <BackButton t={t} onClick={requestClose} />
        {children}
      </div>
    </div>
  );
}

export function ViewMore({ t, href, onClick, children }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      {...(href ? { href } : { type: "button", onClick })}
      className={`group inline-flex items-center gap-2 font-body text-sm font-medium ${t.textMuted} hover:text-accent-400 transition-colors`}
    >
      <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
      {children}
    </Tag>
  );
}
export function SectionLabel({ side, no, name, t, className = "" }) {
  return (
    <p className={`inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest ${t.accent} ${className}`}>
      <span>{side} / {no}</span>
      <span aria-hidden="true" className={t.textFaint}>—</span>
      <span>{name}</span>
      <EqMeter />
    </p>
  );
}

export function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]" aria-hidden="true">
      <div ref={bar} className="h-full origin-left bg-accent-400" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}