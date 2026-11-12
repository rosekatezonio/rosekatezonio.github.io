import React, { useState, useEffect } from "react";
import { img, PortfolioImage } from "../images.jsx";
import { useOverlayClose } from "../hooks.js";
import { renderDescription, BackButton, PageHeader } from "./ui.jsx";
import { EqMeter, WaveDivider } from "./CDPlayer.jsx";
import { SKILL_GROUPS, ALL_PROJECTS, FEATURED_TITLES, TRACK_FILTERS, trackOf, yearOf, contextOf, taglineOf, slugOf, thumbFor, galleryFor, hasLink } from "../data.js";
import { ArrowRight, ArrowUpRight, ArrowDown, Search, X } from "../icons.jsx";

function projectsUsing(name) {
  const lower = name.toLowerCase();
  const tokens = new Set([lower, ...lower.split(/[\/()]/).map((x) => x.trim()).filter(Boolean)]);
  const words = lower.split(/[^a-z0-9.+#]+/).filter((w) => w.length >= 5);
  return ALL_PROJECTS.filter((p) =>
    (p.tags || []).some((tag) => {
      const tl = tag.toLowerCase();
      return tokens.has(tl) || (tl.length >= 5 && words.includes(tl));
    })
  );
}

function ToolIcon({ item, isDark }) {
  const [broken, setBroken] = useState(false);
  const src = item.icon && img(item.icon);
  if (!src || broken) return null;
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white p-0.5">
      <img src={src} alt="" loading="lazy" onError={() => setBroken(true)} className="h-full w-full object-contain" />
    </span>
  );
}

function ProjectLinks({ titles, t }) {
  return titles.map((title, i) => (
    <React.Fragment key={title}>
      {i > 0 && <span aria-hidden="true" className={t.textFaint}> / </span>}
      <a
        href={`#${slugOf(title)}`}
        className={`underline underline-offset-4 decoration-1 transition-colors hover:text-accent-400 ${t.textMuted}`}
      >
        {title}
      </a>
    </React.Fragment>
  ));
}

function ToolkitCategory({ group, open, onToggle, t, isDark }) {
  const panelId = `toolkit-${group.num}`;
  const toolProjects = new Set(group.items.flatMap((item) => projectsUsing(item.name).map((p) => p.title)));
  const relatedOnly = (group.proof || []).filter((title) => !toolProjects.has(title));
  const columns = "grid grid-cols-[2.25rem_minmax(0,1fr)_1.5rem] gap-x-4 sm:grid-cols-[3.5rem_minmax(0,1fr)_2rem]";
  return (
    <li className={`border-t last:border-b ${t.border}`}>
      <h2>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className={`group ${columns} w-full items-start py-6 text-left sm:py-8`}
        >
          <span className={`pt-1 font-mono text-xs tabular-nums sm:pt-2 ${t.accent}`}>{group.num}</span>
          <span className="min-w-0">
            <span className={`block font-display text-2xl font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-accent-400 sm:text-4xl ${open ? t.accent : t.text}`}>
              {group.title}
            </span>
            <span className={`mt-2 block font-mono text-xs uppercase leading-relaxed tracking-wider ${t.textMuted}`}>
              {group.items.map((item) => item.name).join(" · ")}
            </span>
          </span>
          <span aria-hidden="true" className={`text-right font-mono text-2xl leading-none transition-transform duration-300 group-hover:text-accent-400 motion-reduce:transition-none ${open ? "rotate-45 " + t.accent : t.textMuted}`}>+</span>
        </button>
      </h2>

      <div
        id={panelId}
        role="region"
        aria-label={group.title}
        className="grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className={`${columns} pb-8 sm:pb-10`}>
            <div className="col-start-2 min-w-0">
              {group.blurb && <p className={`font-body text-sm ${t.textMuted}`}>{group.blurb}</p>}
              {relatedOnly.length > 0 && (
                <p className={`mt-3 font-mono text-[11px] uppercase tracking-widest ${t.textFaint}`}>
                  {group.proofLabel || "Applied in"}: <ProjectLinks titles={relatedOnly} t={t} />
                </p>
              )}
              <ul className="mt-5">
                {group.items.map((item) => {
                  const used = projectsUsing(item.name).map((p) => p.title);
                  return (
                    <li key={item.name} className={`flex flex-col gap-1 border-t py-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6 ${t.border}`}>
                      <span className="flex min-w-0 items-center gap-2.5">
                        <ToolIcon item={item} isDark={isDark} />
                        <span className="min-w-0">
                          <span className={`font-body text-[15px] font-medium ${t.text}`}>{item.name}</span>
                          {item.note && <span className={`block font-body text-xs ${t.textFaint}`}>{item.note}</span>}
                        </span>
                      </span>
                      {used.length > 0 && (
                        <span className={`font-mono text-[11px] uppercase tracking-widest ${t.textFaint}`}>
                          Used in <ProjectLinks titles={used} t={t} />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function SkillsArchive({ t, onClose, isDark }) {
  const [closing, requestClose] = useOverlayClose(onClose);
  const [openIdx, setOpenIdx] = useState(() => (window.matchMedia("(min-width: 640px)").matches ? 0 : -1));
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  return (
    <div className={`${closing ? "overlay-sink" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto no-scrollbar ${t.bg} ${t.text}`}>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-10 sm:pt-10 lg:px-12">
        <BackButton t={t} onClick={requestClose} />
        <PageHeader eyebrow="SIDE B / 002 — TECHNICAL CREDITS" title="Full Toolkit" subtitle="TOOLS, LANGUAGES & SYSTEMS IN THE ROTATION." t={t} isDark={isDark} />

        <ol className="mt-12 sm:mt-14">
          {SKILL_GROUPS.map((group, gi) => (
            <ToolkitCategory
              key={group.title}
              group={group}
              open={openIdx === gi}
              onToggle={() => setOpenIdx(openIdx === gi ? -1 : gi)}
              t={t}
              isDark={isDark}
            />
          ))}
        </ol>

        <p className={`mt-10 font-mono text-[11px] uppercase tracking-widest ${t.textFaint}`}>End of side B — Technical inventory</p>
      </div>
    </div>
  );
}

const galleryUrl = (key) => {
  const u = img(key);
  if (!u || !/res\.cloudinary\.com/.test(u) || /\/upload\/[^/]*w_\d/.test(u)) return u;
  return u.replace("/upload/", "/upload/w_1400,c_limit/");
};

const featuredRank = (p) => {
  const i = FEATURED_TITLES.indexOf(p.title);
  return i === -1 ? FEATURED_TITLES.length : i;
};

const SORT_OPTIONS = [
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const FULL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_RE = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\\.?";

const dateKeyOf = (p) => {
  const m = (p.meta || "").match(new RegExp(`\\b${MONTH_RE}\\s+(20\\d{2})`, "i"));
  if (m) return parseInt(m[2], 10) * 12 + MONTHS.indexOf(m[1].toLowerCase());
  return (parseInt(yearOf(p), 10) || 0) * 12 + 11;
};

const dateLabelOf = (p) => {
  const m = (p.meta || "").match(new RegExp(`\\b${MONTH_RE}\\s+(20\\d{2})`, "i"));
  return m ? `${FULL_MONTHS[MONTHS.indexOf(m[1].toLowerCase())]} ${m[2]}` : yearOf(p);
};

const contextPartsOf = (p) =>
  (p.meta || p.category || "")
    .split(" · ")
    .map((part) => part.trim())
    .filter((part) => part && !new RegExp(`^(${MONTH_RE}\\s+)?20\\d{2}$`, "i").test(part));

const sortProjects = (list, mode) =>
  [...list].sort((a, b) => {
    if (mode === "az") return a.title.localeCompare(b.title, undefined, { sensitivity: "base", numeric: true });
    if (mode === "za") return b.title.localeCompare(a.title, undefined, { sensitivity: "base", numeric: true });
    const diff = mode === "oldest" ? dateKeyOf(a) - dateKeyOf(b) : dateKeyOf(b) - dateKeyOf(a);
    return diff || featuredRank(a) - featuredRank(b);
  });

const inTrack = (p, track) => {
  if (track === "All") return true;
  const tr = trackOf(p.title);
  return tr === track || (tr === "Both" && (track === "Software" || track === "Networking & IT")) || p.category === track;
};

function SortSelect({ value, onChange, t, isDark }) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort projects"
        className={`h-9 cursor-pointer appearance-none bg-transparent pr-5 text-[15px] ${t.text} ${isDark ? "[color-scheme:dark]" : "[color-scheme:light]"} outline-none transition-colors hover:text-accent-400`}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value} className={`${t.surfaceSolid} ${t.text}`}>{o.label}</option>
        ))}
      </select>
      <ArrowDown size={12} className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 ${t.textMuted}`} />
    </div>
  );
}

function ProjectRow({ p, no, t, isDark }) {
  const featured = FEATURED_TITLES.includes(p.title);
  const thumb = p.thumbnail ? img(thumbFor(p, isDark)) : undefined;
  const titleId = `plog-${slugOf(p.title)}`;
  const context = contextPartsOf(p);
  const tags = (p.tags || []).slice(0, 5);
  return (
    <li className={`plog-row border-b ${t.border}`}>
      <a
        href={`#${slugOf(p.title)}`}
        aria-labelledby={titleId}
        className="group grid gap-x-10 gap-y-5 py-8 sm:py-10 md:grid-cols-[9rem_minmax(0,1fr)] lg:grid-cols-[10rem_minmax(0,1fr)_21rem] lg:gap-x-12"
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5 text-sm leading-snug md:block md:space-y-0.5 md:pt-3">
          <p className="font-medium">{dateLabelOf(p)}</p>
          {context.map((c) => (
            <p key={c} className={t.textMuted}>{c}</p>
          ))}
          {p.status && p.status !== "Completed" && <p className={t.textMuted}>{p.status}</p>}
          {featured && (
            <p className="inline-flex items-center gap-1.5 font-medium">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              Featured release
            </p>
          )}
        </div>

        <div className="min-w-0">
          <p className={`mb-3 font-mono text-xs uppercase tracking-widest ${t.textMuted}`}>
            <span className="text-accent-400">{no}</span> — {p.category} · {yearOf(p)}
          </p>
          <h2
            id={titleId}
            className="font-serif-read text-balance text-[2.25rem] font-normal leading-[1.05] tracking-[-0.025em] sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            <span className="underline decoration-transparent decoration-[3px] underline-offset-[0.14em] transition-[text-decoration-color] group-hover:decoration-accent-400">
              {p.title}
            </span>
          </h2>
          <p className={`mt-3 text-lg leading-snug ${t.text}`}>{taglineOf(p)}</p>
          <p className={`mt-4 max-w-[34rem] text-base leading-relaxed line-clamp-3 copy-justify ${t.textMuted}`}>
            {renderDescription(p.description, t)}
          </p>
          {tags.length > 0 && <p className={`mt-5 text-sm ${t.textMuted}`}>{tags.join(", ")}</p>}
        </div>

        <div className={`aspect-[16/10] overflow-hidden md:col-start-2 lg:col-start-3 lg:row-start-1 lg:mt-2 ${isDark ? "bg-neutral-900" : "bg-slate-100"}`}>
          <PortfolioImage
            src={thumb}
            alt={`${p.title} preview`}
            fallbackLabel={p.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </a>
    </li>
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
    if (!inTrack(p, track)) return false;
    if (!q) return true;
    const hay = [p.title, p.eyebrow, p.meta, p.category, ...(p.tags || [])].filter(Boolean).join(" ").toLowerCase();
    return hay.includes(q);
  };
  const filtered = ALL_PROJECTS.filter(matches);
  const sorted = sortProjects(filtered, sort);
  const total = ALL_PROJECTS.length;
  const resetAll = () => { setQuery(""); setTrack("All"); };

  return (
    <div className={`${closing ? "overlay-sink" : instant ? "" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto no-scrollbar ${t.bg} ${t.text}`}>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-10 sm:pt-10 lg:px-12">
        <button onClick={requestClose} className={`inline-flex items-center gap-2 text-sm ${t.textMuted} transition-colors hover:text-accent-400`}>
          <ArrowRight size={14} className="rotate-180" /> Back to portfolio
        </button>

        <header className="mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 sm:mt-14">
          <div>
            <p className={`mb-5 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest ${t.accent}`}>
              <span>Tracklist / Side B</span>
              <span aria-hidden="true" className={t.textFaint}>—</span>
              <span>{String(total).padStart(2, "0")} releases</span>
              <EqMeter />
            </p>
            <h1 className="font-serif-read text-[3.5rem] font-normal leading-[0.9] tracking-[-0.035em] sm:text-[6rem] lg:text-[8.5rem]">Tracklist</h1>
            <p className={`mt-6 max-w-md text-balance text-lg leading-snug ${t.textMuted}`}>Everything I’ve built, wired up, and shipped.</p>
          </div>
          <p className={`text-sm tabular-nums ${t.textMuted}`} aria-live="polite">
            {sorted.length === total ? total : `${sorted.length} of ${total}`} {total === 1 ? "release" : "releases"}
          </p>
        </header>

        <div className="mt-10 w-56 max-w-full sm:mt-14">
          <WaveDivider className="wave-short" />
        </div>

        <div className="mt-6">
          <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div role="group" aria-label="Filter projects" className="no-scrollbar -mx-5 flex gap-x-7 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              {TRACK_FILTERS.map((name) => {
                const active = track === name;
                const count = ALL_PROJECTS.filter((p) => inTrack(p, name)).length;
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTrack(name)}
                    className={`shrink-0 whitespace-nowrap py-1 text-[15px] underline decoration-2 underline-offset-[10px] transition-colors ${
                      active
                        ? `${t.text} font-medium decoration-accent-400`
                        : `${t.textMuted} decoration-transparent hover:text-accent-400`
                    }`}
                  >
                    {name}
                    <span className={`ml-1.5 text-xs tabular-nums ${t.textMuted}`}>{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-6">
              <label className={`flex min-w-0 flex-1 items-center gap-2 border-b ${t.border} transition-colors focus-within:border-accent-400 lg:w-64 lg:flex-none`}>
                <Search size={14} className={`shrink-0 ${t.textMuted}`} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects"
                  aria-label="Search projects"
                  className={`h-9 w-full min-w-0 bg-transparent text-[15px] ${t.text} outline-none placeholder:text-slate-500`}
                />
                {query && (
                  <button type="button" onClick={() => setQuery("")} className={`shrink-0 ${t.textMuted} transition-colors hover:text-accent-400`} aria-label="Clear search">
                    <X size={14} />
                  </button>
                )}
              </label>
              <SortSelect value={sort} onChange={setSort} t={t} isDark={isDark} />
            </div>
          </div>
        </div>

        {sorted.length > 0 ? (
          <ul className={`plog-list border-t ${t.border}`}>
            {sorted.map((p) => (
              <ProjectRow key={p.title} p={p} no={String(ALL_PROJECTS.findIndex((x) => x.title === p.title) + 1).padStart(2, "0")} t={t} isDark={isDark} />
            ))}
          </ul>
        ) : (
          <div className={`border-t ${t.border} py-16`}>
            <p className="font-serif-read text-3xl tracking-[-0.02em] sm:text-4xl">
              Nothing matches{q ? ` “${query.trim()}”` : " this filter"}.
            </p>
            <button type="button" onClick={resetAll} className="mt-5 text-[15px] underline underline-offset-4 transition-colors hover:text-accent-400">
              Clear search and filters
            </button>
          </div>
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
  const slideUrls = images.map(galleryUrl);
  const slideUrlKey = slideUrls.join("|");
  useEffect(() => {
    slideUrls.forEach((u) => {
      if (!u) return;
      const im = new Image();
      im.decoding = "async";
      im.src = u;
    });
  }, [slideUrlKey]);
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
          <p className={`mt-3 leading-relaxed copy-justify ${t.textMuted}`}>{renderDescription(p.description, t)}</p>
        </section>

        {p.detail?.problem && (
          <section className="mt-10">
            <h2 className="font-display font-semibold text-lg">The problem</h2>
            <p className={`mt-3 leading-relaxed copy-justify ${t.textMuted}`}>{p.detail.problem}</p>
          </section>
        )}

        {p.detail?.approach && (
          <section className="mt-10">
            <h2 className="font-display font-semibold text-lg">Goal & approach</h2>
            <p className={`mt-3 leading-relaxed copy-justify ${t.textMuted}`}>{p.detail.approach}</p>
          </section>
        )}

        {p.highlights && p.highlights.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display font-semibold text-lg">Highlights</h2>
            <ul className="mt-3 space-y-2.5">
              {p.highlights.map((h) => (
                <li key={h} className={`flex gap-3 leading-relaxed ${t.textMuted}`}>
                  <span className="mt-3 h-px w-3 shrink-0 bg-current" />
                  <span className="copy-justify min-w-0 flex-1">{h}</span>
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
                  <p className={`mt-1 leading-relaxed copy-justify ${t.textMuted}`}>{c.fix}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(p.detail?.learned || p.detail?.next) && (
          <section className="mt-10">
            <h2 className="font-display font-semibold text-lg">Takeaways & next steps</h2>
            {p.detail.learned && (
              <p className={`mt-3 leading-relaxed copy-justify ${t.textMuted}`}>
                <span className={`font-medium ${t.text}`}>Learned: </span>
                {p.detail.learned}
              </p>
            )}
            {p.detail.next && (
              <p className={`mt-3 leading-relaxed copy-justify ${t.textMuted}`}>
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