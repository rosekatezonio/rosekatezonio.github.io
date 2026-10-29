import React from "react";
import { PROFILE, RESUME_URL, SKILL_TOTAL, BLOGS, ALL_PROJECTS, EXPERIENCE, AFFILIATIONS, CERTIFICATIONS } from "../data.js";
import { House, User, Layers, Trophy, BookOpen, LayoutGrid, Briefcase, Users, Award, Download, Github, Linkedin, Mail, X, PanelLeft, Contrast, ArrowUpRight, Eye } from "../icons.jsx";
import { useMonthlyVisits, monthLabel } from "../visits.js";

export const SIDEBAR_GROUPS = [
  {
    label: null,
    items: [{ id: "hero", label: "Home", Icon: House }],
  },
  {
    label: "About Me",
    items: [
      { id: "aboutme", label: "About", Icon: User },
      { id: "skills", label: "Skills", Icon: Layers, count: SKILL_TOTAL },
      { id: "activities", label: "Activities", Icon: Trophy },
      { id: "blogs", label: "Blogs", Icon: BookOpen, count: BLOGS.length },
    ],
  },
  {
    label: "Work",
    items: [
      { id: "labs", label: "Projects", Icon: LayoutGrid, count: ALL_PROJECTS.length },
      { id: "experience", label: "Experience", Icon: Briefcase, count: EXPERIENCE.length },
      { id: "affiliation", label: "Affiliation", Icon: Users, count: AFFILIATIONS.length },
      { id: "certification", label: "Certs", Icon: Award, count: CERTIFICATIONS.length },
    ],
  },
  {
    label: "Links",
    items: [
      { href: RESUME_URL, label: "Resume", Icon: Download },
      { href: PROFILE.github, label: "GitHub", Icon: Github },
      { href: PROFILE.linkedin, label: "LinkedIn", Icon: Linkedin },
    ],
  },
];

export function Sidebar({ t, isDark, collapsed: collapsedPref, onToggleCollapse, activeId, onNavigate, onToggleTheme, mailtoUrl, mobile = false, open = false, onClose }) {
  const collapsed = !mobile && collapsedPref;
  const visits = useMonthlyVisits();
  const visitText = visits == null ? "—" : visits.toLocaleString("en-US");
  const hoverText = isDark ? "hover:text-neutral-100" : "hover:text-slate-900";
  const hoverBg = isDark ? "hover:bg-white/5" : "hover:bg-slate-900/[0.04]";
  const activeBg = isDark ? "bg-white/[0.06]" : "bg-slate-900/[0.05]";
  const iconBtn = `h-9 w-9 shrink-0 rounded-full border ${t.border} flex items-center justify-center ${t.textMuted} hover:text-accent-400 hover:border-accent-400/60 transition-colors`;

  return (
    <aside
      aria-label={mobile ? "Menu" : "Sidebar"}
      {...(mobile && !open ? { inert: "", "aria-hidden": true } : {})}
      className={
        mobile
          ? `lg:hidden fixed top-3 bottom-3 right-3 z-[55] flex flex-col w-64 max-w-[calc(100vw-1.5rem)] rounded-3xl border ${t.border} backdrop-blur-md ${t.navBg} overflow-hidden transition-transform duration-300 ${
              open ? "translate-x-0" : "translate-x-[calc(100%+1rem)]"
            }`
          : `hidden lg:flex fixed top-3 bottom-3 left-3 z-40 flex-col rounded-3xl border ${t.border} backdrop-blur-md ${t.navBg} transition-[width] duration-300 overflow-hidden ${
              collapsed ? "w-[4.5rem]" : "w-64"
            }`
      }
    >
      <div className={`h-16 shrink-0 flex items-center ${collapsed ? "justify-center" : "justify-between pl-6 pr-3"}`}>
        {!collapsed && (
          <button
            onClick={() => onNavigate("hero")}
            aria-label={`${PROFILE.fullName}, back to top`}
            className={`font-display font-bold text-xl tracking-tight ${t.text} hover:text-accent-400 transition-colors`}
          >
            {PROFILE.name}
          </button>
        )}
        {mobile ? (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className={`h-9 w-9 rounded-xl flex items-center justify-center ${t.textMuted} ${hoverBg} hover:text-accent-400 transition-colors`}
          >
            <X size={17} />
          </button>
        ) : (
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`h-9 w-9 rounded-xl flex items-center justify-center ${t.textMuted} ${hoverBg} hover:text-accent-400 transition-colors`}
          >
            <PanelLeft size={17} />
          </button>
        )}
      </div>

      <div className={collapsed ? "px-3" : "px-4"}>
        <a
          href={mailtoUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={collapsed ? "Contact" : undefined}
          aria-label="Contact"
          className={`flex items-center rounded-2xl border ${t.border} ${collapsed ? "h-11 justify-center" : "h-11 gap-3 px-4"} ${t.text} text-sm font-medium hover:border-accent-400/60 hover:text-accent-400 transition-colors`}
        >
          <Mail size={16} className="shrink-0" />
          {!collapsed && <span>Contact</span>}
        </a>
      </div>

      <nav className={`flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${collapsed ? "mt-4 pb-3 px-3" : "mt-4 pb-3 px-4"}`}>
        {SIDEBAR_GROUPS.map((group, gi) => (
          <div key={group.label || gi} className={gi > 0 ? (collapsed ? "mt-3" : "mt-4") : ""}>
            {group.label &&
              (collapsed ? (
                <div className={`mx-auto mb-2 h-px w-6 ${isDark ? "bg-neutral-800" : "bg-slate-200"}`} />
              ) : (
                <p className={`px-3 mb-1.5 font-mono text-[10px] tracking-widest uppercase ${t.textFaint}`}>{group.label}</p>
              ))}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = item.id === "hero" ? !activeId : !!item.id && activeId === item.id;
                const Tag = item.href ? "a" : "button";
                const linkProps = item.href
                  ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                  : { onClick: () => onNavigate(item.id) };
                return (
                  <li key={item.label}>
                    <Tag
                      {...linkProps}
                      title={collapsed ? item.label : undefined}
                      aria-label={collapsed ? item.label : undefined}
                      aria-current={active ? "true" : undefined}
                      className={`w-full h-9 flex items-center rounded-xl text-sm transition-colors ${collapsed ? "justify-center" : "gap-3 px-3"} ${
                        active ? `${activeBg} ${t.accent}` : `${t.textMuted} ${hoverBg} ${hoverText}`
                      }`}
                    >
                      <item.Icon size={16} className="shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left font-medium">{item.label}</span>
                          {item.count != null && (
                            <span className={`font-mono text-[11px] ${active ? t.accent : t.textFaint}`}>
                              {String(item.count).padStart(2, "0")}
                            </span>
                          )}
                          {item.href && <ArrowUpRight size={14} className={t.textFaint} />}
                        </>
                      )}
                    </Tag>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className={`shrink-0 border-t ${t.border} ${collapsed ? "py-3 flex flex-col items-center gap-2" : "px-5 py-3 flex items-center justify-between"}`}>
        <div
          className={`flex items-center ${collapsed ? "flex-col gap-1" : "gap-2 min-w-0 pr-3"} ${t.textMuted}`}
          title={`Visits in ${monthLabel()}`}
          aria-label={`${visitText} visits in ${monthLabel()}`}
        >
          <Eye size={collapsed ? 15 : 16} className="shrink-0 text-accent-400" />
          <span className={`font-mono tabular-nums ${collapsed ? "text-[10px]" : "text-xs"}`}>{visitText}</span>
        </div>
        <div className={collapsed ? "flex flex-col gap-2" : "flex items-center gap-2"}>
          <button aria-label="Toggle theme" title="Toggle theme" onClick={onToggleTheme} className={iconBtn}>
            <Contrast size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}