import React, { useEffect } from "react";
import { useReveal, useOverlayClose } from "../hooks.js";
import { ArrowRight, ArrowUp, ArrowUpRight } from "../icons.jsx";

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
    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
      <p className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest ${t.accent} mb-3`}>
        {Icon && <Icon size={13} />} {eyebrow}
      </p>
      <h2 className={`font-display text-3xl sm:text-4xl font-bold ${t.text} mb-2`}>{title}</h2>
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

export function SectionPanel({ t, onClose, listenEsc = true, width = "max-w-6xl", children }) {
  const [closing, requestClose] = useOverlayClose(onClose);
  useEffect(() => {
    if (!listenEsc) return;
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose, listenEsc]);

  return (
    <div id="panel-scroll" className={`${closing ? "overlay-sink" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto ${t.bg} ${t.text}`}>
      <div className={`${width} mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-20`}>
        <button onClick={requestClose} className={`inline-flex items-center gap-2 text-sm ${t.textMuted} hover:text-accent-400 transition-colors`}>
          <ArrowRight size={14} className="rotate-180" /> Back to portfolio
        </button>
        <div className="mt-10">{children}</div>
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