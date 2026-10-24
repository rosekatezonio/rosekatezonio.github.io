import React, { useState, useEffect, useRef } from "react";
import { img } from "../images.js";
import { ACTIVITIES, PROFILE } from "../data.js";
import { Reveal, SectionHeading, ActivityLink, ViewMore } from "./ui.jsx";
import { Trophy, Github, MapPin, ArrowLeftRight, ArrowRight } from "../icons.jsx";

export function ActivityRow({ f, reverse, t, isDark }) {
  const [swapped, setSwapped] = useState(false);
  const photos = [
    { src: f.image, alt: f.inset ? `${f.title} group photo` : f.title, position: f.imagePosition || "object-center" },
    ...(f.inset ? [{ src: f.inset, alt: `${f.title} stage`, position: "object-center" }] : []),
  ];
  const [main, small] = swapped && photos[1] ? [photos[1], photos[0]] : photos;
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className={`relative w-full max-w-md mx-auto lg:max-w-none ${f.inset ? "pb-10 pr-8 sm:pb-14 sm:pr-14" : ""} ${reverse ? "lg:order-2" : ""}`}>
        <img src={img(main.src)} alt={main.alt} className={`aspect-[16/9] sm:aspect-[4/3] w-full rounded-3xl object-cover ${main.position} border ${t.border}`} />
        {f.inset && small && (
          <button
            type="button"
            onClick={() => setSwapped((v) => !v)}
            aria-label="Swap photos"
            title="Swap photos"
            className={`group absolute bottom-0 right-0 w-32 sm:w-44 overflow-hidden rounded-2xl ring-4 ${isDark ? "ring-black" : "ring-slate-50"} transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-accent-400`}
          >
            <img src={img(small.src)} alt={small.alt} className={`block aspect-[4/3] w-full object-cover ${small.position}`} />
            <span className="absolute bottom-2 left-2 rounded-full bg-black/60 p-1.5 text-white transition-colors group-hover:text-accent-400">
              <ArrowLeftRight size={12} />
            </span>
          </button>
        )}
      </div>

      <div className="text-center lg:text-left">
        <p className={`font-mono text-xs tracking-wide ${t.textMuted}`}>
          <span className={t.accent}>{f.label}</span> / {f.date}
        </p>
        <h3 className={`font-display font-bold text-[26px] sm:text-4xl tracking-tight leading-tight text-balance ${t.text} mt-4`}>{f.title}</h3>
        <p className={`inline-flex items-center gap-1.5 font-body font-semibold text-base ${t.accent} mt-3`}>
          <MapPin size={15} /> {f.location}
        </p>
        <p className={`font-body text-base leading-relaxed text-left ${t.textMuted} mt-5 max-w-lg mx-auto lg:mx-0`}>{f.description}</p>
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 sm:gap-x-8 mt-8">
          {f.links.map((link) => (
            <ActivityLink key={link.label} link={link} t={t} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LatestActivities({ t, isDark }) {
  const [first] = ACTIVITIES;
  return (
    <section id="activities" className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <SectionHeading eyebrow="03 · OUT IN THE COMMUNITY" title="Latest Activities" caption="What I've been building and where I've been." icon={Trophy} t={t} />

      <Reveal>
        <div {...{ inert: "" }} className="fade-bottom max-h-[28rem] overflow-hidden lg:max-h-[24rem]">
          <ActivityRow f={first} reverse={false} t={t} isDark={isDark} />
        </div>
        <div className="mt-8 flex justify-center">
          <ViewMore t={t} href="#activities">
            View more<span className="sr-only"> activities</span>
          </ViewMore>
        </div>
      </Reveal>
    </section>
  );
}

export const HEAT_LIGHT = ["#EBEDF0", "#9BE9A8", "#40C463", "#30A14E", "#216E39"];
export const HEAT_DARK = ["#161B22", "#0E4429", "#006D32", "#26A641", "#39D353"];

export function GithubActivity({ t, isDark }) {
  const [status, setStatus] = useState("loading");
  const [weeks, setWeeks] = useState([]);
  const [stats, setStats] = useState({ total: 0, activeDays: 0, longest: 0, current: 0 });
  const scrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${PROFILE.githubUsername}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((json) => {
        if (cancelled || !json || !Array.isArray(json.contributions)) throw new Error("Bad payload");
        const days = json.contributions;
        const total = days.reduce((acc, d) => acc + (d.count || 0), 0);
        const activeDays = days.filter((d) => d.count > 0).length;

        let longest = 0, run = 0;
        days.forEach((d) => {
          run = d.count > 0 ? run + 1 : 0;
          if (run > longest) longest = run;
        });
        let current = 0;
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].count > 0) current++;
          else if (i === days.length - 1) continue;
          else break;
        }

        const cols = [];
        let currentWeek = new Array(7).fill(null);
        days.forEach((day) => {
          const dow = new Date(day.date + "T00:00:00").getDay();
          currentWeek[dow] = day;
          if (dow === 6) {
            cols.push(currentWeek);
            currentWeek = new Array(7).fill(null);
          }
        });
        if (currentWeek.some((d) => d !== null)) cols.push(currentWeek);

        if (!cancelled) {
          setWeeks(cols);
          setStats({ total, activeDays, longest, current });
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status === "ready" && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [status]);

  const cell = 13;
  const topPad = 20;
  const width = weeks.length * cell;
  const height = topPad + 7 * cell;
  const heat = isDark ? HEAT_DARK : HEAT_LIGHT;

  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const first = week.find((d) => d);
    if (!first) return;
    const m = new Date(first.date + "T00:00:00").getMonth();
    if (m !== lastMonth) {
      if (wi < weeks.length - 2 || lastMonth === -1) {
        monthLabels.push({ wi, label: new Date(first.date + "T00:00:00").toLocaleString("en", { month: "short" }) });
      }
      lastMonth = m;
    }
  });

  return (
    <section id="github-activity" className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <SectionHeading
        eyebrow="07 · GITHUB"
        title="GitHub Activity"
        caption="Live contribution data pulled directly from GitHub."
        icon={Github}
        t={t}
      />

      <Reveal>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={img(PROFILE.photo)}
                alt={`${PROFILE.githubUsername} avatar`}
                className={`h-10 w-10 shrink-0 rounded-full object-cover border ${t.border}`}
              />
              <div className="min-w-0">
                <p className="font-display text-base font-semibold leading-tight truncate">@{PROFILE.githubUsername}</p>
                <p className={`text-xs ${t.textFaint} leading-tight mt-1`}>Last 12 months</p>
              </div>
            </div>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className={`shrink-0 inline-flex items-center gap-1.5 text-sm underline underline-offset-4 decoration-1 ${t.textMuted} hover:text-accent-400 transition-colors`}
            >
              View profile <ArrowRight size={14} />
            </a>
          </div>

          {status === "loading" && (
            <div className="mt-8 animate-pulse" aria-label="Loading contribution data">
              <div className={`h-32 rounded-md ${isDark ? "bg-neutral-900" : "bg-slate-100"}`} />
            </div>
          )}

          {status === "error" && (
            <p className={`mt-8 border-y ${t.border} py-6 text-sm ${t.textMuted}`}>
              Couldn't load contribution data right now. You can view it directly on{" "}
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-accent-400">
                github.com
              </a>
              .
            </p>
          )}

          {status === "ready" && (
            <>

              <div className="mt-8">
                <div ref={scrollRef} className="overflow-x-auto pb-1">
                  <svg viewBox={`0 0 ${width} ${height}`} style={{ minWidth: `${width}px`, height: "auto" }} className="block">
                    {monthLabels.map((m) => (
                      <text
                        key={m.wi}
                        x={m.wi * cell}
                        y={11}
                        fontSize="10"
                        fontFamily="Inter, system-ui, sans-serif"
                        fill={isDark ? "#7A7A7A" : "#8A8A8A"}
                      >
                        {m.label}
                      </text>
                    ))}
                    {weeks.map((week, wi) =>
                      week.map((day, di) => {
                        if (!day) return null;
                        const level = day.level ?? 0;
                        return (
                          <rect
                            key={`${wi}-${di}`}
                            x={wi * cell + 1.5}
                            y={topPad + di * cell + 1.5}
                            width={cell - 3}
                            height={cell - 3}
                            rx={2}
                            fill={heat[level]}
                          >
                            <title>{`${day.count} contributions on ${day.date}`}</title>
                          </rect>
                        );
                      })
                    )}
                  </svg>
                </div>

                <div className={`mt-4 flex items-center justify-between gap-3 text-xs ${t.textFaint}`}>
                  <span>{stats.current > 0 ? `${stats.current}-day current streak` : ""}</span>
                  <span className="inline-flex items-center gap-1.5">
                    Less
                    {heat.map((c, i) => (
                      <span key={i} className="h-2.5 w-2.5 rounded-[2px]" style={{ background: c }} />
                    ))}
                    More
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}