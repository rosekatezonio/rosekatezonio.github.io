import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRemoteImages } from "./images.js";
import { NAV_LINKS, PROFILE, theme, PROJECT_BY_SLUG, BLOG_BY_SLUG, RESUME_URL } from "./data.js";
import { useScrollProgress } from "./hooks.js";
import { Sun, Moon, Menu, X, ArrowUp, Github, Linkedin, Mail, Download } from "./icons.jsx";
import { NetworkCanvas } from "./components/NetworkCanvas.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { SectionPanel } from "./components/ui.jsx";
import { HeroSection, AboutSection, SkillsSection, ProjectsSection, ExperienceSection } from "./components/Home.jsx";
import { LatestActivities, GithubActivity } from "./components/Sections.jsx";
import { CertificationSection, AboutMeSection, AffiliationSection, ActivitiesJourney, BlogSection, BlogArticle } from "./components/Panels.jsx";
import { SkillsArchive, ProjectArchive, ProjectDetail } from "./components/Archives.jsx";

function App() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-light", !isDark);
    return () => root.classList.remove("theme-light");
  }, [isDark]);
  useRemoteImages();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectTab, setProjectTab] = useState("webapps");
  const [showTop, setShowTop] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebar-collapsed") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sidebar-collapsed", sidebarCollapsed ? "1" : "0");
    } catch {}
  }, [sidebarCollapsed]);

  const t = isDark ? theme.dark : theme.light;
  const progress = useScrollProgress();

  const switchProjectTab = useCallback((tab) => setProjectTab(tab), []);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500);
      let current = "";
      NAV_LINKS.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 120) current = link.id;
      });
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    "Let's connect: Internship Opportunity"
  )}`;

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }, []);

  const [archiveOpen, setArchiveOpen] = useState(false);
  const [projectSlug, setProjectSlug] = useState(null);
  const [archiveInstant, setArchiveInstant] = useState(false);
  const prevHash = useRef("");
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.slice(1);
      setArchiveInstant(h === "archive" && !!PROJECT_BY_SLUG[prevHash.current]);
      prevHash.current = h;
      setArchiveOpen(h === "archive");
      setProjectSlug(PROJECT_BY_SLUG[h] ? h : null);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const openArchive = () => { window.location.hash = "archive"; };
  const closeProject = useCallback(() => { window.location.hash = "archive"; }, []);
  const closeArchive = useCallback(() => {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    setArchiveOpen(false);
  }, []);

  const [panel, setPanel] = useState(null);
  const [postSlug, setPostSlug] = useState(null);
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.slice(1);
      if (h === "affiliation" || h === "blogs" || h === "certification" || h === "aboutme" || h === "activities") {
        setPanel(h);
        setPostSlug(null);
      } else if (h.startsWith("blogs/") && BLOG_BY_SLUG[h.slice(6)]) {
        setPanel("blogs");
        setPostSlug(h.slice(6));
      } else {
        setPanel(null);
        setPostSlug(null);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const closePanel = useCallback(() => {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    setPanel(null);
    setPostSlug(null);
  }, []);
  const backToPosts = useCallback(() => { window.location.hash = "blogs"; }, []);
  const navigateTo = useCallback(
    (id) => {
      if (id === "affiliation" || id === "blogs" || id === "certification") {
        window.location.hash = id;
        setMenuOpen(false);
      } else {
        scrollToId(id);
      }
    },
    [scrollToId]
  );

  const [skillsOpen, setSkillsOpen] = useState(false);
  useEffect(() => {
    const sync = () => setSkillsOpen(window.location.hash === "#all-skills");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const openSkills = () => { window.location.hash = "all-skills"; };
  const closeSkills = useCallback(() => {
    window.history.replaceState(null, "", window.location.pathname + window.location.search + "#skills");
    setSkillsOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || archiveOpen || skillsOpen || projectSlug || panel ? "hidden" : "";
  }, [menuOpen, archiveOpen, skillsOpen, projectSlug, panel]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  const openResumes = () => window.open(RESUME_URL, "_blank", "noopener");
  const [revealed, setRevealed] = useState({});
  const toggleReveal = (title) => setRevealed((r) => ({ ...r, [title]: !r[title] }));

  return (
    <div
      className={`relative isolate min-h-screen ${t.bg} ${t.text} transition-[color,background-color,padding] duration-300 ${
        sidebarCollapsed ? "lg:pl-[5.25rem]" : "lg:pl-[16.75rem]"
      }`}
    >
      <NetworkCanvas isDark={isDark} />

      <div className="fixed top-0 left-0 right-0 z-50 bg-transparent" style={{ height: "2px" }}>
        <div
          className="h-full bg-accent-400 transition-all duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <Sidebar
        t={t}
        isDark={isDark}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        activeId={activeId}
        onNavigate={navigateTo}
        onToggleTheme={() => setIsDark((d) => !d)}
        mailtoUrl={mailtoUrl}
      />

      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`lg:hidden fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <Sidebar
        mobile
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        t={t}
        isDark={isDark}
        activeId={activeId}
        onNavigate={navigateTo}
        onToggleTheme={() => setIsDark((d) => !d)}
        mailtoUrl={mailtoUrl}
      />

      <header className={`lg:hidden fixed top-0 left-0 right-0 z-40 backdrop-blur-md ${t.navBg} border-b ${t.border}`}>
        <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollToId("hero")}
            aria-label={`${PROFILE.name}, back to top`}
            className={`font-display font-bold text-xl tracking-tight ${t.text} hover:text-accent-400 transition-colors`}
          >
            {PROFILE.name}
          </button>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={() => setIsDark((d) => !d)}
              className={`h-9 w-9 rounded-full border ${t.border} flex items-center justify-center ${t.textMuted} hover:text-accent-400 hover:border-accent-400/60 transition-colors`}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className={`h-9 w-9 rounded-full flex items-center justify-center transition-colors ${
                menuOpen ? `border border-accent-400 ${t.accent}` : `border ${t.border} ${t.textMuted}`
              }`}
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </nav>
      </header>

      <HeroSection t={t} isDark={isDark} />
      <AboutSection t={t} isDark={isDark} mailtoUrl={mailtoUrl} openResumes={openResumes} />
      <SkillsSection t={t} isDark={isDark} onOpenSkills={openSkills} />
      <LatestActivities t={t} isDark={isDark} />
      <ProjectsSection
        t={t}
        isDark={isDark}
        projectTab={projectTab}
        onSwitchTab={switchProjectTab}
        revealed={revealed}
        onToggleReveal={toggleReveal}
        onOpenArchive={openArchive}
      />
      <ExperienceSection t={t} isDark={isDark} />
      <GithubActivity t={t} isDark={isDark} />

      <footer className={`border-t ${t.border}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`font-mono text-xs ${t.textFaint}`}>
            © {new Date().getFullYear()} {PROFILE.name}. Built with React + Tailwind CSS.
          </p>
          <div className="flex items-center gap-4">
            <a href={PROFILE.github} className={`${t.textFaint} hover:text-accent-400`} aria-label="GitHub"><Github size={16} /></a>
            <a href={PROFILE.linkedin} className={`${t.textFaint} hover:text-accent-400`} aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href={mailtoUrl} className={`${t.textFaint} hover:text-accent-400`} aria-label="Email"><Mail size={16} /></a>
            <button onClick={openResumes} className={`font-mono text-xs ${t.textMuted} hover:text-accent-400 flex items-center gap-1.5`}>
              <Download size={13} /> Resume
            </button>
          </div>
        </div>
      </footer>

      {archiveOpen && <ProjectArchive t={t} isDark={isDark} onClose={closeArchive} instant={archiveInstant} />}
      {projectSlug && <ProjectDetail key={projectSlug} t={t} isDark={isDark} project={PROJECT_BY_SLUG[projectSlug]} onBack={closeProject} />}
      {panel === "affiliation" && <SectionPanel t={t} onClose={closePanel} width="max-w-3xl"><AffiliationSection t={t} isDark={isDark} /></SectionPanel>}
      {panel === "aboutme" && <SectionPanel t={t} onClose={closePanel}><AboutMeSection t={t} isDark={isDark} /></SectionPanel>}
      {panel === "certification" && <SectionPanel t={t} onClose={closePanel} width="max-w-3xl"><CertificationSection t={t} isDark={isDark} /></SectionPanel>}
      {panel === "activities" && <SectionPanel t={t} onClose={closePanel}><ActivitiesJourney t={t} isDark={isDark} /></SectionPanel>}
      {panel === "blogs" && <SectionPanel t={t} onClose={closePanel} listenEsc={!postSlug}><BlogSection t={t} isDark={isDark} /></SectionPanel>}
      {panel === "blogs" && postSlug && <BlogArticle key={postSlug} t={t} isDark={isDark} post={BLOG_BY_SLUG[postSlug]} onBack={backToPosts} />}
      {skillsOpen && <SkillsArchive t={t} onClose={closeSkills} isDark={isDark} />}

      {showTop && !menuOpen && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={`group fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full ${t.surfaceSolid} ${t.text} flex items-center justify-center transition-colors hover:text-accent-400`}
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" strokeWidth="2" className={isDark ? "stroke-neutral-800" : "stroke-slate-200"} />
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-accent-400"
              strokeDasharray={2 * Math.PI * 22}
              strokeDashoffset={2 * Math.PI * 22 * (1 - progress)}
            />
          </svg>
          <ArrowUp size={16} className="relative transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

    </div>
  );
}

export default App;