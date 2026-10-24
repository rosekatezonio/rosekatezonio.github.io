import React, { useState, useEffect } from "react";
import { img } from "../images.js";
import { useOverlayClose } from "../hooks.js";
import { renderDescription } from "./ui.jsx";
import { SKILL_GROUPS, ALL_PROJECTS, FEATURED_TITLES, TRACK_FILTERS, trackOf, yearOf, contextOf, taglineOf, slugOf, thumbFor, galleryFor, hasLink } from "../data.js";
import { ArrowRight, ArrowUpRight, Search, X } from "../icons.jsx";

export function SkillTile({ item, t, isDark }) {
  const [broken, setBroken] = useState(false);
  const showImg = item.icon && !broken;
  return (
    <div className="flex flex-col items-center text-center gap-2.5" title={item.name}>
      <div className="relative">
        <div className={`h-14 w-14 rounded-2xl border ${t.border} ${isDark ? "bg-black/40" : "bg-slate-50"} flex items-center justify-center p-1.5 card-glow`}>
          {showImg ? (
            <div className="h-full w-full rounded-lg bg-white flex items-center justify-center p-1 shadow-sm">
              <img src={img(item.icon)} alt={item.name} onError={() => setBroken(true)} className="h-full w-full object-contain" />
            </div>
          ) : (
            <span className={`font-mono text-[11px] font-bold tracking-wider ${t.accent}`}>{item.abbr}</span>
          )}
        </div>
      </div>
      <span className={`font-body text-xs sm:text-[13px] leading-snug ${t.textMuted}`}>{item.name}</span>
    </div>
  );
}

export function SkillsArchive({ t, onClose, isDark }) {
  const [closing, requestClose] = useOverlayClose(onClose);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  return (
    <div className={`${closing ? "overlay-sink" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto ${t.bg} ${t.text}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <button onClick={requestClose} className={`inline-flex items-center gap-2 font-mono text-xs ${t.textMuted} hover:text-accent-400 transition-colors`}>
          <ArrowRight size={14} className="rotate-180" /> Back to portfolio
        </button>
        <h1 className="font-display font-bold text-4xl sm:text-6xl mt-12">Tech Stack</h1>
        <p className={`font-mono text-sm ${t.accent} mt-3`}>Everything I build, configure, and debug with.</p>

        <div className="mt-12 space-y-12">
          {SKILL_GROUPS.map((group) => (
            <section key={group.title}>
              <div className="flex items-center gap-4 mb-7">
                <h2 className={`font-mono text-xs tracking-[0.25em] uppercase ${t.textFaint}`}>{group.title}</h2>
                <span className={`h-px flex-1 border-t ${t.border}`} />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8">
                {group.items.map((item) => (
                  <SkillTile key={item.name} item={item} t={t} isDark={isDark} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, t, isDark }) {
  const featured = FEATURED_TITLES.includes(p.title);
  const thumb = p.thumbnail ? img(thumbFor(p, isDark)) : undefined;
  return (
    <li>
      <a
        href={`#${slugOf(p.title)}`}
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border ${t.border} ${t.surfaceSolid} card-glow`}
      >
        <div className={`relative aspect-[16/10] overflow-hidden border-b ${t.border} ${isDark ? "bg-neutral-950" : "bg-slate-100"}`}>
          {thumb && (
            <img
              src={thumb}
              alt={`${p.title} preview`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
          {featured && (
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">
              Featured
            </span>
          )}
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white backdrop-blur">
            {yearOf(p)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className={`font-mono text-[11px] tracking-wide ${t.accent}`}>{taglineOf(p)}</p>
          <h2 className="mt-1.5 font-display text-xl font-bold leading-snug transition-colors group-hover:text-accent-400">{p.title}</h2>
          <p className={`mt-1.5 font-mono text-[11px] ${t.textFaint}`}>
            {contextOf(p)} · {trackOf(p.title)} · {p.status}
          </p>
          <p className={`mt-4 line-clamp-2 text-sm leading-relaxed ${t.textMuted}`}>{renderDescription(p.description, t)}</p>
          <span className={`mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium ${t.text} transition-colors group-hover:text-accent-400`}>
            View project <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </li>
  );
}

const featuredRank = (p) => {
  const i = FEATURED_TITLES.indexOf(p.title);
  return i === -1 ? FEATURED_TITLES.length : i;
};

export function ProjectArchive({ t, isDark, onClose, instant }) {
  const [closing, requestClose] = useOverlayClose(onClose);
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All");
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  const q = query.trim().toLowerCase();
  const matches = (p) => {
    if (track !== "All" && trackOf(p.title) !== track && p.category !== track) return false;
    if (!q) return true;
    const hay = [p.title, p.eyebrow, p.meta, p.category, ...(p.tags || [])].filter(Boolean).join(" ").toLowerCase();
    return hay.includes(q);
  };
  const filtered = ALL_PROJECTS.filter(matches).sort((a, b) => featuredRank(a) - featuredRank(b));

  const chip = (name) => (
    <button
      key={name}
      onClick={() => setTrack(name)}
      aria-pressed={track === name}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        track === name ? `border-accent-400 ${t.accent}` : `${t.border} ${t.textMuted} hover:border-accent-400/60`
      }`}
    >
      {name}
    </button>
  );

  return (
    <div className={`${closing ? "overlay-sink" : instant ? "" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto ${t.bg} ${t.text}`}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <button onClick={requestClose} className={`inline-flex items-center gap-2 text-sm ${t.textMuted} hover:text-accent-400 transition-colors`}>
          <ArrowRight size={14} className="rotate-180" /> Back to portfolio
        </button>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-5xl">Project Log</h1>
            <p className={`text-sm sm:text-base ${t.textMuted} mt-3`}>Everything I've built, wired up, and shipped.</p>
          </div>
          <p className={`font-mono text-xs ${t.textFaint}`}>
            {filtered.length} of {ALL_PROJECTS.length} projects
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">{TRACK_FILTERS.map(chip)}</div>
          <div className={`flex items-center gap-3 border-b ${t.border} pb-2 sm:w-72`}>
            <Search size={16} className={`shrink-0 ${t.textFaint}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tools..."
              aria-label="Search projects or tools"
              className="w-full bg-transparent font-body text-sm outline-none placeholder:text-slate-400"
            />
            {query && (
              <button onClick={() => setQuery("")} className={`shrink-0 ${t.textFaint} hover:text-accent-400 transition-colors`} aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {filtered.map((p) => (
            <ProjectCard key={p.title} p={p} t={t} isDark={isDark} />
          ))}
        </ul>
        {filtered.length === 0 && (
          <p className={`mt-6 text-sm ${t.textMuted}`}>No projects match{q ? ` "${query.trim()}"` : ""}.</p>
        )}
      </div>
    </div>
  );
}

export function ProjectDetail({ t, isDark, project: p, onBack }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onBack();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);

  const gallery = galleryFor(p, isDark);
  const images = (gallery && gallery.length ? gallery : [thumbFor(p, isDark)]).filter(Boolean);
  const [slide, setSlide] = useState(0);
  const idx = ALL_PROJECTS.indexOf(p);
  const next = ALL_PROJECTS[(idx + 1) % ALL_PROJECTS.length];
  const links = [
    hasLink(p.view) && { label: /roblox\.com/.test(p.view) ? "Play on Roblox" : "Live demo", href: p.view },
    hasLink(p.github) && { label: "GitHub", href: p.github },
  ].filter(Boolean);
  const navBtn = `h-10 w-10 rounded-full border ${t.border} flex items-center justify-center transition-colors hover:border-accent-400 hover:text-accent-400 disabled:opacity-30 disabled:pointer-events-none`;

  return (
    <div className={`fixed inset-0 z-[60] overflow-y-auto ${t.bg} ${t.text}`}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <a href="#archive" className={`inline-flex items-center gap-2 text-sm ${t.textMuted} hover:text-accent-400 transition-colors`}>
          <ArrowRight size={14} className="rotate-180" /> All projects
        </a>
        <h1 className="font-display font-bold text-3xl sm:text-5xl mt-10">{p.title}</h1>
        <p className={`mt-4 text-base sm:text-lg ${t.textMuted}`}>{taglineOf(p)}</p>

        <div className={`mt-10 py-4 border-y ${t.border} flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <p className="font-medium">{contextOf(p)}</p>
            <p className={`text-sm ${t.textMuted}`}>
              {trackOf(p.title)} · {yearOf(p)}
            </p>
            {p.detail?.role && <p className={`mt-1 text-sm ${t.textFaint}`}>{p.detail.role}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-5 text-sm">
            {links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${t.textMuted} hover:text-accent-400 transition-colors`}>
                {l.label} <ArrowUpRight size={14} />
              </a>
            ))}
            {p.privateDemo && <span className={t.textFaint}>Live demo is private</span>}
          </div>
        </div>

        {images.length > 0 && (
          <>
            <div className={`mt-8 rounded-2xl border ${t.border} overflow-hidden ${t.surfaceSolid}`}>
              <img src={img(images[slide])} alt={`${p.title} screenshot ${slide + 1}`} className="w-full h-auto block" />
            </div>
            {images.length > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <span className={`font-mono text-sm ${t.textFaint}`}>
                  {slide + 1} / {images.length}
                </span>
                <div className="flex gap-2">
                  <button aria-label="Previous image" disabled={slide === 0} onClick={() => setSlide((n) => n - 1)} className={navBtn}>
                    <ArrowRight size={15} className="rotate-180" />
                  </button>
                  <button aria-label="Next image" disabled={slide === images.length - 1} onClick={() => setSlide((n) => n + 1)} className={navBtn}>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <section className="mt-12">
          <h2 className="font-display font-semibold text-lg">Overview</h2>
          <p className={`mt-3 leading-relaxed ${t.textMuted}`}>{renderDescription(p.description, t)}</p>
        </section>

        {p.detail?.problem && (
          <section className="mt-10">
            <h2 className="font-display font-semibold text-lg">The problem</h2>
            <p className={`mt-3 leading-relaxed ${t.textMuted}`}>{p.detail.problem}</p>
          </section>
        )}

        {p.detail?.approach && (
          <section className="mt-10">
            <h2 className="font-display font-semibold text-lg">Goal & approach</h2>
            <p className={`mt-3 leading-relaxed ${t.textMuted}`}>{p.detail.approach}</p>
          </section>
        )}

        {p.highlights && p.highlights.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display font-semibold text-lg">Highlights</h2>
            <ul className="mt-3 space-y-2.5">
              {p.highlights.map((h) => (
                <li key={h} className={`flex gap-3 leading-relaxed ${t.textMuted}`}>
                  <span className="mt-3 h-px w-3 shrink-0 bg-current" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-display font-semibold text-lg">Built with</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span key={tag} className={`rounded-full border ${t.border} px-3 py-1 text-sm ${t.textMuted}`}>{tag}</span>
            ))}
          </div>
        </section>

        {p.detail?.challenges?.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display font-semibold text-lg">Challenges & fixes</h2>
            <ul className={`mt-3 border-t ${t.border}`}>
              {p.detail.challenges.map((c) => (
                <li key={c.title} className={`border-b ${t.border} py-4`}>
                  <p className="font-medium">{c.title}</p>
                  <p className={`mt-1 leading-relaxed ${t.textMuted}`}>{c.fix}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(p.detail?.learned || p.detail?.next) && (
          <section className="mt-10">
            <h2 className="font-display font-semibold text-lg">Takeaways & next steps</h2>
            {p.detail.learned && (
              <p className={`mt-3 leading-relaxed ${t.textMuted}`}>
                <span className={`font-medium ${t.text}`}>Learned: </span>
                {p.detail.learned}
              </p>
            )}
            {p.detail.next && (
              <p className={`mt-3 leading-relaxed ${t.textMuted}`}>
                <span className={`font-medium ${t.text}`}>Improve next: </span>
                {p.detail.next}
              </p>
            )}
          </section>
        )}

        {next && next !== p && (
          <a href={`#${slugOf(next.title)}`} className={`group mt-14 pt-6 border-t ${t.border} flex items-center justify-between gap-4`}>
            <span className={`text-sm ${t.textFaint}`}>Next project</span>
            <span className="inline-flex items-center gap-2 font-display font-semibold group-hover:text-accent-400 transition-colors">
              {next.title} <ArrowRight size={15} />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}