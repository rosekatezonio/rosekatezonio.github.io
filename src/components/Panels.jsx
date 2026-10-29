import React, { useState, useEffect } from "react";
import { PortfolioImage } from "../images.jsx";
import { useOverlayClose } from "../hooks.js";
import { ActivityLink, Reveal } from "./ui.jsx";
import { ActivityRow } from "./Sections.jsx";
import { ExperienceTimeline } from "./Home.jsx";
import { CERTIFICATIONS, ACTIVITIES, ABOUT_ME, ABOUT_PHOTOS, EDUCATION, AFFILIATIONS, BLOGS, BLOG_PAGE_SIZE, blogSlug, readMinutes, PROFILE, hasLink, eduProgress, initialsOf } from "../data.js";
import { CheckCircle2, Clock, ExternalLink, ArrowUpRight, ArrowLeftIcon, ArrowRight, User } from "../icons.jsx";

export const PENDING_STATUSES = ["In Progress", "Planned", "Upcoming"];
export const isEarnedCert = (cert) => !PENDING_STATUSES.includes(cert.status);

export function CertificationSection({ t, isDark }) {
  const groups = [
    { label: "Earned", items: CERTIFICATIONS.filter(isEarnedCert) },
    { label: "In progress & planned", items: CERTIFICATIONS.filter((c) => !isEarnedCert(c)) },
  ].filter((g) => g.items.length > 0);

  return (
    <section id="certification">
      <h1 className="font-display font-bold text-3xl sm:text-5xl">Certifications</h1>
      <p className={`text-sm sm:text-base ${t.textMuted} mt-3`}>Credentials I've earned and the ones I'm working toward.</p>

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
      <h1 className="font-display font-bold text-3xl sm:text-5xl">Experience</h1>
      <p className={`text-sm sm:text-base ${t.textMuted} mt-3`}>Internships and work experience, newest first.</p>
      <div className="mt-14">
        <ExperienceTimeline t={t} isDark={isDark} />
      </div>
    </section>
  );
}

export function ActivitiesJourney({ t, isDark }) {
  return (
    <section id="activities-journey">
      <h1 className="font-display font-bold text-3xl sm:text-5xl">Activities</h1>
      <p className={`text-sm sm:text-base ${t.textMuted} mt-3`}>The journey so far: where I've been and what I've been building, newest first.</p>

      <div className="mt-14 space-y-14 lg:space-y-28">
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
  const outsideIdx = ABOUT_ME.findIndex((b) => b.startsWith("## "));
  const mainBlocks = outsideIdx === -1 ? ABOUT_ME : ABOUT_ME.slice(0, outsideIdx);
  const outsideTitle = outsideIdx === -1 ? "" : ABOUT_ME[outsideIdx].slice(3);
  const outsideBlocks = outsideIdx === -1 ? [] : ABOUT_ME.slice(outsideIdx + 1);
  return (
    <section id="aboutme" className="max-w-2xl mx-auto">
      <p className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest ${t.accent} mb-3`}>
        <User size={13} /> MORE ABOUT ME
      </p>
      <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">A little more of me</h2>
      <div className="mt-8">
        <AboutPhoto photo={ABOUT_PHOTOS[0]} isDark={isDark} />
      </div>

      <div className="max-w-2xl mx-auto">
        <p className="font-display text-2xl sm:text-3xl font-medium leading-snug mt-14">
          Hi, I'm <span className={t.accent}>RK</span>!
        </p>
      </div>

      <div className="mt-8 max-w-2xl mx-auto space-y-7">
        {mainBlocks.map((block, i) => (
          <p
            key={i}
            style={{ hyphens: "auto", WebkitHyphens: "auto" }}
            className={`font-body text-base sm:text-[17px] leading-[1.8] text-justify ${t.textMuted}`}
          >
            {block}
          </p>
        ))}
      </div>

      {outsideBlocks.length > 0 && (
        <div className={`mt-14 max-w-2xl mx-auto rounded-xl border ${t.border} px-6 py-7 sm:px-8 sm:py-8`}>
          <p className={`font-mono text-[11px] tracking-[0.25em] uppercase ${t.accent}`}>{outsideTitle}</p>
          <div className="mt-6 space-y-6">
            {outsideBlocks.map((block, i) => (
              <p
                key={i}
                style={{ hyphens: "auto", WebkitHyphens: "auto" }}
                className={`font-body text-base sm:text-[17px] leading-[1.8] text-justify ${
                  i === outsideBlocks.length - 1 ? `font-medium ${t.text}` : t.textMuted
                }`}
              >
                {block}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="mt-14 max-w-2xl mx-auto">
        <p className={`font-mono text-[11px] tracking-widest uppercase ${t.accent}`}>Foundation</p>
        <h3 className="font-display font-semibold text-xl mt-1">Education</h3>
        <ul className={`mt-4 border-t ${t.border}`}>
          {EDUCATION.map((edu) => (
            <EducationRow key={edu.program} edu={edu} t={t} isDark={isDark} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AffiliationSection({ t, isDark }) {
  return (
    <section id="affiliation">
      <h1 className="font-display font-bold text-3xl sm:text-5xl">Affiliations</h1>
      <p className={`text-sm sm:text-base ${t.textMuted} mt-3`}>Organizations and communities I'm part of.</p>

      <ul className={`mt-10 border-t ${t.border}`}>
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

export function BlogAuthor({ t, size = 24 }) {
  return (
    <span className="inline-flex items-center gap-2">
      <PortfolioImage imageKey={PROFILE.photo} alt="" fallbackLabel="RK" style={{ width: size, height: size }} className="rounded-full object-cover" />
      <span className={`font-body text-[13px] ${t.text}`}>{PROFILE.name}</span>
    </span>
  );
}

export function BlogSection({ t, isDark }) {
  const categories = ["All", ...Array.from(new Set(BLOGS.map((b) => b.category)))];
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = category === "All" ? BLOGS : BLOGS.filter((b) => b.category === category);
  const totalPages = Math.max(1, Math.ceil(filtered.length / BLOG_PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * BLOG_PAGE_SIZE, current * BLOG_PAGE_SIZE);

  const pickCategory = (c) => {
    setCategory(c);
    setPage(1);
  };
  const goPage = (n) => {
    setPage(n);
    const el = document.getElementById("panel-scroll");
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navBtn = (disabled) =>
    `font-mono text-xs ${disabled ? `${t.textFaint} opacity-40 cursor-not-allowed` : `${t.textMuted} hover:text-accent-400`} transition-colors`;

  return (
    <section id="blogs" className="max-w-3xl mx-auto">
      <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">Blogs</h2>
      <p className={`font-body text-base ${t.textMuted} mt-3`}>Stories and notes from the things I build and join.</p>

      <div className={`mt-8 flex flex-wrap items-center gap-6 border-b ${t.border}`}>
        {categories.map((c) => {
          const on = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => pickCategory(c)}
              aria-pressed={on}
              className={`-mb-px border-b pb-3 font-body text-sm transition-colors ${
                on ? `${isDark ? "border-white text-white" : "border-slate-900 text-slate-900"}` : `border-transparent ${t.textMuted} hover:text-accent-400`
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div>
        {visible.map((post) => (
          <a
            key={post.title}
            href={`#blogs/${blogSlug(post)}`}
            className={`group flex items-start justify-between gap-5 sm:gap-8 border-b ${t.border} py-8`}
          >
            <div className="min-w-0 flex-1">
              <BlogAuthor t={t} size={22} />
              <h3 className="font-display font-bold text-xl sm:text-[22px] leading-snug mt-3 group-hover:underline decoration-1 underline-offset-4">{post.title}</h3>
              <p className={`font-body text-[15px] leading-relaxed ${t.textMuted} mt-2`}>{post.excerpt}</p>
              <p className={`font-body text-[13px] ${t.textFaint} mt-4 flex flex-wrap items-center gap-x-3 gap-y-2`}>
                <span>{post.date}</span>
                <span className={`rounded-full ${isDark ? "bg-white/10" : "bg-slate-100"} px-2.5 py-0.5 ${t.textMuted}`}>{post.category}</span>
                <span>{readMinutes(post)} min read</span>
              </p>
            </div>
            <PortfolioImage
              imageKey={post.image}
              alt=""
              fallbackLabel={post.title}
              loading="lazy"
              className={`h-20 w-20 sm:h-28 sm:w-40 shrink-0 rounded-md object-cover ${post.position}`}
            />
          </a>
        ))}
        {visible.length === 0 && <p className={`py-10 text-center font-mono text-xs ${t.textFaint}`}>No posts yet.</p>}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <button type="button" disabled={current === 1} onClick={() => goPage(current - 1)} className={`inline-flex items-center gap-1.5 ${navBtn(current === 1)}`}>
            <ArrowLeftIcon size={13} /> prev
          </button>
          <span className={`font-mono text-xs ${t.textMuted}`}>{current} / {totalPages}</span>
          <button type="button" disabled={current === totalPages} onClick={() => goPage(current + 1)} className={`inline-flex items-center gap-1.5 ${navBtn(current === totalPages)}`}>
            next <ArrowRight size={13} />
          </button>
        </div>
      )}
    </section>
  );
}

export function BlogArticle({ t, isDark, post, onBack }) {
  const [closing, requestClose] = useOverlayClose(onBack);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  const copyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div id="panel-scroll" className={`${closing ? "overlay-sink" : "overlay-rise"} fixed inset-0 z-[70] overflow-y-auto ${t.bg} ${t.text}`}>
      <article className="mx-auto w-full max-w-[680px] px-5 pt-10 sm:pt-14 pb-24">
        <button onClick={requestClose} className={`inline-flex items-center gap-1.5 font-mono text-xs ${t.textMuted} hover:text-accent-400 transition-colors`}>
          <ArrowLeftIcon size={13} /> all posts
        </button>

        <h1 className="font-display font-bold text-[32px] sm:text-[42px] leading-[1.15] tracking-tight mt-10">{post.title}</h1>
        <p className={`font-body text-lg sm:text-xl leading-relaxed ${t.textMuted} mt-4`}>{post.excerpt}</p>

        <div className={`mt-8 flex items-center justify-between gap-4 border-y ${t.border} py-4`}>
          <div className="flex items-center gap-3 min-w-0">
            <PortfolioImage imageKey={PROFILE.photo} alt="" fallbackLabel="RK" className="h-11 w-11 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="font-body text-sm font-medium leading-tight">{PROFILE.name}</p>
              <p className={`font-body text-[13px] ${t.textMuted} mt-0.5`}>
                {readMinutes(post)} min read · {post.date}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={copyLink}
            className={`shrink-0 inline-flex items-center gap-1.5 font-body text-[13px] ${t.textMuted} hover:text-accent-400 transition-colors`}
          >
            <ExternalLink size={14} /> {copied ? "Link copied" : "Share"}
          </button>
        </div>

        {post.hero && (
          <PortfolioImage imageKey={post.image} alt={post.title} fallbackLabel={post.title} className={`mt-8 aspect-[16/10] w-full rounded-lg object-cover ${post.position}`} />
        )}

        <div className="font-serif-read mt-10 text-[19px] sm:text-[21px] leading-[1.75] text-justify">
          {post.body.map((block, i) =>
            block.startsWith("## ") ? (
              <h2 key={i} className="font-display font-bold text-2xl sm:text-[28px] leading-snug tracking-tight mt-12 mb-1">{block.slice(3)}</h2>
            ) : (
              <p key={i} className="mt-7 first:mt-0">{block}</p>
            )
          )}
        </div>

        {post.links.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            {post.links.map((link) => (
              <ActivityLink key={link.label} link={link} t={t} isDark={isDark} />
            ))}
          </div>
        )}

        <div className={`mt-12 pt-8 border-t ${t.border} flex flex-wrap items-center gap-3`}>
          <span className={`rounded-full ${isDark ? "bg-white/10" : "bg-slate-100"} px-3.5 py-1.5 font-body text-[13px] ${t.textMuted}`}>{post.category}</span>
        </div>
      </article>
    </div>
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