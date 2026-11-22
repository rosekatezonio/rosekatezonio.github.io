import { PlayerControls, EqMeter, WaveDivider } from "./CDPlayer.jsx";
import React, { useState } from "react";
import { PortfolioImage, img } from "../images.jsx";
import { Reveal, SectionHeading, SectionLabel, ViewMore, headline } from "./ui.jsx";
import { ProjectShowcase } from "./ProjectShowcase.jsx";
import { PROFILE, TOOLKIT_GROUPS, slugOf, LABS, WEB_APPS, ALL_PROJECTS, EXPERIENCE, PATHWAY_ICONS, experienceYear, HOME_PROJECT_BY_TAB } from "../data.js";
import { Wrench, Code2, Network, ArrowUpRight, ArrowRight, Briefcase } from "../icons.jsx";


export function ExperienceTimeline({ t, isDark, className = "max-w-4xl" }) {
  return (
    <ol className={className}>
      {EXPERIENCE.map((exp, i) => {
        const date = exp.period || exp.duration || "";
        const current = /present/i.test(date);
        const no = String(i + 1).padStart(2, "0");
        const lines = Array.isArray(exp.description) ? exp.description : exp.description ? [exp.description] : [];
        const facts = [
          { label: "Location", value: exp.location },
          { label: "Employment", value: exp.employment && exp.employment !== date ? exp.employment : "" },
          { label: "Category", value: exp.type },
        ].filter((f) => f.value);
        return (
          <Reveal key={`${exp.company}-${i}`} delay={i * 80}>
            <li className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-8">
              <div>
                <p className={`font-display text-3xl font-bold leading-none tabular-nums sm:text-5xl ${current ? t.accent : t.text}`}>{no}</p>
                <p className={`mt-3 hidden font-mono text-xs uppercase tracking-wider sm:block ${t.textFaint}`}>{date}</p>
              </div>

              <div className={`relative min-w-0 border-l pl-5 sm:pl-8 ${t.border}`}>
                <span
                  aria-hidden="true"
                  className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${current ? "bg-accent-400 ring-4 ring-accent-400/20" : isDark ? "bg-neutral-600" : "bg-slate-400"}`}
                />
                <p className={`mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest ${current ? t.accent : t.textFaint}`}>
                  {current ? "Current tour stop" : "Completed tour stop"}
                  {current && <EqMeter />}
                </p>
                <p className={`mb-2 font-mono text-xs uppercase tracking-wider sm:hidden ${t.textFaint}`}>{date}</p>
                <h3 className={`font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl ${t.text}`}>{exp.position}</h3>

                <div className="mt-4 flex items-center gap-3">
                  {exp.logo && (
                    <span className={`h-8 w-8 shrink-0 overflow-hidden rounded-lg border bg-white p-0.5 ${t.border}`}>
                      <PortfolioImage imageKey={exp.logo} alt="" fallbackLabel={exp.company} className="h-full w-full object-contain" />
                    </span>
                  )}
                  <ExperienceName exp={exp} t={t} className={`font-display text-lg font-semibold leading-snug sm:text-xl ${t.text}`} />
                </div>

                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                  {facts.map((f) => (
                    <div key={f.label}>
                      <dt className={`font-mono text-[10px] uppercase tracking-widest ${t.textFaint}`}>{f.label}</dt>
                      <dd className={`mt-1 text-sm ${t.text}`}>{f.value}</dd>
                    </div>
                  ))}
                </dl>

                {lines.length > 0 && (
                  <div className="mt-7">
                    <p className={`mb-3 font-mono text-[10px] uppercase tracking-widest ${t.textFaint}`}>Responsibilities</p>
                    <ol className="space-y-3">
                      {lines.map((line, li) => (
                        <li key={line} className="flex gap-4">
                          <span className={`shrink-0 pt-0.5 font-mono text-[11px] tabular-nums ${t.accent}`}>{String(li + 1).padStart(2, "0")}</span>
                          <span className={`text-[15px] leading-relaxed ${t.textMuted}`}>{line}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {i < EXPERIENCE.length - 1 && <div className="mt-10 pb-10"><WaveDivider className="wave-sm" /></div>}
              </div>
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}


export function HeroSection({ t, isDark, onContact, openResumes, onOpenAbout }) {
  const [photoHover, setPhotoHover] = useState(false);
  const [photoOverride, setPhotoOverride] = useState(null);
  const photoColor = photoOverride ? photoOverride === "color" : photoHover;
  const togglePhoto = () => setPhotoOverride(photoColor ? "gray" : "color");
  const tiles = [
    { big: "Resume", label: "Download CV", onClick: openResumes },
    { big: "LinkedIn", label: "Let's connect", href: PROFILE.linkedin, external: true },
    { big: "Email", label: PROFILE.email, onClick: onContact },
    { big: "GitHub", label: "See my code", href: PROFILE.github, external: true },
  ];
  return (
    <section id="hero" className="relative pt-16 lg:pt-0 overflow-hidden flex items-center lg:min-h-[92vh]">
      <div className="hero-cq w-full">
        <div className="hero-frame">
          <h1 className="sr-only">Rose Kate Zonio, {PROFILE.role}</h1>

          {/* label + name + role */}
          <div className="mx-auto w-full max-w-6xl px-5 pt-5 sm:px-8 md:pt-12 lg:pt-[min(8vh,5.5rem)]">
            <Reveal delay={60}>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px]">
                <span aria-hidden="true" className="hero-rule h-px w-10 bg-accent-400 sm:w-14" />
                <span className={t.textMuted}>Side A / 001 <span className="mx-1.5">·</span> {PROFILE.location}</span>
              </p>
            </Reveal>

            <div className="mt-6 flex flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10" aria-hidden="true">
              <span className="hero-line">
                <span className={`hero-name-big font-display font-bold uppercase leading-none tracking-[-0.03em] ${t.text}`} style={{ "--d": "60ms" }}>Rose Kate</span>
              </span>
              <span className="hero-line">
                <span className={`hero-role-line whitespace-nowrap font-display font-medium leading-tight tracking-[-0.01em] ${t.textMuted}`} style={{ "--d": "200ms" }}>{PROFILE.role}</span>
              </span>
            </div>
          </div>

          {/* giant surname, full width, fading out toward the bottom */}
          <div className="mx-auto mt-3 w-full max-w-6xl px-5 sm:px-8 lg:mt-4" aria-hidden="true">
            <span className="hero-line hero-giant-line">
              <span className={`hero-giant font-display font-bold uppercase ${t.accent}`} style={{ "--d": "120ms" }}>Zonio</span>
            </span>
          </div>

          <div className="mx-auto w-full max-w-6xl px-5 pb-5 sm:px-8 md:pb-12 lg:pb-16">
            <div className="hero-overlap relative z-10">
            <div className="grid grid-cols-[minmax(0,1fr)] gap-10 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-end xl:gap-x-12">
              <div className="min-w-0">
                <Reveal delay={220}>
                  <p className={`max-w-xl text-base leading-relaxed sm:text-lg ${t.textMuted}`}>
                    I build web experiences, configure networks, and explore practical cybersecurity solutions.
                  </p>
                </Reveal>

                <Reveal delay={300}>
                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-10">
                    <a
                      href="#labs"
                      className="group inline-flex items-center gap-3 whitespace-nowrap bg-accent-400 px-5 py-4 font-display text-xs font-semibold uppercase tracking-[0.14em] text-onaccent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-10px_rgba(182,255,46,.6)]"
                    >
                      View projects
                      <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                      href="#aboutme"
                      onClick={(event) => {
                        event.preventDefault();
                        onOpenAbout();
                      }}
                      className={`group inline-flex items-center gap-2 whitespace-nowrap px-2 py-4 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-accent-400 ${t.textMuted}`}
                    >
                      More about me
                      <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={380} className="w-full max-w-[26rem] xl:-mb-3 xl:max-w-none">
                <div className={`border-t pt-6 ${t.border}`}>
                  <PlayerControls t={t} />
                </div>
              </Reveal>
            </div>
            </div>

        <Reveal delay={440}>
          <div id="contact" className={`mt-14 sm:mt-20 border-t ${t.border} pt-7 scroll-mt-24`}>
            <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px] ${t.textMuted} mb-6`}>Side B / 002 <span className="mx-1.5">·</span> Reach me</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-8">
              {tiles.map((item) => {
                const inner = (
                  <>
                    <ArrowUpRight size={14} className={`absolute right-0 top-1 ${t.textFaint} transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-400`} />
                    <p className={`font-display text-xl sm:text-2xl font-medium leading-tight tracking-tight ${t.text} transition-colors group-hover:text-accent-400`}>
                      {item.big}
                    </p>
                    <p className={`font-body text-[12px] sm:text-sm ${t.textMuted} mt-1.5`}>{item.label}</p>
                  </>
                );
                return item.onClick ? (
                  <button key={item.big} type="button" onClick={item.onClick} className="group relative block pr-5 text-left">
                    {inner}
                  </button>
                ) : (
                  <a
                    key={item.big}
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group relative block pr-5"
                  >
                    {inner}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        <section aria-label="Side Quest, affiliation, and certification links" className={`mt-8 border-t ${t.border} pt-7`}>
          <div className="grid grid-cols-3 gap-x-4 sm:gap-8">
            {[
              { id: "activities", label: "Side Quest" },
              { id: "affiliation", label: "Affiliation" },
              { id: "certification", label: "Cert" },
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="group relative block pr-5">
                <ArrowUpRight size={14} className={`absolute right-0 top-1 ${t.textFaint} transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-400`} />
                <p className={`font-display text-base sm:text-[28px] font-medium leading-tight tracking-tight ${t.text} transition-colors group-hover:text-accent-400`}>
                  {item.label}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
        </div>
      </div>
    </section>
  );
}


function MarqueeSkill({ item, t, isDark, hidden = false }) {
  const [broken, setBroken] = useState(false);
  const src = img(item.icon);
  const hasIcon = src && !broken;
  return (
    <li
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 transition-colors hover:border-accent-400 ${t.border} ${isDark ? "bg-neutral-900/60" : "bg-white"} ${hidden ? "motion-reduce:hidden" : ""}`}
    >
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md ${hasIcon ? (isDark ? "bg-white p-0.5" : "") : "bg-neutral-500/15"}`}>
        {hasIcon ? (
          <img src={src} alt="" loading="lazy" onError={() => setBroken(true)} className="h-full w-full object-contain" />
        ) : (
          <span className={`font-mono text-[9px] font-bold tracking-wider ${t.accent}`}>{item.abbr}</span>
        )}
      </span>
      <span className={`whitespace-nowrap font-display text-sm font-semibold tracking-tight ${t.text}`}>{item.name}</span>
    </li>
  );
}

const MARQUEE_SKILLS = TOOLKIT_GROUPS.flatMap((g) => g.items);

export function SkillsSection({ t, isDark, onOpenSkills }) {
  return (
    <section id="skills">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-24">
        <div className="mb-12 text-center sm:mb-14">
          <Reveal>
            <SectionLabel side="SIDE A" no="003" name="The Soundboard" t={t} />
            <h2 className="journey-title mt-6 whitespace-nowrap font-display font-bold uppercase leading-[0.95] tracking-tight">
              <span className={t.text}>What I work</span>{" "}
              <span className={`hero-outline ${t.accent}`}>with.</span>
            </h2>
            <p className={`mx-auto mt-6 max-w-xl font-mono text-xs uppercase leading-relaxed tracking-[0.18em] sm:text-sm ${t.textMuted}`}>
              A practical toolkit for building software and understanding IT systems.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <div
          className="marquee-mask motion-reduce:overflow-x-auto"
          style={{
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
            maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          <ul className="marquee-track marquee-reverse py-1" style={{ animationDuration: `${MARQUEE_SKILLS.length * 3}s` }} aria-label="Skills">
            {MARQUEE_SKILLS.map((item) => (
              <MarqueeSkill key={item.name} item={item} t={t} isDark={isDark} />
            ))}
            {MARQUEE_SKILLS.map((item) => (
              <MarqueeSkill key={`dup-${item.name}`} item={item} t={t} isDark={isDark} hidden />
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
        <div className="mt-10 text-center">
          <ViewMore t={t} onClick={onOpenSkills}>View full toolkit</ViewMore>
        </div>
      </div>
    </section>
  );
}


export function ProjectsSection({ t, isDark, projectTab, onSwitchTab, onOpenArchive, onOpenProject }) {
  const isLabs = projectTab === "labs";
  const item = (isLabs ? LABS : WEB_APPS).find((p) => p.title === HOME_PROJECT_BY_TAB[projectTab]);
  return (
    <section id="labs" className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <div className="mb-10 text-center sm:mb-14">
        <SectionLabel side="SIDE B" no="004" name="Tracklist" t={t} />
        <h2 className="mt-6 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 font-display text-[2.1rem] font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
          {[["webapps", "Software"], ["labs", "Networking & IT"]].map(([key, label], i) => (
            <React.Fragment key={key}>
              {i > 0 && <span aria-hidden="true" className={t.textFaint}>/</span>}
              <button
                type="button"
                onClick={() => onSwitchTab(key)}
                aria-pressed={projectTab === key}
                className={`uppercase transition-opacity ${projectTab === key ? t.text : `hero-outline ${t.accent} opacity-70 hover:opacity-100`}`}
              >
                {label}
              </button>
            </React.Fragment>
          ))}
        </h2>
        <p className={`mx-auto mt-6 max-w-xl font-mono text-xs uppercase leading-relaxed tracking-[0.18em] sm:text-sm ${t.textMuted}`}>
          A few things I've built. The full list lives in the project log.
        </p>
      </div>

      <Reveal>
        {item && <ProjectShowcase t={t} isDark={isDark} item={item} icon={isLabs ? Network : Code2} onOpenProject={onOpenProject} />}
      </Reveal>

      <div className="mt-14 text-center">
        <ViewMore t={t} onClick={onOpenArchive}>View all my projects ({ALL_PROJECTS.length})</ViewMore>
      </div>
    </section>
  );
}


function ExperienceName({ exp, t, className }) {
  const [drawn, setDrawn] = useState(false);
  const nameClass = className || `font-serif-read font-normal text-[1.75rem] sm:text-4xl leading-[1.05] tracking-[-0.025em] ${t.text}`;
  if (!exp.website) return <span className={nameClass}>{exp.company}</span>;

  const onClick = (e) => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setDrawn(true);
    setTimeout(() => window.open(exp.website, "_blank", "noopener,noreferrer"), 450);
    setTimeout(() => setDrawn(false), 1100);
  };

  return (
    <a
      href={exp.website}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`relative inline-block min-w-0 ${nameClass} transition-colors hover:text-accent-400`}
    >
      {exp.company}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-1 left-0 h-[3px] w-full bg-current transition-transform duration-500 ease-out ${
          drawn ? "origin-left scale-x-100" : "origin-right scale-x-0"
        }`}
      />
    </a>
  );
}

function TourDates({ t }) {
  return (
    <ol className={`border-t ${t.border}`}>
      {EXPERIENCE.map((exp, i) => {
        const date = exp.period || exp.duration || "";
        const parts = date.split(/\s+[-–]\s+/);
        const current = /present/i.test(date);
        const no = String(i + 1).padStart(2, "0");
        const status = current ? (
          <span className={`inline-flex items-center gap-1.5 ${t.accent}`}>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            Current
          </span>
        ) : (
          <span className={t.textFaint}>Completed</span>
        );
        return (
          <Reveal key={`${exp.company}-${i}`} delay={i * 80}>
            <li className={`group grid grid-cols-[4.25rem_minmax(0,1fr)] gap-x-4 border-b py-6 sm:grid-cols-[3rem_10rem_minmax(0,1fr)] sm:gap-x-6 sm:py-8 lg:grid-cols-[3rem_10rem_minmax(0,1fr)_14rem] lg:py-11 ${t.border}`}>
              <div className="sm:hidden">
                <p className={`font-mono text-xs tabular-nums ${current ? t.accent : t.textFaint}`}>{no}</p>
                <p className={`mt-3 font-mono text-[11px] uppercase leading-snug tracking-wider ${current ? t.text : t.textMuted}`}>
                  {parts.map((part, pi) => (
                    <span key={pi} className="block">{pi > 0 ? "– " : ""}{part}</span>
                  ))}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest">{status}</p>
              </div>

              <p className={`hidden pt-1 font-mono text-xs tabular-nums transition-colors group-hover:text-accent-400 sm:block ${current ? t.accent : t.textFaint}`}>{no}</p>

              <div className="hidden sm:block">
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest">{status}</p>
                <p className={`font-mono text-xs uppercase tracking-wider ${current ? t.text : t.textMuted}`}>{date}</p>
              </div>

              <div className="min-w-0">
                <h3 className="text-balance">
                  <ExperienceName
                    exp={exp}
                    t={t}
                    className={`font-display text-[1.5rem] font-bold uppercase leading-[1.04] tracking-tight sm:text-4xl lg:text-5xl ${t.text}`}
                  />
                </h3>
                <p className={`mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest ${t.textMuted}`}>
                  {exp.logo && (
                    <span className={`h-5 w-5 shrink-0 overflow-hidden rounded bg-white p-px`}>
                      <PortfolioImage imageKey={exp.logo} alt="" fallbackLabel={exp.company} className="h-full w-full object-contain" />
                    </span>
                  )}
                  <span className="min-w-0">{exp.location}</span>
                </p>
                <p className={`mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-widest sm:hidden ${t.textFaint}`}>{exp.position}</p>
              </div>

              <p className={`hidden font-mono text-[11px] uppercase leading-relaxed tracking-widest sm:col-start-3 sm:mt-1 sm:block lg:col-start-auto lg:text-right ${t.textFaint}`}>
                {exp.position}
              </p>
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}

export function ExperienceSection({ t, isDark }) {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <Reveal>
        <SectionLabel side="SIDE B" no="005" name="Tour History" t={t} />
        <h2 className="tour-title mt-6 whitespace-nowrap font-display font-bold uppercase leading-[0.92] tracking-tight">
          <span className={t.text}>Tour history</span>
        </h2>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <p className={`hero-outline font-display text-2xl font-bold uppercase leading-none tracking-tight sm:text-4xl ${t.accent}`}>
            The journey so far.
          </p>
          <p className={`max-w-xs font-body text-sm leading-relaxed ${t.textMuted}`}>
            A timeline of roles, responsibilities, and professional growth.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 sm:mt-14">
        <TourDates t={t} />
      </div>

      <div className="mt-6 text-right">
        <a
          href="#experience"
          className={`group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] ${t.textMuted} hover:text-accent-400 transition-colors`}
        >
          Full history
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}