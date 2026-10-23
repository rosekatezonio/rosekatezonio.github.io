import React from "react";
import { img } from "../images.js";
import { Reveal, HeroPill, renderDescription, SectionHeading } from "./ui.jsx";
import { PROFILE, HERO_PILLS, LOGO_SKILLS, SKILL_TOTAL, LABS, WEB_APPS, ALL_PROJECTS, EXPERIENCE, PATHWAY_ICONS, hasLink, thumbFor } from "../data.js";
import { User, Wrench, Code2, Network, ArrowRight, ArrowUpRight, Github, ExternalLink, Briefcase } from "../icons.jsx";


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
              {exp.description && (
                <p className={`text-sm leading-relaxed ${t.textMuted} mt-4 max-w-xl`}>{exp.description}</p>
              )}
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}


export function HeroSection({ t, isDark }) {
  return (
    <section id="hero" className="relative pt-16 lg:pt-0 flex items-center overflow-hidden" style={{ minHeight: "92vh" }}>
      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24 w-full text-center">
        <h1 className="sr-only">Rose Kate Zonio. Websites on one side, networks on the other.</h1>

        <Reveal delay={80}>
          <div className={`hero-frame ${isDark ? "hero-frame-dark" : "hero-frame-light"}`}>
            <div className="hero-body">
              <p aria-hidden="true" className={`hero-name font-display font-bold uppercase ${t.text}`}>
                <span className="block">Rose Kate</span>
                <span className="block">Zonio</span>
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 sm:gap-4">
                {HERO_PILLS.map((pill) => (
                  <HeroPill key={pill.id} pill={pill} isDark={isDark} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <h2 className={`mt-12 sm:mt-14 font-display font-bold text-[clamp(1.35rem,6.2vw,2.25rem)] leading-tight tracking-tight ${t.text}`}>
            Websites on one side.
            <br /> Networks on the other.
          </h2>
        </Reveal>

        <Reveal delay={360}>
          <p className={`mt-6 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase ${t.accent}`}>
            Seeking OJT / internship · Available now
          </p>
        </Reveal>
      </div>
    </section>
  );
}


export function AboutSection({ t, isDark, mailtoUrl, openResumes }) {
  return (
    <section id="about" className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
        <Reveal className="lg:col-span-5">
          <p className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest ${t.accent} mb-3`}>
            <User size={13} /> 01 · WHO I AM
          </p>
          <h2 className={`font-display text-3xl sm:text-4xl font-bold ${t.text} mb-6`}>About Me</h2>
          <p className={`font-display text-xl sm:text-2xl font-medium leading-snug ${t.text}`}>
            Hi, I'm <span className={t.accent}>RK</span>. I'm a Computer Engineering student who builds
            software and understands the network it runs on.{" "}
            <a
              href="#aboutme"
              className={`group relative inline-block whitespace-nowrap pr-6 underline decoration-1 underline-offset-4 transition-colors ${isDark ? "text-neutral-300 hover:text-white" : "text-slate-600 hover:text-black"}`}
            >
              More about me
              <ArrowRight size={14} className="absolute right-0 top-1.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </p>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-8">
            {[
              { big: "Resume", label: "Download CV", onClick: openResumes },
              { big: "LinkedIn", label: "Let's connect", href: PROFILE.linkedin, external: true },
              { big: "Email", label: PROFILE.email, href: mailtoUrl, external: false },
              { big: "GitHub", label: "See my code", href: PROFILE.github, external: true },
            ].map((item) => {
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
                <button key={item.big} onClick={item.onClick} className="group relative block pr-5 text-left">
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
          <button
            onClick={onOpenSkills}
            className={`inline-flex items-center gap-2 rounded-lg border border-accent-400 px-6 py-3 font-mono text-sm ${t.accent} hover:bg-accent-400/10 transition-colors`}
          >
            View more skills ({SKILL_TOTAL}) <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}


export function ProjectsSection({ t, isDark, projectTab, onSwitchTab, revealed, onToggleReveal, onOpenArchive }) {
  const featured = (projectTab === "labs" ? LABS : WEB_APPS).slice(0, 3);
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

                <div className={`relative z-10 sm:row-start-1 ${flip ? "sm:col-start-1 sm:col-end-8" : "sm:col-start-6 sm:col-end-13 sm:text-right"}`}>
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
            </Reveal>
          );
        })}
      </div>

      <div className="mt-20 text-center">
        <button
          onClick={onOpenArchive}
          className={`inline-flex items-center gap-2 rounded-lg border border-accent-400 px-6 py-3 font-mono text-sm ${t.accent} hover:bg-accent-400/10 transition-colors`}
        >
          View all my projects ({ALL_PROJECTS.length}) <ArrowRight size={15} />
        </button>
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
        caption="Internships and work experience."
        icon={Briefcase}
        t={t}
      />

      <ExperienceTimeline t={t} isDark={isDark} />
    </section>
  );
}
