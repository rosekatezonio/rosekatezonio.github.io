import React, { useState, useEffect } from "react";
import { img, PortfolioImage } from "../images.jsx";
import { useOverlayClose } from "../hooks.js";
import { renderDescription, BackButton } from "./ui.jsx";
import { SKILL_GROUPS, ALL_PROJECTS, FEATURED_TITLES, TRACK_FILTERS, trackOf, yearOf, contextOf, taglineOf, slugOf, thumbFor, galleryFor, hasLink } from "../data.js";
import { ArrowRight, ArrowUpRight, ArrowDown, Search, X } from "../icons.jsx";

export function SkillTile({ item, t, isDark }) {
  const [broken, setBroken] = useState(false);
  const showImg = img(item.icon) && !broken;
  return (
    <div className="flex flex-col items-center text-center gap-2.5" title={item.name}>
      <div className={`h-16 w-16 rounded-2xl border ${t.border} ${isDark ? "bg-black/40" : "bg-slate-50"} flex items-center justify-center p-1.5 card-glow`}>
        {showImg ? (
          <div className="h-full w-full rounded-lg bg-white flex items-center justify-center p-1.5 shadow-sm">
            <img src={img(item.icon)} alt={item.name} onError={() => setBroken(true)} className="h-full w-full object-contain" />
          </div>
        ) : (
          <span className={`font-mono text-xs font-bold tracking-wider ${t.accent}`}>{item.abbr}</span>
        )}
      </div>
      <span className={`font-body text-sm leading-snug ${t.text}`}>{item.name}</span>
    </div>
  );
}

// Small logo box that falls back to a text abbreviation if the image can't load.
function CompactIcon({ src, abbr, t, isDark }) {
  const [broken, setBroken] = useState(false);
  const box = `h-7 min-w-7 rounded-md border ${t.border} ${isDark ? "bg-black/40" : "bg-slate-50"} flex items-center justify-center`;
  if (!img(src) || broken) {
    return <span className={`${box} px-1 font-mono text-[9px] font-bold ${t.accent}`}>{abbr}</span>;
  }
  return (
    <span className={`${box} w-7 p-1`}>
      <span className="h-full w-full rounded bg-white flex items-center justify-center p-0.5">
        <img src={img(src)} alt="" onError={() => setBroken(true)} className="h-full w-full object-contain" />
      </span>
    </span>
  );
}

// Quieter row for secondary tools: small logo(s), name, and an optional note on what it was actually used for.
function CompactSkill({ item, t, isDark }) {
  const icons = item.icons || [item.icon];
  const abbr = item.abbr || "AI";
  return (
    <li className="flex items-start gap-3 min-w-0">
      <div className="flex shrink-0 -space-x-1.5 pt-0.5">
        {icons.map((ic, i) => (
          <CompactIcon key={i} src={ic} abbr={abbr} t={t} isDark={isDark} />
        ))}
      </div>
      <div className="min-w-0">
        <p className={`font-body text-sm leading-snug ${t.text}`}>{item.name}</p>
        {item.note && <p className={`font-body text-xs leading-snug mt-0.5 ${t.textFaint}`}>{item.note}</p>}
      </div>
    </li>
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
    <div className={`${closing ? "overlay-sink" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto no-scrollbar ${t.bg} ${t.text}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-10 sm:py-14">
        <BackButton t={t} onClick={requestClose} />
        <h1 className="font-display font-bold text-4xl sm:text-6xl mt-12">Full Toolkit</h1>
        <p className={`font-mono text-sm ${t.accent} mt-3`}>Grouped by what each tool lets me do.</p>

        <div className="mt-14 space-y-14">
          {SKILL_GROUPS.map((group) => (
            <section key={group.title}>
              <div className="flex items-center gap-4">
                <h2 className={`font-mono text-xs tracking-[0.25em] uppercase ${t.textFaint}`}>{group.num} — {group.title}</h2>
                <span className={`h-px flex-1 border-t ${t.border}`} />
              </div>
              {group.blurb && <p className={`font-body text-sm ${t.textMuted} mt-2 mb-8`}>{group.blurb}</p>}
              {group.compact ? (
                <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <CompactSkill key={item.name} item={item} t={t} isDark={isDark} />
                  ))}
                </ul>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] gap-x-4 gap-y-9">
                  {group.items.map((item) => (
                    <SkillTile key={item.name} item={item} t={t} isDark={isDark} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

// Gallery screenshots only need to fill a ~768px column (up to ~2x for sharp screens),
// so ask Cloudinary for a capped width instead of the full-size original.
const galleryUrl = (key) => {
  const u = img(key);
  if (!u || !/res\.cloudinary\.com/.test(u) || /\/upload\/[^/]*w_\d/.test(u)) return u;
  return u.replace("/upload/", "/upload/w_1400,c_limit/");
};

function ProjectCard({ p, t, isDark }) {
  const featured = FEATURED_TITLES.includes(p.title);
  const thumb = p.thumbnail ? img(thumbFor(p, isDark)) : undefined;
  return (
    <li className={`min-w-0 border-t first:border-t-0 ${t.border}`}>
      <a
        href={`#${slugOf(p.title)}`}
        className="group flex items-center gap-3.5 px-3.5 py-3 transition-colors hover:bg-accent-400/5"
      >
        <div className={`h-12 w-[4.25rem] shrink-0 overflow-hidden rounded-md border ${t.border} sm:h-14 sm:w-24 ${isDark ? "bg-neutral-950" : "bg-slate-100"}`}>
          <PortfolioImage
            src={thumb}
            alt={`${p.title} preview`}
            fallbackLabel={p.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate font-display text-[15px] font-bold leading-tight transition-colors group-hover:text-accent-400 sm:text-base">{p.title}</h2>
            {featured && (
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-accent-400">
                <span aria-hidden="true" className="sm:hidden">●</span>
                <span className="hidden sm:inline">Featured</span>
                <span className="sr-only sm:hidden">Featured</span>
              </span>
            )}
          </div>
          <p className={`mt-1 truncate text-[13px] ${t.textMuted}`}>
            <span className={`font-mono text-xs ${t.textFaint}`}>{monthYearOf(p)}</span>
            <span className={t.textFaint}> · </span>
            {renderDescription(p.description, t)}
          </p>
        </div>
        <ArrowRight size={16} className={`shrink-0 ${t.textFaint} transition-all group-hover:translate-x-0.5 group-hover:text-accent-400`} />
      </a>
    </li>
  );
}

const featuredRank = (p) => {
  const i = FEATURED_TITLES.indexOf(p.title);
  return i === -1 ? FEATURED_TITLES.length : i;
};

const monthYearOf = (p) => {
  const m = (p.meta || "").match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2}/);
  return m ? m[0] : yearOf(p);
};

const SORT_OPTIONS = [
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// Year + month as one number. A project that only lists a year counts as late in that year.
const dateKeyOf = (p) => {
  const m = (p.meta || "").match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(20\d{2})/i);
  if (m) return parseInt(m[2], 10) * 12 + MONTHS.indexOf(m[1].toLowerCase());
  return (parseInt(yearOf(p), 10) || 0) * 12 + 11;
};

const sortProjects = (list, mode) =>
  [...list].sort((a, b) => {
    if (mode === "az") return a.title.localeCompare(b.title, undefined, { sensitivity: "base", numeric: true });
    if (mode === "za") return b.title.localeCompare(a.title, undefined, { sensitivity: "base", numeric: true });
    const diff = mode === "oldest" ? dateKeyOf(a) - dateKeyOf(b) : dateKeyOf(b) - dateKeyOf(a);
    return diff || featuredRank(a) - featuredRank(b);
  });

function SortSelect({ value, onChange, t, isDark, className = "" }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort projects"
        className={`h-10 appearance-none rounded-lg border ${t.border} bg-transparent pl-3 pr-8 text-sm font-medium ${t.text} ${isDark ? "[color-scheme:dark]" : "[color-scheme:light]"} outline-none cursor-pointer hover:border-accent-400/60 hover:text-accent-400 focus-visible:border-accent-400/60 transition-colors`}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value} className={`${t.surfaceSolid} ${t.text}`}>{o.label}</option>
        ))}
      </select>
      <ArrowDown size={13} className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${t.textMuted}`} />
    </div>
  );
}

// Laptop-and-up layout (lg+): an index on the left, a sticky preview of the selected project on the right.
// Clicking a row only selects it; "View project" is the one way into the full project.
// Mobile and tablet keep the original single-column list rendered by ProjectArchive.
function ProjectLogDesktop({ t, isDark, sorted, total, query, setQuery, track, setTrack, sort, setSort, onClose }) {
  const [activeTitle, setActiveTitle] = useState(null);
  const active = sorted.find((p) => p.title === activeTitle) || sorted[0];
  const activeThumb = active && active.thumbnail ? img(thumbFor(active, isDark)) : undefined;

  return (
    <div className="hidden lg:block max-w-7xl mx-auto px-12 py-10">
      <BackButton t={t} onClick={onClose} />

      <div className="mt-8 grid grid-cols-12 gap-x-14 items-start">
        {/* Left: heading, search, filters, index */}
        <div className="col-span-5">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="font-display font-bold text-5xl leading-none">Project Log</h1>
            <p className={`shrink-0 font-mono text-xs ${t.textFaint}`}>{sorted.length} of {total} projects</p>
          </div>
          <p className={`mt-3 text-[15px] ${t.textMuted}`}>Everything I've built, wired up, and shipped.</p>

          <div className={`mt-7 flex items-center gap-2.5 rounded-lg border ${t.border} ${t.surfaceSolid} px-3.5 py-2.5 focus-within:border-accent-400/60 transition-colors`}>
            <Search size={15} className={`shrink-0 ${t.textFaint}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects"
              className="w-full min-w-0 bg-transparent font-body text-[15px] outline-none placeholder:text-slate-400"
            />
            {query && (
              <button onClick={() => setQuery("")} className={`shrink-0 ${t.textFaint} hover:text-accent-400 transition-colors`} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2" role="tablist" aria-label="Filter projects">
            {TRACK_FILTERS.map((name) => (
              <button
                key={name}
                role="tab"
                aria-selected={track === name}
                onClick={() => setTrack(name)}
                className={`text-[15px] font-medium underline underline-offset-8 decoration-1 transition-colors ${
                  track === name
                    ? `${t.text} decoration-accent-400 decoration-2`
                    : `${t.textMuted} decoration-transparent hover:text-accent-400 hover:decoration-accent-400/60`
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <SortSelect value={sort} onChange={setSort} t={t} isDark={isDark} />
          </div>

          {sorted.length > 0 ? (
            <ul className="mt-6">
              {sorted.map((p) => {
                const isActive = active && p.title === active.title;
                return (
                  <li key={p.title} className={`border-t ${t.border}`}>
                    <button
                      type="button"
                      onClick={() => setActiveTitle(p.title)}
                      aria-pressed={isActive}
                      className="group grid w-full grid-cols-[3.25rem_1fr_auto] items-baseline gap-4 py-4 text-left"
                    >
                      <span className={`font-mono text-xs ${isActive ? "text-accent-400" : t.textFaint} transition-colors`}>{yearOf(p)}</span>
                      <span className="block min-w-0">
                        <span className={`block font-display text-xl font-bold leading-tight transition-colors ${isActive ? "text-accent-400" : ""}`}>
                          {p.title}
                        </span>
                        <span className={`mt-1 block font-mono text-xs ${t.textFaint}`}>
                          {taglineOf(p)}
                          {FEATURED_TITLES.includes(p.title) && (
                            <span className="ml-2 text-[10px] uppercase tracking-widest text-accent-400">· Featured</span>
                          )}
                        </span>
                      </span>
                      <ArrowRight size={16} className={`transition-all ${isActive ? "translate-x-0.5 text-accent-400" : t.textFaint}`} />
                    </button>
                  </li>
                );
              })}
              <li className={`border-t ${t.border}`} aria-hidden="true" />
            </ul>
          ) : (
            <p className={`mt-8 text-sm ${t.textMuted}`}>No projects match{query.trim() ? ` "${query.trim()}"` : ""}.</p>
          )}
        </div>

        {/* Right: sticky preview */}
        <div className="col-span-7 sticky top-10">
          {active && (
            <div className={`overflow-hidden rounded-2xl border ${t.border} ${t.surfaceSolid}`}>
              <div className={`aspect-[16/9] overflow-hidden border-b ${t.border} ${isDark ? "bg-neutral-950" : "bg-slate-100"}`}>
                <PortfolioImage
                  key={active.title}
                  src={activeThumb}
                  alt={`${active.title} preview`}
                  fallbackLabel={active.title}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="p-7">
                <p className={`font-mono text-xs ${t.textFaint}`}>
                  {monthYearOf(active)}
                  <span> · </span>
                  {contextOf(active)}
                  {active.status && (<><span> · </span><span className="text-accent-400">{active.status}</span></>)}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold leading-tight">{active.title}</h2>
                <p className={`mt-3 text-[15px] leading-relaxed line-clamp-3 ${t.textMuted}`}>{renderDescription(active.description, t)}</p>
                {active.tags && active.tags.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {active.tags.slice(0, 6).map((tag) => (
                      <li key={tag} className={`font-mono text-xs px-2.5 py-1 rounded-md border ${t.border} ${t.textMuted}`}>{tag}</li>
                    ))}
                  </ul>
                )}
                <a
                  href={`#${slugOf(active.title)}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-400 px-5 py-2.5 text-sm font-semibold text-onaccent transition-opacity hover:opacity-90"
                >
                  View project <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectArchive({ t, isDark, onClose, instant }) {
  const [closing, requestClose] = useOverlayClose(onClose);
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All");
  const [sort, setSort] = useState("newest");
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  const q = query.trim().toLowerCase();
  const matches = (p) => {
    if (track !== "All") {
      const tr = trackOf(p.title);
      // A project that sits in both lists ("Both") belongs under Software and Networking & IT.
      const inTrack = tr === track || (tr === "Both" && (track === "Software" || track === "Networking & IT"));
      if (!inTrack && p.category !== track) return false;
    }
    if (!q) return true;
    const hay = [p.title, p.eyebrow, p.meta, p.category, ...(p.tags || [])].filter(Boolean).join(" ").toLowerCase();
    return hay.includes(q);
  };
  const filtered = ALL_PROJECTS.filter(matches);
  const sorted = sortProjects(filtered, sort);

  return (
    <div className={`${closing ? "overlay-sink" : instant ? "" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto no-scrollbar ${t.bg} ${t.text}`}>
      <div className="lg:hidden max-w-3xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
        <BackButton t={t} onClick={requestClose} />

        <div className="mt-4 flex items-baseline justify-between gap-3">
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Project Log</h1>
          <p className={`shrink-0 font-mono text-xs ${t.textFaint}`}>
            {filtered.length} of {ALL_PROJECTS.length}
            <span className="hidden sm:inline"> projects</span>
          </p>
        </div>
        <p className={`text-sm ${t.textMuted} mt-1`}>Everything I've built, wired up, and shipped.</p>

        <div className="mt-4 flex items-center gap-2">
          <div className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-lg border ${t.border} ${t.surfaceSolid} px-3.5 py-2.5`}>
            <Search size={15} className={`shrink-0 ${t.textFaint}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects"
              className="w-full min-w-0 bg-transparent font-body text-[15px] outline-none placeholder:text-slate-400"
            />
            {query && (
              <button onClick={() => setQuery("")} className={`shrink-0 ${t.textFaint} hover:text-accent-400 transition-colors`} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="relative shrink-0">
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              aria-label="Filter projects"
              className={`h-11 appearance-none rounded-lg border ${t.border} bg-transparent pl-3 pr-8 text-sm font-medium ${t.text} ${isDark ? "[color-scheme:dark]" : "[color-scheme:light]"} outline-none cursor-pointer hover:border-accent-400/60 hover:text-accent-400 focus-visible:border-accent-400/60 transition-colors`}
            >
              {TRACK_FILTERS.map((name) => (
                <option key={name} value={name} className={`${t.surfaceSolid} ${t.text}`}>{name}</option>
              ))}
            </select>
            <ArrowDown size={13} className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${t.textMuted}`} />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-2.5">
          <span className={`text-sm ${t.textMuted}`}>Sort by</span>
          <SortSelect value={sort} onChange={setSort} t={t} isDark={isDark} />
        </div>

        {sorted.length > 0 && (
          <ul className={`mt-3 overflow-hidden rounded-xl border ${t.border} ${t.surfaceSolid}`}>
            {sorted.map((p) => (
              <ProjectCard key={p.title} p={p} t={t} isDark={isDark} />
            ))}
          </ul>
        )}
        {sorted.length === 0 && (
          <p className={`mt-4 text-sm ${t.textMuted}`}>No projects match{q ? ` "${query.trim()}"` : ""}.</p>
        )}
      </div>
      <ProjectLogDesktop
        t={t}
        isDark={isDark}
        sorted={sorted}
        total={ALL_PROJECTS.length}
        query={query}
        setQuery={setQuery}
        track={track}
        setTrack={setTrack}
        sort={sort}
        setSort={setSort}
        onClose={requestClose}
      />
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
  const slideUrls = images.map(galleryUrl);
  const slideUrlKey = slideUrls.join("|");
  useEffect(() => {
    // Warm the browser cache for every screenshot so switching slides is instant.
    slideUrls.forEach((u) => {
      if (!u) return;
      const im = new Image();
      im.decoding = "async";
      im.src = u;
    });
  }, [slideUrlKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const idx = ALL_PROJECTS.indexOf(p);
  const next = ALL_PROJECTS[(idx + 1) % ALL_PROJECTS.length];
  const links = [
    hasLink(p.view) && { label: /roblox\.com/.test(p.view) ? "Play on Roblox" : "Live demo", href: p.view },
    hasLink(p.github) && { label: "GitHub", href: p.github },
  ].filter(Boolean);
  const navBtn = `h-10 w-10 rounded-full border ${t.border} flex items-center justify-center transition-colors hover:border-accent-400 hover:text-accent-400 disabled:opacity-30 disabled:pointer-events-none`;

  return (
    <div className={`fixed inset-0 z-[60] overflow-y-auto no-scrollbar ${t.bg} ${t.text}`}>
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
            {p.demoUnavailable && <span className={t.textFaint}>Live demo unavailable</span>}
          </div>
        </div>

        {images.length > 0 && (
          <>
            <div className={`mt-8 rounded-2xl border ${t.border} overflow-hidden ${t.surfaceSolid}`}>
              <PortfolioImage src={slideUrls[slide]} alt={`${p.title} screenshot ${slide + 1}`} fallbackLabel={p.title} decoding="async" className="w-full h-auto block" />
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