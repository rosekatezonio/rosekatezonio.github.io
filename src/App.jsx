import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { img, useRemoteImages } from "./images.js";
import cvPdf from "./assets/Rose_Kate_Zonio_CV.pdf";

function makeIcon(paths) {
  return function Icon({ size = 24, className = "", ...props }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        {paths}
      </svg>
    );
  };
}

const CodeBrackets = makeIcon(<><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></>);
const NetworkNodes = makeIcon(<><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" /></>);
const Mail = makeIcon(<><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>);
const Github = makeIcon(<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />);
const GithubIcon = Github;
const Linkedin = makeIcon(<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></>);
const Download = makeIcon(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>);
const Sun = makeIcon(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></>);
const Moon = makeIcon(<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />);
const ArrowUp = makeIcon(<><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></>);
const Search = makeIcon(<><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>);
const ExternalLink = makeIcon(<><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>);
const Network = makeIcon(<><rect x="9" y="2" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="16" y="16" width="6" height="6" rx="1" /><path d="M12 8v4M12 12H5v4M12 12h7v4" /></>);
const GraduationCap = makeIcon(<><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c3 2 9 2 12 0v-5" /><path d="M22 10v6" /></>);
const Code2 = makeIcon(<><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></>);
const Briefcase = makeIcon(<><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>);
const CheckCircle2 = makeIcon(<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></>);
const Clock = makeIcon(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>);
const Circle = makeIcon(<circle cx="12" cy="12" r="10" />);
const FileText = makeIcon(<><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></>);
const ChevronDown = makeIcon(<path d="m6 9 6 6 6-6" />);
const Menu = makeIcon(<><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></>);
const X = makeIcon(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>);
const MapPin = makeIcon(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>);
const ImageIcon = makeIcon(<><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.83 0L6 21" /></>);
const ArrowUpRight = makeIcon(<><path d="M7 7h10v10" /><path d="M7 17 17 7" /></>);
const ArrowLeftRight = makeIcon(<><path d="M8 3 4 7l4 4" /><path d="M4 7h16" /><path d="m16 21 4-4-4-4" /><path d="M20 17H4" /></>);
const ArrowRight = makeIcon(<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>);
const User = makeIcon(<><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></>);
const Trophy = makeIcon(<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>);
const BookOpen = makeIcon(<><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>);
const ArrowLeftIcon = makeIcon(<><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>);
const Users = makeIcon(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>);
const Wrench = makeIcon(<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />);

const PanelLeft = makeIcon(<><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /></>);
const Contrast = makeIcon(<><circle cx="12" cy="12" r="10" /><path d="M12 18a6 6 0 0 0 0-12v12z" /></>);
const LayoutGrid = makeIcon(<><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></>);
const Layers = makeIcon(<><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" /><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" /></>);
const Award = makeIcon(<><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></>);
const House = makeIcon(<><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></>);

const PROFILE = {
  name: "RK",
  role: "Software & Networking/IT",
  subrole: "Computer Engineering · Software & Networking/IT",
  email: "rkzonio1@gmail.com",
  photo: "asset-a1c55936",
  github: "https://github.com/arkyxo",
  githubUsername: "arkyxo",
  linkedin: "https://www.linkedin.com/in/rkzonio/",
  location: "Rizal, Philippines",
};

const hasLink = (u) => !!u && u !== "#";

const RESUME_URL = cvPdf;

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "activities", label: "Activities" },
  { id: "labs", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "github-activity", label: "GitHub" },
];

const SKILL_LEVELS = {
  core: { dot: "bg-red-400", glow: "dot-glow-red", text: "text-red-400", label: "Core competency", code: "CORE", chipBg: "bg-red-400", chipText: "text-onaccent", desc: "Comfortable using this independently in real projects and troubleshooting scenarios." },
  working: { dot: "bg-amber-400", glow: "dot-glow-amber", text: "text-amber-400", label: "Guided practice", code: "GUIDED", chipBg: "bg-amber-400", chipText: "text-slate-950", desc: "Can apply this with documentation, references, or guidance close at hand." },
  basic: { dot: "bg-blue-400", glow: "dot-glow-blue", text: "text-blue-400", label: "Basic familiarity", code: "BASIC", chipBg: "bg-blue-400", chipText: "text-slate-950", desc: "Understands the fundamentals through hands-on labs and coursework." },
  learning: { dot: "bg-slate-500", glow: "dot-glow-gray", text: "text-slate-400", label: "Currently learning", code: "NEW", chipBg: "bg-slate-500", chipText: "text-white", desc: "Just getting started, actively studying this right now." },
};

const SKILLS = [
  {
    category: "Software",
    blurb: "Full-stack web, Python, Lua, databases",
    icon: Code2,
    items: [
      { name: "JavaScript", level: "working", abbr: "JS" , icon: "asset-9fd9590f" },
      { name: "HTML", level: "working", abbr: "HTML" , icon: "asset-84111716" },
      { name: "CSS", level: "working", abbr: "CSS" , icon: "asset-96c75af1" },
      { name: "React", level: "working", abbr: "JSX" , icon: "asset-b5acca38" },
      { name: "Tailwind CSS", level: "working", abbr: "TW" , icon: "asset-12b1b727" },
      { name: "Python", level: "working", abbr: "PY" , icon: "asset-2567e649" },
      { name: "Lua (Roblox)", level: "working", abbr: "LUA" , icon: "asset-dc866c64" },
      { name: "Git", level: "working", abbr: "GIT", icon: "asset-e9ee8d5e" },
      { name: "GitHub", level: "working", abbr: "GH", icon: "asset-44876619" },
      { name: "VS Code", level: "working", abbr: "VS", icon: "asset-3c66e1fc" },
      { name: "Microsoft SQL Server", level: "basic", abbr: "MS", icon: "asset-247d2abe" },
      { name: "Firebase / Firestore", level: "basic", abbr: "FB" , icon: "asset-83b2b79f" },
      { name: "SQL", level: "basic", abbr: "SQL" , icon: "asset-b5f6c886" },
      { name: "MySQL", level: "basic", abbr: "My" , icon: "asset-b1aa8886" },
      { name: "PostgreSQL", level: "learning", abbr: "PG" , icon: "asset-c5fca167" },
      { name: "R", level: "learning", abbr: "R" , icon: "asset-5994d1fb" },
      { name: "Docker", level: "learning", abbr: "DKR" , icon: "asset-56bd5b63" },
      { name: "Vite", level: "working", abbr: "VITE", icon: "https://cdn.simpleicons.org/vite" },
      { name: "Node.js", level: "basic", abbr: "NODE", icon: "https://cdn.simpleicons.org/nodedotjs" },
      { name: "Express", level: "basic", abbr: "EXP", icon: "https://cdn.simpleicons.org/express" },
      { name: "SQLite", level: "basic", abbr: "SQLT", icon: "https://cdn.simpleicons.org/sqlite" },
      { name: "Progressive Web Apps (PWA)", level: "basic", abbr: "PWA", icon: "https://cdn.simpleicons.org/pwa" },
      { name: "Local AI with Ollama", level: "learning", abbr: "AI", icon: "https://cdn.simpleicons.org/ollama" },
      { name: "REST API Integration", level: "basic", abbr: "API" },
    ],
  },
  {
    category: "Networking & IT",
    blurb: "Subnetting, VLANs, monitoring, IT support",
    icon: Network,
    items: [
      { name: "Cisco Packet Tracer", level: "working", abbr: "CPT", icon: "asset-a8e20bfa" },
      { name: "Subnetting / VLSM", level: "working", abbr: "VLSM" },
      { name: "Python Network Scripting", level: "working", abbr: "PY" },
      { name: "Hardware & Software Troubleshooting", level: "working", abbr: "H/S" },
      { name: "Command-Line Administration", level: "working", abbr: "CLI" },
      { name: "VLANs & Inter-VLAN Routing", level: "basic", abbr: "VLAN" },
      { name: "Cisco IOS CLI", level: "basic", abbr: "IOS" },
      { name: "TCP/IP, DNS & DHCP", level: "basic", abbr: "TCP" },
      { name: "Network Security Fundamentals", level: "basic", abbr: "SEC" },
      { name: "Windows Server Basics", level: "basic", abbr: "WIN" },
      { name: "Linux (WSL)", level: "learning", abbr: "WSL" },
    ],
  },
];

const SKILL_LEGEND = ["core", "working", "basic", "learning"].filter((lvl) =>
  SKILLS.some((group) => group.items.some((item) => item.level === lvl))
);

const RFID_PROJECT = {
  title: "RFID-Based Automatic Parking Slot System",
  eyebrow: "Hardware + Software",
  meta: "Group Project · Academic · March 2024",
  status: "Completed",
  description: [
    "A team-built parking system that reads ",
    { hl: "RFID" },
    " cards to show real-time slot availability, alert attendants when a slot is chosen, and handle ",
    { hl: "automated billing" },
    ": hardware, a VB.NET app, and a SQL database working as one flow.",
  ],
  highlights: [
    "RFID reader integrated with a custom VB.NET application",
    "SQL database tracking slot occupancy in real time",
    "Complete flow demonstrated: ID scan, slot selection, payment",
  ],
  tags: ["VB.NET", "SQL", "RFID", "Hardware Integration"],
  github: "https://github.com/EngrPrenz/Robinson-s-Mall-RFID-Parking-System",
  thumbnail: "asset-06a80c2f",
};

const LAB_CATEGORIES = ["All", "Monitoring", "Hardware"];

const LABS = [
  {
    title: "Home Network Device Monitor",
    eyebrow: "Python Network Monitor",
    meta: "Independent Project · 2026",
    category: "Monitoring",
    status: "Completed",
    description: [
      "A single-file Python monitor (standard library only) that sweeps the whole home subnet with ",
      { hl: "parallel pings" },
      ", discovers every connected device, and raises a ",
      { hl: "stranger alarm" },
      " on Telegram/Discord when an unapproved device joins.",
    ],
    highlights: [
      "Device-approval system with real-time Telegram/Discord alerts",
      "Internet-outage detector that separates ISP failures from local ones",
      "SQLite history of uptime, ping, packet loss, and jitter per device",
    ],
    tags: ["Python", "SQLite", "Ping Sweep", "Telegram/Discord Alerts"],
    github: "https://github.com/arkyxo/home-network-monitor",
    thumbnail: "asset-b2fc0f05",
  },
  { ...RFID_PROJECT, category: "Hardware" },
];

const STATUS_STYLES = {
  Completed: { dot: "bg-red-400", text: "text-red-300", label: "COMPLETED" },
  "In Progress": { dot: "bg-amber-400", text: "text-amber-300", label: "IN PROGRESS" },
  Planned: { dot: "bg-slate-500", text: "text-slate-400", label: "PLANNED" },
};

const WEBAPP_CATEGORIES = ["All", "Freelance", "Academic", "Thesis", "Hackathon"];

const WEB_APPS_LIST = [
  {
    title: "CineLookUp",
    eyebrow: "Movie Browsing App",
    meta: "Independent Project · Apr 2024",
    category: "Academic",
    status: "Completed",
    description: [
      "A ",
      { hl: "solo project" },
      " centered on ",
      { hl: "API integration" },
      ": pulling live movie listings, details, and search results from an external data source instead of a static database.",
    ],
    highlights: [
      "Live movie data pulled from a third-party API",
      "Search and browse interface for exploring titles",
      "Watchlists, ratings and private lists synced to each user's account",
      "Designed and built solo, end to end",
    ],
    tags: ["React", "Vite", "JavaScript", "HTML", "Firebase", "TMDb API"],
    github: "https://github.com/arkyxo/CineLookUp",
    privateDemo: true,
    thumbnail: "cinelookup-light-1",
    thumbnailDark: "cinelookup-dark-1",
    gallery: ["cinelookup-light-1", "cinelookup-light-2", "cinelookup-light-3", "cinelookup-light-4"],
    galleryDark: ["cinelookup-dark-1", "cinelookup-dark-2", "cinelookup-dark-3", "cinelookup-dark-4"],
  },
  {
    title: "Salo Sa Antipolo",
    eyebrow: "Restaurant POS System",
    meta: "Academic / Client Project · Jan 2026",
    category: "Freelance",
    status: "Completed",
    description: [
      "A restaurant point-of-sale web app built on ",
      { hl: "Firebase" },
      ": real-time order management, a ",
      { hl: "revenue dashboard" },
      ", standardized ",
      { hl: "VAT and service-charge billing" },
      " logic, and ",
      { hl: "category-based ordering" },
      " rules.",
    ],
    highlights: [
      "Real-time order sync across multiple terminals via Firestore",
      "Daily / weekly / monthly revenue charts",
      "Standardized 6% service charge and VAT computation",
      "Delivered with technical documentation, client training, and a formal handover for production use",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Python", "React", "Firebase", "Tailwind"],
    github: "https://github.com/EngrPrenz/Salo-sa-SD",
    privateDemo: true,
    thumbnail: "asset-3e6b708c",
  },
  {
    title: "URSAC Simulation Academy",
    eyebrow: "Roblox Game · Thesis",
    meta: "Thesis Project · Academic · Feb 2026",
    category: "Thesis",
    status: "Completed",
    description: [
      "A full Roblox game simulating a complete ",
      { hl: "university journey" },
      ": quest system, player interactions, and education progression built in ",
      { hl: "Lua" },
      ". Published publicly and maintained with weekly bug-fix updates driven by player reports.",
    ],
    highlights: [
      "Built both the in-game environments and the Lua quest/progression logic",
      "Published publicly and updated weekly from player feedback",
    ],
    tags: ["Lua", "Roblox Studio", "Game Design"],
    github: null,
    view: "https://www.roblox.com/games/133137084199842/URSAC-Simulator-Academy",
    thumbnail: "asset-9e429332",
  },
  {
    title: "KuryenteWatch",
    eyebrow: "Household Energy App · Hackathon",
    meta: "Group Project · AppBuilders PH Hackathon · Oct 2026",
    category: "Hackathon",
    status: "Completed",
    description: [
      "A household electricity tracker built in 24 hours. Snap a photo of your ",
      { hl: "electric meter" },
      " or an appliance label and it reads the numbers with ",
      { hl: "OCR" },
      ", estimates your bill and appliance usage, flags ",
      { hl: "unusual usage jumps" },
      ", and answers energy questions through a local AI assistant. Works offline, and your data stays on your device.",
    ],
    highlights: [
      "Meter and appliance-label photo reading with OCR",
      "Bill estimates, usage history and usage-jump alerts",
      "Local AI Energy Assistant (Ollama) with a built-in offline fallback",
      "Installable PWA that works without internet",
    ],
    tags: ["React", "Vite", "Node.js", "Express", "SQLite", "PWA", "Ollama"],
    github: "https://github.com/dioxaaa/Kuryente-Watch-AppBuilder-Hackaton",
    view: "https://dist-web-ddfpdfbm.devinapps.com",
    thumbnail: "kuryentewatch",
  },
];

const SOFTWARE_ORDER = ["URSAC Simulation Academy", "Salo Sa Antipolo", "KuryenteWatch", "CineLookUp"];
const WEB_APPS = [...WEB_APPS_LIST].sort((a, b) => SOFTWARE_ORDER.indexOf(a.title) - SOFTWARE_ORDER.indexOf(b.title));

const yearOf = (p) => (p.meta && (p.meta.match(/(\d{4})/) || [])[1]) || "-";
const contextOf = (p) => (p.meta ? p.meta.split(" · ")[0] : p.category || "Lab");
const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};
const LOGO_SKILLS = SKILLS.flatMap((g) => g.items).filter((item) => item.icon);
const ALL_PROJECTS = [...WEB_APPS, ...LABS]
  .filter((p, i, arr) => arr.findIndex((q) => q.title === p.title) === i)
  .sort((a, b) => (+yearOf(b) || 0) - (+yearOf(a) || 0));
const trackOf = (title) => {
  const inSoftware = WEB_APPS.some((p) => p.title === title);
  const inNetwork = LABS.some((p) => p.title === title);
  if (inSoftware && inNetwork) return "Both";
  return inSoftware ? "Software" : "Networking & IT";
};
const thumbFor = (p, isDark) => (isDark && p.thumbnailDark) || p.thumbnail;
const galleryFor = (p, isDark) => (isDark && p.galleryDark) || p.gallery;
const taglineOf = (p) => (p.eyebrow ? p.eyebrow.split(" · ")[0] : p.meta);
const slugOf = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const PROJECT_BY_SLUG = Object.fromEntries(ALL_PROJECTS.map((p) => [slugOf(p.title), p]));

const CERTIFICATIONS = [
  {
    image: "asset-54b305ed",
    name: "Network Security",
    org: "Google",
    group: "Networking & IT",
    category: "Security",
    date: "August 4, 2026",
    expires: null,
    credentialId: "YIFFE8OFQH60",
    status: "Earned",
    skills: ["Network Architecture", "Intrusion Detection", "Security Hardening", "Incident Response", "Network Traffic Analysis", "Google SecOps"],
    verifyLabel: "Verify",
    verifyUrl: "https://coursera.org/verify/specialization/YIFFE8OFQH60",
    certificateUrl: "https://coursera.org/verify/specialization/YIFFE8OFQH60",
  },
  {
    image: "ama-logo",
    name: "Cyber Threat Intelligence Analysis (CTIA) Level III",
    org: "AMA University · TESDA-recognized · 92-hour training",
    group: "Networking & IT",
    category: "Cybersecurity",
    date: "Upcoming",
    expires: null,
    credentialId: null,
    status: "Upcoming",
    skills: ["Cyber Threat Intelligence", "Threat Analysis", "Digital Defense"],
  },
];

const HACKATHON_LINKEDIN = "https://lnkd.in/p/ghcHxX-M";
const KURYENTE_GITHUB = "https://github.com/dioxaaa/Kuryente-Watch-AppBuilder-Hackaton";

const FEATURED_ACTIVITY = {
  label: "Hackathon",
  date: "October 9 - 10, 2026",
  title: "AppBuilders PH Hackathon",
  location: "Cyberzone, SM Makati",
  description:
    "24 hours to build, ship, and demo with AI. My team built KuryenteWatch, a local-first household electricity app, during the remote Build Day and pitched it through a video.",
  image: "appbuilders-hackathon-group",
  inset: "appbuilders-hackathon-stage",
  links: [
    { label: "Read my LinkedIn post", short: "LinkedIn post", url: HACKATHON_LINKEDIN },
    { label: "See the project on GitHub", short: "GitHub repo", url: KURYENTE_GITHUB },
  ],
};

const AMA_FACEBOOK = "https://www.facebook.com/amaeducsystem";

const CTIA_ACTIVITY = {
  label: "Latest",
  date: "Day 1",
  title: "Cyber Threat Intelligence Analysis (CTIA) Level III",
  location: "AMA University, Quezon City",
  description:
    "Day 1 of CTIA Level III. A full lab of fellow learners, and the start of going deeper into how security teams track, analyze, and make sense of threats.",
  image: "ctia-level-3-day-1",
  links: [{ label: "See AMA on Facebook", short: "AMA on Facebook", url: AMA_FACEBOOK }],
};

const ACTIVITIES = [CTIA_ACTIVITY, FEATURED_ACTIVITY];

const EXPERIENCE_PATHWAYS = [
  { id: "internship", label: "Internship", caption: "Industry training" },
  { id: "work", label: "Work Experience", caption: "Jobs & programs" },
];

const PATHWAY_ICONS = { internship: GraduationCap, work: Briefcase };

const EXPERIENCE = [
  {
    company: "TechBizAcademy",
    pathway: "internship",
    position: "SOC Analyst Intern",
    logo: "techbizacademy-logo",
    employment: "Internship · 240 hours",
    location: "Remote",
    period: "",
    duration: "Oct - Nov (240 Hours)",
    type: "Networking & IT · Internship",
    description: "",
  },
  {
    company: "DOLE",
    pathway: "work",
    position: "Special Program for Employment of Students",
    logo: "asset-11af5d6e",
    employment: "May 2026",
    location: "San Mateo, Rizal · On-site",
    period: "",
    duration: "May 2026",
    type: "Networking & IT · Government Program",
    description:
      "Provided IT support and hardware troubleshooting, and handled data entry and digital filing for the department, all while studying Computer Engineering full-time.",
  },
];

const AFFILIATIONS = [
  {
    company: "For Girls Who Build",
    abbr: "FGWB",
    position: "Member",
    logo: "forgirlswhobuild-logo",
    duration: "Oct 2026 - Present",
    description: "Accepted into the For Girls Who Build community in October 2026.",
    links: [
      { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61593721307476" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/forgirlswhobuildph" },
    ],
  },
  {
    company: "Cisco NetConnect PUP – Manila",
    abbr: "CNCP",
    position: "Enterprise Networking Cadet",
    logo: "cisco-netconnect-pup-logo",
    duration: "Oct 2026 - Present",
    description: "Accepted member of the organization, recognized for dedication and potential in networking and technology.",
    links: [
      { label: "Facebook", url: "https://www.facebook.com/cisconetconnectpup" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/cncp-mnl" },
    ],
  },
  {
    company: "Association of Concerned Computer Engineering Students (ACCESS)",
    abbr: "ACCESS",
    position: "Technical Team",
    logo: "asset-77ad849f",
    duration: "2023 - 2024",
    description: "Supported the technical operations and activities of the organization.",
    links: [],
  },
];

const BLOG_PAGE_SIZE = 6;

const BLOGS = [
  {
    title: "What I Learned Building a Local AI App with 1,000 Developers",
    date: "Oct 9 - 10, 2026",
    category: "Hackathon",
    image: "appbuilders-hackathon-group",
    position: "object-[center_75%]",
    hero: true,
    excerpt: "24 hours at the AppBuilders PH Hackathon, a local LLM, and why losing taught me more than winning.",
    body: [
      "Participating in hackathons is always an intense experience, but my time at the AppBuilders PH Hackathon felt very different.",
      "At my first hackathon, the experience ended quietly. We built a project, sent in a pitch video from home, and got an email days later stating we didn't make the top 10.",
      "There was no feedback.",
      "This time was totally different.",
      "Walking into the venue and seeing over 500+ builders, a mix of college students and pros with years of experience, changed everything. The room was full of energy. And even though our team didn't win, staying to watch the top 12 teams present their work live taught me things no online tutorial could ever show.",
      "So yeah, maybe, it\u2019s not really a bad idea to go outside my comfort zone and do a side quest like this HAHAHAHAHHA",
    ],
    links: FEATURED_ACTIVITY.links,
  },
];

const blogSlug = (post) => slugOf(post.title);
const BLOG_BY_SLUG = Object.fromEntries(BLOGS.map((b) => [blogSlug(b), b]));
const readMinutes = (post) => Math.max(1, Math.ceil(post.body.join(" ").split(/\s+/).filter(Boolean).length / 200));

const ABOUT_PHOTOS = [
  { name: "About me · Me", caption: "Me", image: "aboutme-photo-me" },
  { name: "About me · Writing", caption: "Writing", image: "aboutme-photo-writing" },
  { name: "About me · Cubing", caption: "Cubing", image: "aboutme-photo-cubing" },
  { name: "About me · Jazz", caption: "Jazz", image: "aboutme-photo-jazz" },
  { name: "About me · Plants", caption: "Plants", image: "aboutme-photo-plants" },
  { name: "About me · Films", caption: "Films", image: "aboutme-photo-films" },
];

const EDUCATION = [
  {
    level: "Bachelor's Degree",
    program: "BS in Computer Engineering",
    institution: "University of Rizal System, Antipolo Campus",
    duration: "2023 - 2027",
    logo: "asset-39871438",
  },
  {
    level: "Senior High School",
    program: "General Academic Strand (GAS)",
    institution: "San Juan National High School",
    duration: "2021 - 2023",
    logo: "asset-96851f8e",
  },
];

const HERO_SIDES = [
  {
    id: "webapps",
    word: "Websites",
    tail: "on One Side.",
    label: "Software",
    count: WEB_APPS.length,
    blurb: "Web apps and interfaces, built end to end.",
    chips: ["React", "Firebase", "Tailwind"],
    Icon: CodeBrackets,
  },
  {
    id: "labs",
    word: "Networks",
    tail: "on the Other.",
    label: "Networking",
    count: LABS.length,
    blurb: "Topologies, routing and the infrastructure underneath.",
    chips: ["Cisco", "VLANs", "Routing"],
    Icon: NetworkNodes,
  },
];

const theme = {
  dark: {
    bg: "bg-black",
    bgSoft: "bg-neutral-900",
    surface: "bg-neutral-900/60",
    surfaceSolid: "bg-neutral-900",
    border: "border-neutral-800",
    text: "text-neutral-100",
    textMuted: "text-neutral-400",
    textFaint: "text-neutral-500",
    accent: "text-red-400",
    accentBg: "bg-red-400",
    navBg: "bg-black/70",
    ring: "ring-neutral-800",
  },
  light: {
    bg: "bg-slate-50",
    bgSoft: "bg-paper",
    surface: "bg-paper",
    surfaceSolid: "bg-paper",
    border: "border-slate-200",
    text: "text-slate-900",
    textMuted: "text-slate-600",
    textFaint: "text-slate-400",
    accent: "text-red-600",
    accentBg: "bg-red-500",
    navBg: "bg-white/80",
    ring: "ring-slate-200",
  },
};

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const scrollTop = h.scrollTop || document.body.scrollTop;
        const scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
        setProgress(scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function useOverlayClose(onClose) {
  const [closing, setClosing] = useState(false);
  const saved = useRef(onClose);
  saved.current = onClose;
  const timer = useRef(null);
  const requestClose = useCallback(() => {
    if (timer.current) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      saved.current();
      return;
    }
    setClosing(true);
    timer.current = setTimeout(() => saved.current(), 620);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  return [closing, requestClose];
}

function NetworkCanvas({ isDark }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width, height, dpr;
    let nodes = [];
    let packets = [];
    let rafId;

    const NODE_COUNT_BASE = 42;
    const MAX_DIST = 170;

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      const count = isDark
        ? Math.round(Math.min(NODE_COUNT_BASE * 1.6, Math.max(22, (width * height) / 22000)))
        : Math.round(Math.min(NODE_COUNT_BASE * 0.7, Math.max(12, (width * height) / 50000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 1.6,
      }));
      packets = [];
    }

    function maybeSpawnPacket(edges) {
      if (edges.length === 0) return;
      if (Math.random() < 0.02 && packets.length < 10) {
        const e = edges[Math.floor(Math.random() * edges.length)];
        packets.push({ a: e.a, b: e.b, t: 0, speed: 0.006 + Math.random() * 0.006 });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const lineColor = isDark ? "160, 160, 160" : "90, 90, 90";
      const nodeColor = isDark ? "200, 200, 200" : "90, 90, 90";
      const packetColor = isDark ? "255, 255, 255" : "0, 0, 0";

      const edges = [];
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * (isDark ? 0.75 : 0.45);
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = isDark ? 1 : 0.75;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            edges.push({ a, b });
          }
        }
      }

      if (!reduced && isDark) maybeSpawnPacket(edges);

      packets = packets.filter((p) => p.t <= 1);
      for (const p of packets) {
        p.t += p.speed;
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${packetColor}, 0.9)`;
        ctx.shadowColor = `rgba(${packetColor}, 0.8)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, isDark ? n.r : n.r * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${isDark ? 0.95 : 0.55})`;
        ctx.fill();
      }
    }

    function loop() {
      draw();
      rafId = requestAnimationFrame(loop);
    }

    init();
    if (reduced) {
      draw();
    } else {
      loop();
    }

    const ro = new ResizeObserver(() => {
      init();
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [isDark]);

  return (
    <div ref={containerRef} aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}

function StatusTag({ status, styles }) {
  const s = styles[status] || styles[Object.keys(styles)[0]];
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs tracking-wider ${s.text}`}>
      {s.label}
    </span>
  );
}

function renderDescription(description, t) {
  if (typeof description === "string") return description;
  return description.map((part, i) =>
    typeof part === "string" ? (
      <React.Fragment key={i}>{part}</React.Fragment>
    ) : (
      <span key={i} className="font-medium">
        {part.hl}
      </span>
    )
  );
}

function SectionHeading({ eyebrow, title, subtitle, caption, icon: Icon, t }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
      <p className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest ${t.accent} mb-3`}>
        {Icon && <Icon size={13} />} {eyebrow}
      </p>
      <h2 className={`font-display text-3xl sm:text-4xl font-bold ${t.text} mb-2`}>{title}</h2>
      {subtitle && <p className={`font-body text-sm sm:text-base ${t.textMuted} mx-auto`}>{subtitle}</p>}
      {caption && <p className={`font-mono text-xs ${t.textFaint} mt-3`}>{caption}</p>}
    </div>
  );
}

function ActivityLink({ link, t, isDark }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b pb-1.5 font-body text-sm font-medium ${t.text} ${isDark ? "border-neutral-600" : "border-slate-300"} hover:border-red-400 hover:text-red-400 transition-colors`}
    >
      {link.short ? (
        <>
          <span className="sm:hidden">{link.short}</span>
          <span className="hidden sm:inline">{link.label}</span>
        </>
      ) : (
        link.label
      )}
      <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function ActivityRow({ f, reverse, t, isDark }) {
  const [swapped, setSwapped] = useState(false);
  const photos = [
    { src: f.image, alt: f.inset ? `${f.title} group photo` : f.title, position: f.imagePosition || "object-center" },
    ...(f.inset ? [{ src: f.inset, alt: `${f.title} stage`, position: "object-center" }] : []),
  ];
  const [main, small] = swapped && photos[1] ? [photos[1], photos[0]] : photos;
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className={`relative ${f.inset ? "pb-10 pr-8 sm:pb-14 sm:pr-14" : ""} ${reverse ? "lg:order-2" : ""}`}>
        <img src={img(main.src)} alt={main.alt} className={`aspect-[4/3] w-full rounded-3xl object-cover ${main.position} border ${t.border}`} />
        {f.inset && small && (
          <button
            type="button"
            onClick={() => setSwapped((v) => !v)}
            aria-label="Swap photos"
            title="Swap photos"
            className={`group absolute bottom-0 right-0 w-32 sm:w-44 overflow-hidden rounded-2xl ring-4 ${isDark ? "ring-black" : "ring-slate-50"} transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-red-400`}
          >
            <img src={img(small.src)} alt={small.alt} className={`block aspect-[4/3] w-full object-cover ${small.position}`} />
            <span className="absolute bottom-2 left-2 rounded-full bg-black/60 p-1.5 text-white transition-colors group-hover:text-red-400">
              <ArrowLeftRight size={12} />
            </span>
          </button>
        )}
      </div>

      <div>
        <p className={`font-mono text-xs tracking-wide ${t.textMuted}`}>
          <span className={t.accent}>{f.label}</span> / {f.date}
        </p>
        <h3 className={`font-display font-bold text-3xl sm:text-4xl tracking-tight leading-tight ${t.text} mt-4`}>{f.title}</h3>
        <p className={`inline-flex items-center gap-1.5 font-body font-semibold text-base ${t.accent} mt-3`}>
          <MapPin size={15} /> {f.location}
        </p>
        <p className={`font-body text-base leading-relaxed ${t.textMuted} mt-5 max-w-lg`}>{f.description}</p>
        <div className="flex flex-nowrap items-center gap-x-6 sm:gap-x-8 mt-8">
          {f.links.map((link) => (
            <ActivityLink key={link.label} link={link} t={t} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LatestActivities({ t, isDark }) {
  return (
    <section id="activities" className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <SectionHeading eyebrow="03 · OUT IN THE COMMUNITY" title="Latest Activities" caption="What I've been building and where I've been." icon={Trophy} t={t} />

      <div className="space-y-20 lg:space-y-28">
        {ACTIVITIES.map((f, i) => (
          <Reveal key={f.title}>
            <ActivityRow f={f} reverse={i % 2 === 1} t={t} isDark={isDark} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const DOT_RADIUS_BY_LEVEL = [1.4, 2.2, 3, 3.8, 4.6];
const HEAT_LIGHT = ["#EBEDF0", "#9BE9A8", "#40C463", "#30A14E", "#216E39"];
const HEAT_DARK = ["#161B22", "#0E4429", "#006D32", "#26A641", "#39D353"];

function GithubActivity({ t, isDark }) {
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
              className={`shrink-0 inline-flex items-center gap-1.5 text-sm underline underline-offset-4 decoration-1 ${t.textMuted} hover:text-red-400 transition-colors`}
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
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-red-400">
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

function eduProgress(duration) {
  const m = String(duration).match(/(\d{4})\D+(\d{4})/);
  if (!m) return { done: true, total: 1, elapsed: 1, startY: "", endY: "" };
  const start = new Date(+m[1], 5, 1).getTime();
  const end = new Date(+m[2], 3, 30).getTime();
  const total = Math.max(1, +m[2] - +m[1]);
  const elapsed = Math.max(0, Math.min(total, (Date.now() - start) / (365.25 * 864e5)));
  return { done: Date.now() >= end, total, elapsed, startY: m[1], endY: m[2] };
}
const initialsOf = (name) =>
  name.replace(/[—–-].*$/, "").split(" ").filter((w) => /^[A-Z]/.test(w)).slice(0, 3).map((w) => w[0]).join("");

function ExperienceTimeline({ t, isDark }) {
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

function CertificationSection({ t, isDark }) {
  return (
    <section id="certification">
      <h1 className="font-display font-bold text-3xl sm:text-5xl">Certifications</h1>
      <p className={`text-sm sm:text-base ${t.textMuted} mt-3`}>Credentials I've earned and the ones I'm working toward.</p>

      <ul className={`mt-10 border-t ${t.border}`}>
        {CERTIFICATIONS.map((cert) => {
          const earned = !["In Progress", "Planned", "Upcoming"].includes(cert.status);
          const StatusIcon = earned ? CheckCircle2 : Clock;
          return (
            <li key={cert.name} className={`border-b ${t.border}`}>
              <div className="flex items-center gap-4 sm:gap-5 py-4 sm:py-5">
                <div className={`shrink-0 w-16 h-11 sm:w-20 sm:h-14 rounded-lg border ${t.border} overflow-hidden bg-white p-1.5 flex items-center justify-center`}>
                  {cert.image ? (
                    <img src={img(cert.image)} alt={`${cert.name} badge`} className="max-h-full max-w-full object-contain" />
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
                    <span>{cert.date}</span>
                    {cert.credentialId && <span>ID · {cert.credentialId}</span>}
                    {hasLink(cert.verifyUrl) ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 underline underline-offset-4 decoration-1 ${t.textMuted} hover:text-red-400 transition-colors`}
                      >
                        {cert.verifyLabel || "Verify"} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span>Verification soon</span>
                    )}
                  </div>
                </div>
                <span className={`hidden sm:block shrink-0 text-sm ${t.textFaint}`}>{cert.category}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const ABOUT_ME = [
  "I'm a fourth-year Computer Engineering student, still figuring things out as I find my way through the world of technology. I'm learning to write code, understand networks, and discover what happens behind the systems we use every day. I may still have a long way to go, but I guess that's part of the journey.",
  "Outside the world of code and cables, there's a part of me that has always belonged to stories. I used to write novels on Wattpad, getting lost in worlds of my own making. These days, I write less often, but the storyteller in me never really left. Maybe that's why I've always been drawn to films, too. There's something beautiful about turning an idea into something people can see, hear, and feel. Somewhere along the way, becoming a filmmaker became one of those dreams I couldn't quite let go of.",
  "When I'm not writing code or daydreaming about stories, you'll probably find me solving a Rubik's Cube, listening to jazz with my headphones on, or admiring plants and imagining the little garden I'd love to have someday.",
  "I don't have everything figured out just yet. I'm still learning, still exploring, and still discovering the things I could become.",
  "At the end of the day, I'm just someone with a curious mind and a lot of dreams. I'm a future tech professional, a former Wattpad author, a casual cuber, a jazz lover, a plant lover, and a filmmaker at heart. I may be taking the engineering path for now, but a part of me will always be drawn to stories, cameras, and the magic of bringing an idea to life. I'm still figuring things out, learning as I go, and discovering the many things I could become. And honestly, I think that's one of the most exciting parts of being me",
];

const STACK_X = [0, 48, 72, 84];
const SWIPE_THRESHOLD = 40;

function StackCard({ photo, offset, dragging, isDark, onBroken, broken }) {
  const abs = Math.abs(offset);
  const src = img(photo.image);
  const show = src && !broken;
  const active = offset === 0;
  const dir = offset < 0 ? -1 : 1;
  const x = STACK_X[Math.min(abs, STACK_X.length - 1)] * dir;
  const visible = abs <= 3;

  return (
    <div
      data-offset={offset}
      aria-hidden={!active}
      className="absolute left-1/2 top-1/2 h-[84%] aspect-[4/5] select-none"
      style={{
        transform: `translate(-50%, -50%) translateX(calc(${x}% + var(--drag, 0px))) translateY(${abs * 2}%) rotate(${offset * 5}deg) scale(${1 - abs * 0.07})`,
        zIndex: 10 - abs,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: dragging ? "opacity 300ms ease" : "transform 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease",
        cursor: active ? "grab" : "pointer",
      }}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-2xl border-[3px] shadow-xl ${
          isDark ? "border-neutral-800 bg-neutral-900" : "border-white bg-slate-100"
        }`}
        style={{ filter: active ? "none" : `brightness(${isDark ? 0.7 : 0.92})`, transition: "filter 400ms ease" }}
      >
        {show ? (
          <img
            src={src}
            alt={active ? photo.caption : ""}
            draggable={false}
            onError={() => onBroken(photo.image)}
            className="h-full w-full object-cover pointer-events-none"
          />
        ) : (
          <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${isDark ? "text-neutral-500" : "text-slate-400"}`}>
            <ImageIcon size={22} />
            <span className="font-mono text-[10px] tracking-widest uppercase">Photo soon</span>
          </div>
        )}
      </div>
    </div>
  );
}

function PhotoStack({ photos, t, isDark }) {
  const n = photos.length;
  const [active, setActive] = useState(Math.min(2, n - 1));
  const [broken, setBroken] = useState({});
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const drag = useRef({ id: null, startX: 0, startY: 0, moved: false, offset: null });

  const wrap = useCallback((i) => ((i % n) + n) % n, [n]);
  const go = useCallback((i) => setActive(wrap(i)), [wrap]);
  const half = Math.floor(n / 2);
  const offsetOf = (i) => ((i - active + n + half) % n) - half;

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const card = e.target.closest("[data-offset]");
    drag.current = { id: e.pointerId, startX: e.clientX, startY: e.clientY, moved: false, offset: card ? Number(card.dataset.offset) : null };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) d.moved = true;
    setDragX(dx * 0.6);
  };

  const finish = (e, cancelled) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    drag.current = { ...d, id: null };
    setDragging(false);
    setDragX(0);
    if (cancelled) return;
    if (d.moved && Math.abs(dx) >= SWIPE_THRESHOLD) {
      go(active + (dx < 0 ? 1 : -1));
    } else if (!d.moved && d.offset !== null) {
      go(d.offset === 0 ? active + 1 : active + d.offset);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
  };

  if (!n) return null;

  return (
    <div>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Photos of me"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => finish(e, false)}
        onPointerCancel={(e) => finish(e, true)}
        className="relative w-full aspect-video overflow-x-clip rounded-2xl"
        style={{ touchAction: "pan-y", "--drag": `${dragX}px` }}
      >
        <div className="absolute inset-0">
          {photos.map((photo, i) => (
            <StackCard
              key={photo.image}
              photo={photo}
              offset={offsetOf(i)}
              dragging={dragging}
              isDark={isDark}
              broken={!!broken[photo.image]}
              onBroken={(k) => setBroken((b) => ({ ...b, [k]: true }))}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose photo">
          {photos.map((photo, i) => (
            <button
              key={photo.image}
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${photo.caption}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? `w-6 ${t.accentBg}` : `w-1.5 ${isDark ? "bg-neutral-700 hover:bg-neutral-500" : "bg-slate-300 hover:bg-slate-400"}`
              }`}
            />
          ))}
        </div>
        <p className={`font-mono text-[11px] ${t.textFaint}`}>Swipe or click the stack to shuffle</p>
      </div>
    </div>
  );
}

function AboutMeSection({ t, isDark }) {
  return (
    <section id="aboutme" className="max-w-4xl mx-auto">
      <p className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest ${t.accent} mb-3`}>
        <User size={13} /> MORE ABOUT ME
      </p>
      <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">A little more of me</h2>
      <div className="mt-8">
        <p className={`font-mono text-[11px] tracking-widest uppercase ${t.accent}`}>Snapshots</p>
        <div className="mt-5">
          <PhotoStack photos={ABOUT_PHOTOS} t={t} isDark={isDark} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <p className="font-display text-2xl sm:text-3xl font-medium leading-snug mt-14">
          Hi, I'm <span className={t.accent}>RK</span>!
        </p>
      </div>

      <div className="mt-6 max-w-2xl mx-auto">
        {ABOUT_ME.map((block, i) => {
          if (block.startsWith("## ")) {
            return (
              <h3 key={i} className="font-display font-semibold text-xl sm:text-2xl leading-snug tracking-tight mt-10">
                {block.slice(3)}
              </h3>
            );
          }
          const closing = i === ABOUT_ME.length - 1;
          return (
            <p
              key={i}
              style={{ hyphens: "auto", WebkitHyphens: "auto" }}
              className={`font-body text-base sm:text-[17px] leading-[1.8] mt-5 first:mt-0 text-justify ${
                closing ? `font-medium ${t.text}` : t.textMuted
              }`}
            >
              {block}
            </p>
          );
        })}
      </div>

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

function SectionPanel({ t, onClose, listenEsc = true, width = "max-w-6xl", children }) {
  const [closing, requestClose] = useOverlayClose(onClose);
  useEffect(() => {
    if (!listenEsc) return;
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose, listenEsc]);

  return (
    <div id="panel-scroll" className={`${closing ? "overlay-sink" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto ${t.bg} ${t.text}`}>
      <div className={`${width} mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-20`}>
        <button onClick={requestClose} className={`inline-flex items-center gap-2 text-sm ${t.textMuted} hover:text-red-400 transition-colors`}>
          <ArrowRight size={14} className="rotate-180" /> Back to portfolio
        </button>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}

function AffiliationSection({ t, isDark }) {
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
                  <img src={img(org.logo)} alt={`${org.company} logo`} className="max-h-full max-w-full object-contain" />
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
                        className={`inline-flex items-center gap-1 text-sm underline underline-offset-4 decoration-1 ${t.textMuted} hover:text-red-400 transition-colors`}
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

function BlogAuthor({ t, size = 24 }) {
  return (
    <span className="inline-flex items-center gap-2">
      <img src={img(PROFILE.photo)} alt="" style={{ width: size, height: size }} className="rounded-full object-cover" />
      <span className={`font-body text-[13px] ${t.text}`}>{PROFILE.name}</span>
    </span>
  );
}

function BlogSection({ t, isDark }) {
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
    `font-mono text-xs ${disabled ? `${t.textFaint} opacity-40 cursor-not-allowed` : `${t.textMuted} hover:text-red-400`} transition-colors`;

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
                on ? `${isDark ? "border-white text-white" : "border-slate-900 text-slate-900"}` : `border-transparent ${t.textMuted} hover:text-red-400`
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
            <img
              src={img(post.image)}
              alt=""
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

function BlogArticle({ t, isDark, post, onBack }) {
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
        <button onClick={requestClose} className={`inline-flex items-center gap-1.5 font-mono text-xs ${t.textMuted} hover:text-red-400 transition-colors`}>
          <ArrowLeftIcon size={13} /> all posts
        </button>

        <h1 className="font-display font-bold text-[32px] sm:text-[42px] leading-[1.15] tracking-tight mt-10">{post.title}</h1>
        <p className={`font-body text-lg sm:text-xl leading-relaxed ${t.textMuted} mt-4`}>{post.excerpt}</p>

        <div className={`mt-8 flex items-center justify-between gap-4 border-y ${t.border} py-4`}>
          <div className="flex items-center gap-3 min-w-0">
            <img src={img(PROFILE.photo)} alt="" className="h-11 w-11 rounded-full object-cover" />
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
            className={`shrink-0 inline-flex items-center gap-1.5 font-body text-[13px] ${t.textMuted} hover:text-red-400 transition-colors`}
          >
            <ExternalLink size={14} /> {copied ? "Link copied" : "Share"}
          </button>
        </div>

        {post.hero && (
          <img src={img(post.image)} alt={post.title} className={`mt-8 aspect-[16/10] w-full rounded-lg object-cover ${post.position}`} />
        )}

        <div className="font-serif-read mt-10 text-[19px] sm:text-[21px] leading-[1.75]">
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

function EducationRow({ edu, t, isDark }) {
  const { done, startY, endY } = eduProgress(edu.duration);
  return (
    <li className={`flex items-center gap-4 border-b ${t.border} py-4`}>
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white p-1 ring-1 ring-black/10 flex items-center justify-center">
        {edu.logo ? (
          <img src={img(edu.logo)} alt={edu.institution} className="h-full w-full object-contain" />
        ) : (
          <span className="font-mono text-xs font-bold text-red-500">{initialsOf(edu.institution)}</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display font-semibold text-[15px] leading-snug">{edu.program}</p>
        <p className={`font-body text-[13px] ${t.textMuted} mt-0.5`}>{edu.institution}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className={`font-mono text-xs ${t.text}`}>{startY} - {endY}</p>
        <p className={`mt-1 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider ${done ? t.textFaint : t.accent}`}>
          {!done && <span className="h-1.5 w-1.5 rounded-full bg-red-400" />}
          {done ? "Graduated" : "In progress"}
        </p>
      </div>
    </li>
  );
}

const ALL_SKILL_ITEMS = SKILLS.flatMap((g) => g.items);
const pickSkills = (names) => names.map((n) => ALL_SKILL_ITEMS.find((i) => i.name === n)).filter(Boolean);

const AI_TOOLING = [
  { name: "Claude", abbr: "CL", icon: "https://cdn.simpleicons.org/claude" },
  { name: "ChatGPT", abbr: "GPT", icon: "asset-5fd2cb0e" },
  { name: "Gemini", abbr: "GEM", icon: "https://cdn.simpleicons.org/googlegemini" },
];

const SKILL_GROUPS = [
  { title: "Languages", items: pickSkills(["JavaScript", "HTML", "CSS", "Python", "Lua (Roblox)", "SQL", "R"]) },
  { title: "Frameworks & Libraries", items: pickSkills(["React", "Tailwind CSS", "Vite", "Node.js", "Express", "Progressive Web Apps (PWA)"]) },
  { title: "Databases", items: pickSkills(["Firebase / Firestore", "MySQL", "PostgreSQL", "Microsoft SQL Server", "SQLite"]) },
  { title: "Platforms & Tooling", items: pickSkills(["Git", "GitHub", "VS Code", "Docker", "Cisco Packet Tracer"]) },
  { title: "AI Tooling", items: [...AI_TOOLING, ...pickSkills(["Local AI with Ollama"])] },
];
const SKILL_TOTAL = SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0);

const IMAGE_FIELDS = ["icon", "thumbnail", "thumbnailDark", "gallery", "galleryDark", "image", "inset", "logo"];
export const IMAGE_SLOTS = (() => {
  const slots = { [PROFILE.photo]: ["Profile photo"] };
  const sources = [...ALL_SKILL_ITEMS, ...AI_TOOLING, ...ALL_PROJECTS, ...CERTIFICATIONS, ...ACTIVITIES, ...EXPERIENCE, ...AFFILIATIONS, ...BLOGS, ...ABOUT_PHOTOS, ...EDUCATION];
  for (const item of sources) {
    const name = item.name || item.title || item.company || item.institution || "Item";
    for (const field of IMAGE_FIELDS) {
      const keys = [].concat(item[field] || []).filter((k) => typeof k === "string" && /^[a-z0-9][a-z0-9-]*$/.test(k));
      keys.forEach((key, i) => {
        const label = `${name} · ${field}${keys.length > 1 ? ` ${i + 1}` : ""}`;
        slots[key] = slots[key] || [];
        if (!slots[key].includes(label)) slots[key].push(label);
      });
    }
  }
  return slots;
})();

function SkillTile({ item, t, isDark }) {
  const [broken, setBroken] = useState(false);
  const showImg = item.icon && !broken;
  return (
    <div className="flex flex-col items-center text-center gap-2.5" title={item.name}>
      <div className="relative">
        <div className={`h-14 w-14 rounded-2xl border ${t.border} ${isDark ? "bg-black/40" : "bg-slate-50"} flex items-center justify-center p-1.5 card-glow`}>
          {showImg ? (
            <div className="h-full w-full rounded-lg bg-white flex items-center justify-center p-1 shadow-sm">
              <img src={img(item.icon)} alt={item.name} onError={() => setBroken(true)} className="h-full w-full object-contain" />
            </div>
          ) : (
            <span className={`font-mono text-[11px] font-bold tracking-wider ${t.accent}`}>{item.abbr}</span>
          )}
        </div>
      </div>
      <span className={`font-body text-xs sm:text-[13px] leading-snug ${t.textMuted}`}>{item.name}</span>
    </div>
  );
}

function SkillsArchive({ t, onClose, isDark }) {
  const [closing, requestClose] = useOverlayClose(onClose);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  return (
    <div className={`${closing ? "overlay-sink" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto ${t.bg} ${t.text}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <button onClick={requestClose} className={`inline-flex items-center gap-2 font-mono text-xs ${t.textMuted} hover:text-red-400 transition-colors`}>
          <ArrowRight size={14} className="rotate-180" /> Back to portfolio
        </button>
        <h1 className="font-display font-bold text-4xl sm:text-6xl mt-12">Tech Stack</h1>
        <p className={`font-mono text-sm ${t.accent} mt-3`}>Everything I build, configure, and debug with.</p>

        <div className="mt-12 space-y-12">
          {SKILL_GROUPS.map((group) => (
            <section key={group.title}>
              <div className="flex items-center gap-4 mb-7">
                <h2 className={`font-mono text-xs tracking-[0.25em] uppercase ${t.textFaint}`}>{group.title}</h2>
                <span className={`h-px flex-1 border-t ${t.border}`} />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8">
                {group.items.map((item) => (
                  <SkillTile key={item.name} item={item} t={t} isDark={isDark} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectArchive({ t, isDark, onClose, instant }) {
  const [closing, requestClose] = useOverlayClose(onClose);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  return (
    <div className={`${closing ? "overlay-sink" : instant ? "" : "overlay-rise"} fixed inset-0 z-[60] overflow-y-auto ${t.bg} ${t.text}`}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <button onClick={requestClose} className={`inline-flex items-center gap-2 text-sm ${t.textMuted} hover:text-red-400 transition-colors`}>
          <ArrowRight size={14} className="rotate-180" /> Back to portfolio
        </button>
        <h1 className="font-display font-bold text-3xl sm:text-5xl mt-10">Project Log</h1>
        <p className={`text-sm sm:text-base ${t.textMuted} mt-3`}>Everything I've built, wired up, and shipped.</p>

        <ul className={`mt-10 border-t ${t.border}`}>
          {ALL_PROJECTS.map((p) => (
            <li key={p.title} className={`border-b ${t.border}`}>
              <a href={`#${slugOf(p.title)}`} className="group flex items-center gap-4 sm:gap-5 py-4 sm:py-5">
                <div className={`shrink-0 w-16 h-11 sm:w-20 sm:h-14 rounded-lg border ${t.border} overflow-hidden ${t.surfaceSolid}`}>
                  {p.thumbnail && <img src={img(thumbFor(p, isDark))} alt="" loading="lazy" className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display font-semibold group-hover:text-red-400 transition-colors">{p.title}</span>
                  </div>
                  <p className={`text-sm ${t.textMuted} mt-1 leading-snug`}>{taglineOf(p)}</p>
                </div>
                <span className={`hidden sm:block shrink-0 text-sm ${t.textFaint}`}>{trackOf(p.title)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProjectDetail({ t, isDark, project: p, onBack }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onBack();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);

  const gallery = galleryFor(p, isDark);
  const images = (gallery && gallery.length ? gallery : [thumbFor(p, isDark)]).filter(Boolean);
  const [slide, setSlide] = useState(0);
  const idx = ALL_PROJECTS.indexOf(p);
  const next = ALL_PROJECTS[(idx + 1) % ALL_PROJECTS.length];
  const links = [
    hasLink(p.view) && { label: /roblox\.com/.test(p.view) ? "Play on Roblox" : "Live demo", href: p.view },
    hasLink(p.github) && { label: "GitHub", href: p.github },
  ].filter(Boolean);
  const navBtn = `h-10 w-10 rounded-full border ${t.border} flex items-center justify-center transition-colors hover:border-red-400 hover:text-red-400 disabled:opacity-30 disabled:pointer-events-none`;

  return (
    <div className={`fixed inset-0 z-[60] overflow-y-auto ${t.bg} ${t.text}`}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <a href="#archive" className={`inline-flex items-center gap-2 text-sm ${t.textMuted} hover:text-red-400 transition-colors`}>
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
          </div>
          <div className="flex flex-wrap items-center gap-5 text-sm">
            {links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${t.textMuted} hover:text-red-400 transition-colors`}>
                {l.label} <ArrowUpRight size={14} />
              </a>
            ))}
            {p.privateDemo && <span className={t.textFaint}>Live demo is private</span>}
          </div>
        </div>

        {images.length > 0 && (
          <>
            <div className={`mt-8 rounded-2xl border ${t.border} overflow-hidden ${t.surfaceSolid}`}>
              <img src={img(images[slide])} alt={`${p.title} screenshot ${slide + 1}`} className="w-full h-auto block" />
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

        {next && next !== p && (
          <a href={`#${slugOf(next.title)}`} className={`group mt-14 pt-6 border-t ${t.border} flex items-center justify-between gap-4`}>
            <span className={`text-sm ${t.textFaint}`}>Next project</span>
            <span className="inline-flex items-center gap-2 font-display font-semibold group-hover:text-red-400 transition-colors">
              {next.title} <ArrowRight size={15} />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

const SIDEBAR_GROUPS = [
  {
    label: null,
    items: [{ id: "hero", label: "Home", Icon: House }],
  },
  {
    label: "About Me",
    items: [
      { id: "about", label: "About", Icon: User },
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

function Sidebar({ t, isDark, collapsed: collapsedPref, onToggleCollapse, activeId, onNavigate, onToggleTheme, mailtoUrl, mobile = false, open = false, onClose }) {
  const collapsed = !mobile && collapsedPref;
  const hoverText = isDark ? "hover:text-neutral-100" : "hover:text-slate-900";
  const hoverBg = isDark ? "hover:bg-white/5" : "hover:bg-slate-900/[0.04]";
  const activeBg = isDark ? "bg-white/[0.06]" : "bg-slate-900/[0.05]";
  const iconBtn = `h-9 w-9 shrink-0 rounded-full border ${t.border} flex items-center justify-center ${t.textMuted} hover:text-red-400 hover:border-red-400/60 transition-colors`;

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
            aria-label={`${PROFILE.name}, back to top`}
            className={`font-display font-bold text-xl tracking-tight ${t.text} hover:text-red-400 transition-colors`}
          >
            {PROFILE.name}
          </button>
        )}
        {mobile ? (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className={`h-9 w-9 rounded-xl flex items-center justify-center ${t.textMuted} ${hoverBg} hover:text-red-400 transition-colors`}
          >
            <X size={17} />
          </button>
        ) : (
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`h-9 w-9 rounded-xl flex items-center justify-center ${t.textMuted} ${hoverBg} hover:text-red-400 transition-colors`}
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
          className={`flex items-center rounded-2xl border ${t.border} ${collapsed ? "h-11 justify-center" : "h-11 gap-3 px-4"} ${t.text} text-sm font-medium hover:border-red-400/60 hover:text-red-400 transition-colors`}
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
        {!collapsed && (
          <div className="min-w-0 pr-3">
            <p className={`font-body text-[11px] leading-snug ${t.textFaint}`}>
              For work, collabs &amp; everything else, reach me at
            </p>
            <a
              href={mailtoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1.5 inline-flex max-w-full items-center gap-1.5 font-mono text-[11px] ${t.textMuted} hover:text-red-400 transition-colors`}
            >
              <Mail size={12} className="shrink-0" />
              <span className="truncate">{PROFILE.email}</span>
            </a>
          </div>
        )}
        <div className={collapsed ? "flex flex-col gap-2" : "flex items-center gap-2"}>
          <button aria-label="Toggle theme" title="Toggle theme" onClick={onToggleTheme} className={iconBtn}>
            <Contrast size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}

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
  const [projectSearch, setProjectSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [booting, setBooting] = useState(true);
  const [bootScreenMounted, setBootScreenMounted] = useState(true);
  const [bootBar, setBootBar] = useState(0);
  const [bootPct, setBootPct] = useState(0);
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

  const switchProjectTab = useCallback((tab) => {
    setProjectTab(tab);
    setActiveCategory("All");
    setProjectSearch("");
    setShowAllProjects(false);
  }, []);

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

  useEffect(() => {
    const raf = requestAnimationFrame(() => setBootBar(100));
    const hideTimer = setTimeout(() => setBooting(false), 3000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 3000);
      setBootPct(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (booting) {
      document.body.classList.add("overflow-hidden");
      return;
    }
    document.body.classList.remove("overflow-hidden");
    const unmountTimer = setTimeout(() => setBootScreenMounted(false), 900);
    return () => clearTimeout(unmountTimer);
  }, [booting]);

  const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}&su=${encodeURIComponent(
    "Let's connect: Internship Opportunity"
  )}`;

  const filteredProjects = useMemo(() => {
    const source = projectTab === "labs" ? LABS : WEB_APPS;
    return source.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const q = projectSearch.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [projectTab, activeCategory, projectSearch]);

  const projectCategories = projectTab === "labs" ? LAB_CATEGORIES : WEBAPP_CATEGORIES;

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
      if (h === "affiliation" || h === "blogs" || h === "certification" || h === "aboutme") {
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
  const featured = (projectTab === "labs" ? LABS : WEB_APPS).slice(0, 3);
  const [revealed, setRevealed] = useState({});
  const toggleReveal = (title) => setRevealed((r) => ({ ...r, [title]: !r[title] }));

  const openGroup = (tab) => {
    switchProjectTab(tab);
    scrollToId("labs");
  };

  return (
    <div
      className={`relative isolate min-h-screen ${t.bg} ${t.text} transition-[color,background-color,padding] duration-300 ${
        sidebarCollapsed ? "lg:pl-[5.25rem]" : "lg:pl-[16.75rem]"
      }`}
    >
      <NetworkCanvas isDark={isDark} />

      {bootScreenMounted && (
        <div
          className={`fixed inset-0 z-[70] flex flex-col justify-between overflow-hidden ${t.bg} transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
            booting ? "translate-y-0" : "-translate-y-full pointer-events-none"
          }`}
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="flex items-center justify-between px-6 sm:px-12 pt-7 sm:pt-10">
            <p className="font-display font-semibold text-lg tracking-tight flex items-center gap-2">
              RK
            </p>
          </div>

          <div className="px-6 sm:px-12">
            <p className={`font-mono text-xs sm:text-sm ${t.textMuted} flex items-center gap-2`}>
              <span className="text-red-400">›</span>
              {bootPct < 30
                ? "Initializing"
                : bootPct < 60
                ? "Loading projects"
                : bootPct < 95
                ? "Connecting the network"
                : "Ready"}
              <span className="animate-blink text-red-400">_</span>
            </p>
            <p className={`font-display text-lg sm:text-2xl font-medium tracking-tight mt-2 ${t.text}`}>
              PORTFOLIO
            </p>
          </div>

          <div>
            <div className="px-6 sm:px-12 flex items-end justify-between">
              <p
                className={`font-display font-bold tabular-nums leading-[0.85] tracking-tighter text-[28vw] sm:text-[14rem] ${t.text}`}
                aria-hidden="true"
              >
                {String(bootPct).padStart(2, "0")}
                <span className="text-red-400 text-[0.35em] align-top ml-1">%</span>
              </p>
            </div>
            <div className={`mt-6 sm:mt-8 h-[3px] w-full ${isDark ? "bg-neutral-800" : "bg-slate-200"}`}>
              <div className="h-full bg-red-400" style={{ width: `${bootPct}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 right-0 z-50 bg-transparent" style={{ height: "2px" }}>
        <div
          className="h-full bg-red-400 transition-all duration-150 ease-out"
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
            className={`font-display font-bold text-xl tracking-tight ${t.text} hover:text-red-400 transition-colors`}
          >
            {PROFILE.name}
          </button>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={() => setIsDark((d) => !d)}
              className={`h-9 w-9 rounded-full border ${t.border} flex items-center justify-center ${t.textMuted} hover:text-red-400 hover:border-red-400/60 transition-colors`}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className={`h-9 w-9 rounded-full flex items-center justify-center transition-colors ${
                menuOpen ? `border border-red-400 ${t.accent}` : `border ${t.border} ${t.textMuted}`
              }`}
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </nav>
      </header>

      <section id="hero" className="relative pt-16 lg:pt-0 flex items-center overflow-hidden" style={{ minHeight: "92vh" }}>
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24 w-full">
          <h1 className="sr-only">Websites on One Side. Networks on the Other.</h1>

          <div className="hero-split group/hero grid grid-cols-1 md:grid-cols-2 gap-y-14 md:gap-x-8">
            {HERO_SIDES.map((side, i) => (
              <Reveal key={side.id} delay={110 + i * 60} className="min-w-0">
                <div className="group/side block w-full text-left transition-opacity duration-500 md:group-hover/hero:opacity-30 md:hover:!opacity-100">
                  <h2 className="font-display font-bold tracking-[-0.04em] leading-[0.88]">
                    <span
                      className={`hero-word block whitespace-nowrap ${t.accent} transition-transform duration-500 group-hover/side:translate-x-2`}
                    >
                      {side.word}
                    </span>
                    <span className={`hero-tail mt-3 block whitespace-nowrap font-semibold tracking-[-0.03em] ${t.text}`}>
                      {side.tail}
                    </span>
                  </h2>
                  <span aria-hidden="true" className="mt-8 block h-[3px] w-12 rounded-full bg-red-400 transition-all duration-500 group-hover/side:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
                { big: "Email", label: "Get in touch", href: mailtoUrl, external: false },
                { big: "GitHub", label: "See my code", href: PROFILE.github, external: true },
              ].map((item) => {
                const inner = (
                  <>
                    <ArrowUpRight size={14} className={`absolute right-0 top-1 ${t.textFaint} transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-400`} />
                    <p className={`font-display text-xl sm:text-[28px] font-medium leading-tight tracking-tight ${t.text} transition-colors group-hover:text-red-400`}>
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
            <p className={`mt-10 flex items-center gap-2 font-body text-xs sm:text-[13px] ${t.textFaint}`}>
              <PanelLeft size={14} className="shrink-0" />
              <span>Check the sidebar/menu for more information: certifications, blogs, and affiliations.</span>
            </p>
          </Reveal>
        </div>
      </section>

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
              onClick={openSkills}
              className={`inline-flex items-center gap-2 rounded-lg border border-red-400 px-6 py-3 font-mono text-sm ${t.accent} hover:bg-red-400/10 transition-colors`}
            >
              View more skills ({SKILL_TOTAL}) <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <LatestActivities t={t} isDark={isDark} />

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
                  onClick={() => switchProjectTab(key)}
                  aria-pressed={projectTab === key}
                  className={`font-display text-2xl sm:text-3xl font-bold pb-1 border-b-2 transition-colors ${
                    projectTab === key ? `${t.text} border-red-400` : `${t.textFaint} border-transparent hover:${t.textMuted}`
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
                            onClick={() => toggleReveal(item.title)}
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
                        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-red-400/10 ${t.accent}`}>
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
                        <a href={item.github} target="_blank" rel="noreferrer" aria-label={`${item.title} on GitHub`} className="hover:text-red-400 transition-colors"><Github size={19} /></a>
                      )}
                      {hasLink(item.view) && (
                        <a href={item.view} target="_blank" rel="noreferrer" aria-label={`${item.title} preview`} className="hover:text-red-400 transition-colors"><ExternalLink size={19} /></a>
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
            onClick={openArchive}
            className={`inline-flex items-center gap-2 rounded-lg border border-red-400 px-6 py-3 font-mono text-sm ${t.accent} hover:bg-red-400/10 transition-colors`}
          >
            View all my projects ({ALL_PROJECTS.length}) <ArrowRight size={15} />
          </button>
        </div>
      </section>

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

      <GithubActivity t={t} isDark={isDark} />

      <footer className={`border-t ${t.border}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`font-mono text-xs ${t.textFaint}`}>
            © {new Date().getFullYear()} {PROFILE.name}. Built with React + Tailwind CSS.
          </p>
          <div className="flex items-center gap-4">
            <a href={PROFILE.github} className={`${t.textFaint} hover:text-red-400`} aria-label="GitHub"><Github size={16} /></a>
            <a href={PROFILE.linkedin} className={`${t.textFaint} hover:text-red-400`} aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href={mailtoUrl} className={`${t.textFaint} hover:text-red-400`} aria-label="Email"><Mail size={16} /></a>
            <button onClick={openResumes} className={`font-mono text-xs ${t.textMuted} hover:text-red-400 flex items-center gap-1.5`}>
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
      {panel === "blogs" && <SectionPanel t={t} onClose={closePanel} listenEsc={!postSlug}><BlogSection t={t} isDark={isDark} /></SectionPanel>}
      {panel === "blogs" && postSlug && <BlogArticle key={postSlug} t={t} isDark={isDark} post={BLOG_BY_SLUG[postSlug]} onBack={backToPosts} />}
      {skillsOpen && <SkillsArchive t={t} onClose={closeSkills} isDark={isDark} />}

      {showTop && !menuOpen && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={`group fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full ${t.surfaceSolid} ${t.text} flex items-center justify-center transition-colors hover:text-red-400`}
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
              className="stroke-red-400"
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