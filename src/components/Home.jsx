import React, { useState } from "react";
import { img } from "../images.js";
import { Reveal, renderDescription, SectionHeading, ViewMore } from "./ui.jsx";
import { PROFILE, LOGO_SKILLS, SKILL_TOTAL, LABS, WEB_APPS, ALL_PROJECTS, EXPERIENCE, PATHWAY_ICONS, experienceYear, HOME_PROJECT_BY_TAB, hasLink, thumbFor } from "../data.js";
import { Wrench, Code2, Network, ArrowUpRight, ArrowRight, Github, ExternalLink, Briefcase } from "../icons.jsx";


export function ExperienceTimeline({ t, isDark }) {
  const lineColor = isDark ? "bg-neutral-800" : "bg-slate-200";
  return (
    <ol className="max-w-3xl mx-auto">
      {EXPERIENCE.map((exp, i) => {
        const last = i === EXPERIENCE.length - 1;
        const RoleIcon = PATHWAY_ICONS[exp.pathway] || Briefcase;
        return (
          <Reveal key={`${exp.company}-${i}`} delay={i * 80}>
            <li className={`relative pl-16 sm:pl-[4.5rem] ${last ? "" : "pb-14"}`}>
              {!last && <span aria-hidden="true" className={`absolute left-5 top-12 -bottom-0 w-px ${lineColor}`} />}

              <div className={`absolute left-0 top-0 h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-lg border ${t.border} ${isDark ? "bg-neutral-950" : "bg-white"} flex items-center justify-center ${t.textMuted}`}>
                {exp.logo ? (
                  <img src={img(exp.logo)} alt={`${exp.company} logo`} className="h-full w-full object-cover" />
                ) : (
                  <RoleIcon size={18} />
                )}
              </div>

              <h3 className="font-display font-semibold text-lg leading-snug">{exp.company}</h3>
              {(exp.location || exp.employment) && (
                <p className={`font-mono text-xs ${t.textMuted} mt-1`}>
                  {[exp.location, exp.employment].filter(Boolean).join(" · ")}
                </p>
              )}

              <h4 className="font-display font-medium text-base mt-6">{exp.position}</h4>
              {exp.period && <p className={`font-mono text-[11px] uppercase tracking-wider ${t.textFaint} mt-1.5`}>{exp.period}</p>}
              {Array.isArray(exp.description) ? (
                <ul className={`mt-4 max-w-xl space-y-2 text-sm leading-relaxed ${t.textMuted}`}>
                  {exp.description.map((line) => (
                    <li key={line} className="relative pl-4">
                      <span aria-hidden="true" className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-current opacity-60" />
                      {line}
                    </li>
                  ))}
                </ul>
              ) : (
                exp.description && <p className={`text-sm leading-relaxed ${t.textMuted} mt-4 max-w-xl`}>{exp.description}</p>
              )}
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}


export function HeroSection({ t, isDark, mailtoUrl, openResumes }) {
  // Hover previews color (mouse only). Click flips whatever is currently shown.
  const [photoHover, setPhotoHover] = useState(false);
  const [photoOverride, setPhotoOverride] = useState(null); // null | "color" | "gray"
  const photoColor = photoOverride ? photoOverride === "color" : photoHover;
  const togglePhoto = () => setPhotoOverride(photoColor ? "gray" : "color");
  const tiles = [
    { big: "Resume", label: "Download CV", onClick: openResumes },
    { big: "LinkedIn", label: "Let's connect", href: PROFILE.linkedin, external: true },
    { big: "Email", label: PROFILE.email, href: mailtoUrl },
    { big: "GitHub", label: "See my code", href: PROFILE.github, external: true },
  ];
  return (
    <section id="hero" className="relative pt-16 lg:pt-0 overflow-hidden flex items-center" style={{ minHeight: "92vh" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-stretch">

          <div className="min-w-0">
            <Reveal delay={60}>
              <h2 className="hero-role font-display font-bold uppercase text-center lg:text-left">
                <span className={`block ${t.text}`}>Software &</span>
                <span className={`block hero-outline ${t.accent}`}>Networking</span>
              </h2>
              <p className={`mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] ${t.textFaint} sm:hidden`}>
                01 / From {PROFILE.location}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div
                role="button"
                tabIndex={0}
                aria-pressed={photoColor}
                aria-label={photoColor ? "Photo is in color. Click to make it black and white" : "Photo is black and white. Click to show color"}
                className={`mt-7 sm:mt-9 aspect-[16/9] overflow-hidden rounded-md border cursor-pointer select-none ${t.border}`}
                onClick={togglePhoto}
                onPointerEnter={(e) => e.pointerType === "mouse" && setPhotoHover(true)}
                onPointerLeave={() => {
                  setPhotoHover(false);
                  // a forced-black state ends when the cursor leaves, so hover works again next time
                  setPhotoOverride((o) => (o === "gray" ? null : o));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    togglePhoto();
                  }
                }}
              >
                <img
                  src={img("aboutme-photo-main")}
                  alt="Rose Kate Zonio"
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover transition-[filter] duration-500 ${
                    photoColor ? "grayscale-0 contrast-100" : "grayscale contrast-110"
                  }`}
                />
              </div>
            </Reveal>
          </div>

          <div className="flex min-w-0 flex-col gap-7 sm:gap-10 lg:text-right">
            <Reveal delay={120} className="hidden lg:block">
              <p className={`font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] ${t.textFaint}`}>
                01 / From {PROFILE.location}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="space-y-4 font-mono text-[11px] tracking-[0.1em] sm:text-sm sm:tracking-[0.16em] uppercase leading-relaxed text-center lg:text-right">
                <p className={t.text}>Websites on one side. Networks on the other.</p>
                <p className={`hidden sm:block normal-case ${t.textMuted}`}>
                  I build web experiences, configure networks, and explore practical cybersecurity solutions.
                </p>
              </div>
            </Reveal>

            <Reveal delay={320} className="mt-4 lg:mt-8">
              <div className="flex flex-col items-center gap-2 sm:gap-3 lg:items-end">
                <a
                  href="#aboutme"
                  className={`group inline-flex items-baseline gap-2 whitespace-nowrap font-display text-xl font-medium uppercase leading-tight sm:text-3xl ${t.text} underline underline-offset-8 decoration-1 hover:text-accent-400 transition-colors`}
                >
                  More about me
                  <ArrowUpRight size={20} className={`${t.accent} shrink-0 self-center transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5`} />
                </a>
                <a
                  href="#labs"
                  className={`group inline-flex items-baseline gap-2 whitespace-nowrap font-display text-xl font-medium uppercase leading-tight sm:text-3xl ${t.text} underline underline-offset-8 decoration-1 hover:text-accent-400 transition-colors`}
                >
                  View selected projects
                  <ArrowUpRight size={20} className={`${t.accent} shrink-0 self-center transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5`} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={400} className="lg:mt-auto">
              <h1 className="hero-name hidden lg:inline-flex flex-col items-center self-center lg:self-end font-display font-bold uppercase">
                <span className={t.text}>Rose Kate</span>
                <span className="flex w-full items-baseline justify-between">
                  <span className={`hero-handle ${t.textMuted}`}>(@arkyxo)</span>
                  <span className={`hero-outline ${t.accent}`}>Zonio</span>
                </span>
              </h1>
            </Reveal>
          </div>
        </div>

        <Reveal delay={440}>
          <div id="about" className={`mt-10 sm:mt-14 border-t ${t.border} pt-7 scroll-mt-24`}>
            <p className={`font-mono text-[11px] uppercase tracking-[0.22em] ${t.textFaint} mb-6`}>Reach me</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-8">
              {tiles.map((item) => {
                const inner = (
                  <>
                    <ArrowUpRight size={14} className={`absolute right-0 top-1 ${t.textFaint} transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-400`} />
                    <p className={`font-display text-xl sm:text-[28px] font-medium leading-tight tracking-tight ${t.text} transition-colors group-hover:text-accent-400`}>
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

      </div>
    </section>
  );
}


export function SkillsSection({ t, isDark, onOpenSkills }) {
  return (
    <section id="skills">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
        <div className="text-center mb-10">
          <Reveal>
            <p className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest ${t.accent} mb-3`}>
              <Wrench size={13} /> 02 · TOOLKIT
            </p>
            <h2 className={`font-display text-2xl sm:text-3xl font-bold ${t.text} mb-4`}>Technical Skills</h2>
            <p className={`font-mono text-xs ${t.textFaint}`}>
              What I use to build software and keep networks running.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="marquee-mask">
            <div
              className="marquee-track"
              style={{ animationDuration: `${LOGO_SKILLS.length * 3}s` }}
            >
              {[...LOGO_SKILLS, ...LOGO_SKILLS].map((item, i) => (
                <div
                  key={item.name + i}
                  title={item.name}
                  className={`h-16 w-16 shrink-0 rounded-2xl border ${t.border} ${
                    isDark ? "bg-black/40" : "bg-slate-50"
                  } flex items-center justify-center p-2`}
                >
                  <div className="h-full w-full rounded-lg bg-white flex items-center justify-center p-1.5 shadow-sm">
                    <img src={img(item.icon)} alt={item.name} className="h-full w-full object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 text-center">
          <ViewMore t={t} onClick={onOpenSkills}>View more skills ({SKILL_TOTAL})</ViewMore>
        </div>
      </div>
    </section>
  );
}


export function ProjectsSection({ t, isDark, projectTab, onSwitchTab, revealed, onToggleReveal, onOpenArchive }) {
  const featured = (projectTab === "labs" ? LABS : WEB_APPS).filter((p) => p.title === HOME_PROJECT_BY_TAB[projectTab]);
  return (
    <section id="labs" className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <div className="text-center mb-10 sm:mb-14">
        <p className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest ${t.accent} mb-3`}>
          <Code2 size={13} /> {projectTab === "labs" ? "04 · NETWORKING & IT LOG" : "04 · SOFTWARE LOG"}
        </p>
        <div className="flex flex-wrap items-baseline justify-center gap-3">
          {[["webapps", "Software"], ["labs", "Networking & IT"]].map(([key, label], i) => (
            <React.Fragment key={key}>
              {i > 0 && <span className={`font-display text-2xl sm:text-3xl font-bold ${t.textFaint}`}>/</span>}
              <button
                onClick={() => onSwitchTab(key)}
                aria-pressed={projectTab === key}
                className={`font-display text-2xl sm:text-3xl font-bold pb-1 border-b-2 transition-colors ${
                  projectTab === key ? `${t.text} border-accent-400` : `${t.textFaint} border-transparent hover:${t.textMuted}`
                }`}
              >
                {label}
              </button>
            </React.Fragment>
          ))}
        </div>
        <p className={`font-mono text-xs ${t.textFaint} mt-3`}>
          A few things I've built. The full list lives in the project log.
        </p>
      </div>

      <div className="space-y-20 sm:space-y-28">
        {featured.map((item, i) => {
          const flip = i % 2 === 1;
          const GroupIcon = projectTab === "labs" ? Network : Code2;
          return (
            <Reveal key={item.title}>
              <div className="fade-bottom -mx-4 max-h-[30rem] overflow-hidden px-4 lg:max-h-[26rem]">
                <div className="grid sm:grid-cols-12 items-center gap-y-6">
                  <div className={`sm:row-start-1 ${flip ? "sm:col-start-6 sm:col-end-13" : "sm:col-start-1 sm:col-end-8"}`}>
                    <div className={`group relative aspect-[16/10] rounded-lg overflow-hidden border ${t.border} ${t.surface}`}>
                      {item.thumbnail ? (
                        <>
                          <img
                            src={img(thumbFor(item, isDark))}
                            alt={`${item.title} preview`}
                            loading="lazy"
                            decoding="async"
                            onClick={() => onToggleReveal(item.title)}
                            className={`absolute left-2 top-2 sm:left-2.5 sm:top-2.5 h-[calc(100%-1rem)] w-[calc(100%-1rem)] sm:h-[calc(100%-1.25rem)] sm:w-[calc(100%-1.25rem)] rounded-md object-cover object-top cursor-pointer transition-[filter] duration-500 ease-out ${
                              revealed[item.title] ? "grayscale-0 contrast-100" : "grayscale contrast-125"
                            } group-hover:grayscale-0 group-hover:contrast-100`}
                          />
                          <span
                            className={`absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-black/50 text-white/80 transition-opacity duration-300 pointer-events-none ${
                              revealed[item.title] ? "opacity-0" : "opacity-100 sm:group-hover:opacity-0"
                            }`}
                          >
                            {revealed[item.title] ? "" : "Tap or hover"}
                          </span>
                        </>
                      ) : (
                        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-accent-400/10 ${t.accent}`}>
                          <GroupIcon size={40} />
                          <span className="relative font-mono text-xs tracking-widest uppercase">{item.eyebrow}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div {...{ inert: "" }} className={`relative z-10 sm:row-start-1 ${flip ? "sm:col-start-1 sm:col-end-8" : "sm:col-start-6 sm:col-end-13 sm:text-right"}`}>
                    <p className={`font-mono text-xs tracking-wide ${t.accent}`}>{item.eyebrow}</p>
                    <h3 className={`font-display font-bold text-2xl sm:text-[28px] mt-1 ${t.text}`}>{item.title}</h3>
                    <div className={`hidden lg:block mt-5 rounded-lg border ${t.border} p-5 shadow-xl font-body text-sm leading-relaxed ${t.textMuted} ${isDark ? "bg-neutral-800/95" : "bg-white"} text-left`}>
                      {renderDescription(item.description, t)}
                    </div>
                    <ul className={`mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs ${t.textMuted} ${flip ? "" : "sm:justify-end"}`}>
                      {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                    <div className={`mt-4 flex items-center gap-4 ${t.textMuted} ${flip ? "" : "sm:justify-end"}`}>
                      {hasLink(item.github) && (
                        <a href={item.github} target="_blank" rel="noreferrer" aria-label={`${item.title} on GitHub`} className="hover:text-accent-400 transition-colors"><Github size={19} /></a>
                      )}
                      {hasLink(item.view) && (
                        <a href={item.view} target="_blank" rel="noreferrer" aria-label={`${item.title} preview`} className="hover:text-accent-400 transition-colors"><ExternalLink size={19} /></a>
                      )}
                      {item.privateDemo && (
                        <span role="img" aria-disabled="true" aria-label={`${item.title} live demo unavailable, private project`} title="Live demo unavailable: private project" className="opacity-30 cursor-not-allowed"><ExternalLink size={19} /></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <ViewMore t={t} onClick={onOpenArchive}>View all my projects ({ALL_PROJECTS.length})</ViewMore>
      </div>
    </section>
  );
}


export function ExperienceSection({ t, isDark }) {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <SectionHeading
        eyebrow="05 · TIMELINE"
        title="Experience"
        icon={Briefcase}
        t={t}
      />

      <Reveal>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between gap-4 pb-5">
            <p className={`font-mono text-xs tracking-wide ${t.textFaint}`}>Internships and work experience.</p>
            <a
              href="#experience"
              className={`group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] ${t.textMuted} hover:text-accent-400 transition-colors`}
            >
              Full history
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <ul className={`border-t ${t.border}`}>
            {EXPERIENCE.map((exp, i) => (
              <li
                key={`${exp.company}-${i}`}
                className={`grid grid-cols-[3.5rem_1fr] sm:grid-cols-[6.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b ${t.border} py-3.5 sm:py-4`}
              >
                <span className={`font-mono text-[11px] ${t.textFaint}`}>{experienceYear(exp)}</span>
                <span className={`font-body text-sm sm:text-[15px] font-medium ${t.text}`}>{exp.position}</span>
                <span className={`col-start-2 sm:col-start-3 font-body text-xs sm:text-sm ${t.textMuted} sm:text-right`}>
                  {exp.company}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}