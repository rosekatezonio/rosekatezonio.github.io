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
  const filtered = ALL_PROJECTS.filter(matches);
  const featured = FEATURED_TITLES.map((title) => ALL_PROJECTS.find((p) => p.title === title)).filter(Boolean);
  const browsing = !q && track === "All";

  const chip = (name) => (
    <button
      key={name}
      onClick={() => setTrack(name)}
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
        track === name ? `border-accent-400 ${t.accent}` : `${t.border} ${t.textMuted} hover:border-accent-400/60`
      }`}
    >
      {name}
    </button>
  );

  const Row = ({ p }) => (
    <li className={`border-b ${t.border}`}>
      <a href={`#${slugOf(p.title)}`} className="group flex items-center gap-4 sm:gap-5 py-4 sm:py-5">
        <div className={`shrink-0 w-16 h-11 sm:w-20 sm:h-14 rounded-lg border ${t.border} overflow-hidden ${t.surfaceSolid}`}>
          {p.thumbnail && <img src={img(thumbFor(p, isDark))} alt="" loading="lazy" className="h-full w-full object-cover" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display font-semibold group-hover:text-accent-400 transition-colors">{p.title}</span>
            {FEATURED_TITLES.includes(p.title) && (
              <span className={`rounded-full border border-accent-400 px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase ${t.accent}`}>Featured</span>
            )}
          </div>
          <p className={`text-sm ${t.textMuted} mt-1 leading-snug`}>{taglineOf(p)}</p>
          <p className={`text-xs font-mono ${t.textFaint} mt-2`}>
            {contextOf(p)} · {trackOf(p.title)} · {yearOf(p)} · {p.status}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(p.tags || []).slice(0, 4).map((tag) => (
              <span key={tag} className={`rounded-full border ${t.border} px-2 py-0.5 text-[11px] ${t.textFaint}`}>{tag}</span>
            ))}
          </div>
        </div>
        <span className={`hidden sm:block shrink-0 text-sm ${t.textFaint}`}>{trackOf(p.title)}</span>
      </a>
    </li>
  );

  return (
    <div className={`${closing ? "overlay-sink" : instant ? "" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto ${t.bg} ${t.text}`}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <button onClick={requestClose} className={`inline-flex items-center gap-2 text-sm ${t.textMuted} hover:text-accent-400 transition-colors`}>
          <ArrowRight size={14} className="rotate-180" /> Back to portfolio
        </button>
        <h1 className="font-display font-bold text-3xl sm:text-5xl mt-10">Project Log</h1>
        <p className={`text-sm sm:text-base ${t.textMuted} mt-3`}>Everything I've built, wired up, and shipped.</p>

        <div className={`mt-8 flex items-center gap-3 border-b ${t.border} pb-3`}>
          <Search size={16} className={`shrink-0 ${t.textFaint}`} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or tools..."
            className="w-full bg-transparent font-body text-sm outline-none placeholder:text-slate-400"
          />
          {query && (
            <button onClick={() => setQuery("")} className={`shrink-0 ${t.textFaint} hover:text-accent-400 transition-colors`} aria-label="Clear search">
              <X size={15} />
            </button>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{TRACK_FILTERS.map(chip)}</div>

        {browsing && featured.length > 0 && (
          <section className="mt-10">
            <p className={`font-mono text-[11px] tracking-[0.2em] uppercase ${t.accent}`}>Featured</p>
            <ul className={`mt-3 border-t ${t.border}`}>{featured.map((p) => <Row key={p.title} p={p} />)}</ul>
          </section>
        )}

        <ul className={`mt-10 border-t ${t.border}`}>
          {filtered.filter((p) => !(browsing && FEATURED_TITLES.includes(p.title))).map((p) => <Row key={p.title} p={p} />)}
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
