import React from "react";
import { PortfolioImage } from "../images.jsx";
import { Reveal, PageHeader } from "./ui.jsx";
import { ActivityRow } from "./Sections.jsx";
import { ExperienceTimeline } from "./Home.jsx";
import { CERTIFICATIONS, ACTIVITIES, ABOUT_ME, ABOUT_PHOTOS, EDUCATION, AFFILIATIONS, hasLink, eduProgress, initialsOf } from "../data.js";
import { CheckCircle2, Clock, ExternalLink, ArrowUpRight, User } from "../icons.jsx";

export const PENDING_STATUSES = ["In Progress", "Planned", "Upcoming"];
export const isEarnedCert = (cert) => !PENDING_STATUSES.includes(cert.status);

export function CertificationSection({ t, isDark }) {
  const groups = [
    { label: "Earned", items: CERTIFICATIONS.filter(isEarnedCert) },
    { label: "In progress & planned", items: CERTIFICATIONS.filter((c) => !isEarnedCert(c)) },
  ].filter((g) => g.items.length > 0);

  return (
    <section id="certification">
      <PageHeader title="Certifications" subtitle="Credentials I've earned and the ones I'm working toward." t={t} isDark={isDark} />

      {groups.map((group) => (
        <div key={group.label} className="mt-10 first:mt-10">
          <p className={`font-mono text-[11px] tracking-[0.2em] uppercase ${t.accent}`}>{group.label}</p>
          <ul className={`mt-3 border-t ${t.border}`}>
            {group.items.map((cert) => {
              const earned = isEarnedCert(cert);
              const StatusIcon = earned ? CheckCircle2 : Clock;
              return (
                <li key={cert.name} className={`border-b ${t.border}`}>
              <div className="flex items-center gap-4 sm:gap-5 py-4 sm:py-5">
                <div className={`shrink-0 w-16 h-11 sm:w-20 sm:h-14 rounded-lg border ${t.border} overflow-hidden bg-white p-1.5 flex items-center justify-center`}>
                  {cert.image ? (
                    <PortfolioImage imageKey={cert.image} alt={`${cert.name} badge`} fallbackLabel={cert.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <StatusIcon size={20} className="text-slate-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-display font-semibold">{cert.name}</span>
                  <p className={`text-sm ${t.textMuted} mt-1 leading-snug`}>{cert.org}</p>
                  <div className={`mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm ${t.textFaint}`}>
                    <span className={`inline-flex items-center gap-1.5 ${earned ? t.text : ""}`}>
                      <StatusIcon size={13} /> {cert.status}
                    </span>
                    <span>{earned ? `Completed ${cert.date}` : cert.date !== cert.status ? cert.date : "Date TBA"}</span>
                    {cert.credentialId && <span>ID · {cert.credentialId}</span>}
                    {hasLink(cert.verifyUrl) ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 underline underline-offset-4 decoration-1 ${t.textMuted} hover:text-accent-400 transition-colors`}
                      >
                        {cert.verifyLabel || "Verify"} <ExternalLink size={12} />
                      </a>
                    ) : (
                      earned && <span>Verification soon</span>
                    )}
                  </div>
                  {cert.skills?.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {cert.skills.map((s) => (
                        <span key={s} className={`rounded-full border ${t.border} px-2 py-0.5 text-[11px] ${t.textFaint}`}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
                <span className={`hidden sm:block shrink-0 text-sm ${t.textFaint}`}>{cert.category}</span>
              </div>
            </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}

export function ExperienceHistory({ t, isDark }) {
  return (
    <section id="experience-history">
      <PageHeader title="Experience" subtitle="Internships and work experience, newest first." t={t} isDark={isDark} />
      <div className="mt-10 sm:mt-14">
        <ExperienceTimeline t={t} isDark={isDark} className="w-full" />
      </div>
    </section>
  );
}

export function ActivitiesJourney({ t, isDark }) {
  return (
    <section>
      <PageHeader title="Side Quest" subtitle="The journey so far: where I've been and what I've been building, newest first." t={t} isDark={isDark} />
      <div className="mt-12 sm:mt-16 space-y-14 lg:space-y-28">
        {ACTIVITIES.map((f, i) => (
          <Reveal key={f.title}>
            <ActivityRow f={f} reverse={i % 2 === 1} t={t} isDark={isDark} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AboutPhoto({ photo, isDark }) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        className={`overflow-hidden rounded-2xl border-[3px] shadow-xl ${isDark ? "border-neutral-800 bg-neutral-900" : "border-white bg-slate-100"}`}
        style={{ aspectRatio: "1456 / 735" }}
      >
        <PortfolioImage imageKey={photo.image} alt={photo.caption} fallbackLabel={photo.caption} draggable={false} className="h-full w-full object-cover" />
      </div>
      <p className={`mt-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] ${isDark ? "text-neutral-500" : "text-slate-400"}`}>
        Frame 01 · {photo.caption} · between takes
      </p>
    </div>
  );
}

export function AboutMeSection({ t, isDark }) {
  const mainBlocks = ABOUT_ME;
  return (
    <section id="aboutme">
      <PageHeader eyebrow="MORE ABOUT ME" EyebrowIcon={User} title="A little more of me" t={t} isDark={isDark} centered />

      <div className="mx-auto mt-10 max-w-2xl sm:mt-14">
        <AboutPhoto photo={ABOUT_PHOTOS[0]} isDark={isDark} />

        <p className="font-serif-read font-normal text-3xl sm:text-5xl tracking-[-0.025em] leading-[1.1] mt-14">
          Hi, I'm <span className={t.accent}>RK</span>!
        </p>

        <div className="mt-8 space-y-7">
          {mainBlocks.map((block, i) => (
            <p
              key={i}
              style={{ hyphens: "auto", WebkitHyphens: "auto" }}
              className={`font-body text-base sm:text-[17px] leading-[1.8] text-left sm:text-justify ${t.textMuted}`}
            >
              {block}
            </p>
          ))}
        </div>

        <div className="mt-14">
          <p className={`font-mono text-[11px] tracking-widest uppercase ${t.accent}`}>Foundation</p>
          <h3 className="font-serif-read font-normal text-3xl tracking-[-0.02em] mt-1">Education</h3>
          <ul className={`mt-4 border-t ${t.border}`}>
            {EDUCATION.map((edu) => (
              <EducationRow key={edu.program} edu={edu} t={t} isDark={isDark} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function AffiliationSection({ t, isDark }) {
  return (
    <section id="affiliation">
      <PageHeader title="Affiliations" subtitle="Organizations and communities I'm part of." t={t} isDark={isDark} />

      <ul>
        {AFFILIATIONS.map((org) => (
          <li key={org.company} className={`border-b ${t.border}`}>
            <div className="flex items-center gap-4 sm:gap-5 py-4 sm:py-5">
              <div className={`shrink-0 aspect-square w-14 sm:w-16 rounded-lg border ${t.border} overflow-hidden bg-white p-1.5 flex items-center justify-center`}>
                {org.logo ? (
                  <PortfolioImage imageKey={org.logo} alt={`${org.company} logo`} fallbackLabel={org.company} className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-display font-semibold text-sm text-slate-900">{org.abbr}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-display font-semibold">{org.company}</span>
                <p className={`text-sm ${t.textMuted} mt-1 leading-snug`}>{org.position}</p>
                {org.links.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1">
                    {org.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 text-sm underline underline-offset-4 decoration-1 ${t.textMuted} hover:text-accent-400 transition-colors`}
                      >
                        {link.label} <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <span className={`hidden sm:block shrink-0 text-sm ${t.textFaint}`}>{org.duration}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function EducationRow({ edu, t, isDark }) {
  const { done, startY, endY } = eduProgress(edu.duration);
  return (
    <li className={`flex items-center gap-4 border-b ${t.border} py-4`}>
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white p-1 ring-1 ring-black/10 flex items-center justify-center">
        {edu.logo ? (
          <PortfolioImage imageKey={edu.logo} alt={edu.institution} fallbackLabel={edu.institution} className="h-full w-full object-contain" />
        ) : (
          <span className="font-mono text-xs font-bold text-accent-500">{initialsOf(edu.institution)}</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display font-semibold text-[15px] leading-snug">{edu.program}</p>
        <p className={`font-body text-[13px] ${t.textMuted} mt-0.5`}>{edu.institution}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className={`font-mono text-xs ${t.text}`}>{startY} - {endY}</p>
        <p className={`mt-1 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider ${done ? t.textFaint : t.accent}`}>
          {!done && <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />}
          {done ? "Graduated" : "In progress"}
        </p>
      </div>
    </li>
  );
}