import cvPdf from "./assets/Rose_Kate_Zonio_CV.pdf";
import { CodeBrackets, NetworkNodes, ShieldCheck, Code2, Network, GraduationCap, Briefcase } from "./icons.jsx";

export const PROFILE = {
  name: "RK",
  fullName: "Rose Kate Zonio",
  role: "Software & Networking/IT",
  subrole: "Computer Engineering · Software & Networking/IT",
  email: "rkzonio1@gmail.com",
  photo: "asset-a1c55936",
  github: "https://github.com/arkyxo",
  githubUsername: "arkyxo",
  linkedin: "https://www.linkedin.com/in/rkzonio/",
  location: "Rizal, Philippines",
  city: "Rizal",
};

export const hasLink = (u) => !!u && u !== "#";

export const RESUME_URL = cvPdf;

export const NAV_LINKS = [
  { id: "aboutme", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "activities", label: "Side Quest" },
  { id: "labs", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "github-activity", label: "GitHub" },
];

export const SKILLS = [
  {
    category: "Software",
    blurb: "Full-stack web, Python, Lua, databases",
    icon: Code2,
    items: [
      { name: "JavaScript", abbr: "JS" , icon: "asset-9fd9590f" },
      { name: "HTML", abbr: "HTML" , icon: "asset-84111716" },
      { name: "CSS", abbr: "CSS" , icon: "asset-96c75af1" },
      { name: "React", abbr: "JSX" , icon: "asset-b5acca38" },
      { name: "Tailwind CSS", abbr: "TW" , icon: "asset-12b1b727" },
      { name: "Python", abbr: "PY" , icon: "asset-2567e649" },
      { name: "Lua (Roblox)", abbr: "LUA" , icon: "asset-dc866c64" },
      { name: "Git", abbr: "GIT", icon: "asset-e9ee8d5e" },
      { name: "GitHub", abbr: "GH", icon: "asset-44876619" },
      { name: "VS Code", abbr: "VS", icon: "asset-3c66e1fc" },
      { name: "Microsoft SQL Server", abbr: "MS", icon: "asset-247d2abe" },
      { name: "Firebase / Firestore", abbr: "FB" , icon: "asset-83b2b79f" },
      { name: "SQL", abbr: "SQL" , icon: "asset-b5f6c886" },
      { name: "PostgreSQL", abbr: "PG" , icon: "asset-c5fca167" },
      { name: "Vite", abbr: "VITE", icon: "https://cdn.simpleicons.org/vite" },
      { name: "Node.js", abbr: "NODE", icon: "https://cdn.simpleicons.org/nodedotjs" },
      { name: "Express", abbr: "EXP", icon: "https://cdn.simpleicons.org/express" },
      { name: "SQLite", abbr: "SQLT", icon: "https://cdn.simpleicons.org/sqlite" },
      { name: "Progressive Web Apps (PWA)", abbr: "PWA", icon: "https://cdn.simpleicons.org/pwa" },
      { name: "Local AI with Ollama", abbr: "AI", icon: "https://cdn.simpleicons.org/ollama" },
      { name: "REST API Integration", abbr: "API", icon: "rest-api" },
    ],
  },
  {
    category: "Networking & IT",
    blurb: "VLANs, routing, virtual labs, IT support",
    icon: Network,
    items: [
      { name: "Cisco Packet Tracer", abbr: "CPT", icon: "asset-a8e20bfa" },
      { name: "Python Network Scripting", abbr: "PY" },
      { name: "Command-Line Administration", abbr: "CLI" },
      { name: "VLANs & Inter-VLAN Routing", abbr: "VLAN" },
      { name: "Cisco IOS CLI", abbr: "IOS" },
      { name: "TCP/IP, DNS & DHCP", abbr: "TCP", icon: "tcp-ip" },
      { name: "Network Security Fundamentals", abbr: "SEC" },
      { name: "VirtualBox", abbr: "VBOX", icon: "virtualbox" },
      { name: "Kali Linux", abbr: "KALI", icon: "kali-linux" },
    ],
  },
];

export const LABS = [
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
    detail: {
      role: "Solo project",
      problem: "You can't see who's on your home network. A phone, a laptop, or a stranger can join silently and nobody would ever notice.",
      approach: "One file, no dependencies: a Python script that ping-sweeps the whole subnet in parallel, compares what it finds against an approved device list, and pings me on Telegram or Discord the moment something unfamiliar shows up.",
      challenges: [
        { title: "Sequential scanning was too slow", fix: "Parallel pings so a full /24 sweep finishes in seconds instead of minutes." },
        { title: "Local failures look like real outages", fix: "A detector that separates ISP failures from a device simply going quiet, plus a SQLite history of uptime, ping, loss, and jitter to check against." },
      ],
      learned: "How much network scripting is possible with just the standard library, and that an alert people actually want is worth more than a perfect scan.",
      next: "Device fingerprinting so unknown devices get a name, not just a flag.",
    },
  },
  {
    title: "Networking Labs",
    eyebrow: "Hands-on Networking Projects",
    meta: "Hands-on Labs · 2026",
    category: "Labs",
    description: [
      "Hands-on networking projects covering ",
      { hl: "VLANs" },
      ", routing, switching, ACLs, DHCP, NAT, and more.",
    ],
    highlights: ["VLANs", "Routing and switching", "Access control lists (ACLs)", "DHCP and NAT"],
    tags: ["VLANs", "Routing", "Switching", "ACLs", "DHCP", "NAT"],
    thumbnail: "networking-labs",
    github: "https://github.com/arkyxo/Networking-Labs",
  },
];

export const WEB_APPS_LIST = [
  {
    title: "UGAT",
    eyebrow: "Persistent-Problem Intelligence · Hackathon",
    meta: "Hackathon · PLDT AI in 30 Hours · Nov 2026",
    category: "Hackathon",
    status: "Completed",
    description: [
      "An AI layer for local government reporting systems. It reads citizen reports and flags problems that ",
      { hl: "keep coming back after being marked resolved" },
      ", matching English, Filipino and Taglish reports to the same problem and place, and showing the ",
      { hl: "evidence timeline" },
      " behind every flag. Top 10 finalist out of 440 participants.",
    ],
    highlights: [
      "Flags a problem only when a new report arrives after an earlier one was resolved",
      "Matches Filipino, English and Taglish reports to one problem and one place",
      "Evidence timelines, plus a \"why not flagged\" view so it is not just a counter",
      "Ask UGAT: questions answered only from the report data, with sources cited",
      "Telegram intake with priority tagging, camera-only photo evidence and an emergency desk",
    ],
    tags: ["React", "Vite", "Node.js", "Express", "Leaflet", "Telegram Bot API", "OpenRouter"],
    github: "https://github.com/arkyxo/UGAT",
    demoUnavailable: true,
    thumbnail: "ugat",
    detail: {
      role: "Team build · 30-hour hackathon · Top 10 finalist",
      problem: "Government systems measure whether each ticket is closed, but almost nothing measures whether the problem stayed closed. A street can flood four times a year with every ticket marked resolved and every metric green.",
      approach: "Use AI only to read messy resident text, and keep the decision in plain, testable code: a problem is flagged only when enough reports exist and one arrived after a resolution. Every flag links back to the original reports so staff can judge it.",
      challenges: [
        { title: "Residents write in three languages", fix: "A language model labels each report with a problem type and a canonical place, so \"Baha na naman harap ng palengke\" and \"flooding near the market\" land in the same group." },
        { title: "AI should not make government decisions", fix: "The flag rule lives in testable code in the engine, and the assistant only answers from the dataset with report IDs cited. Next steps are suggestions for staff to review." },
        { title: "Proving it is not just a report counter", fix: "A \"why not flagged\" view shows busy areas and fixed problems that UGAT deliberately leaves alone, and an accuracy panel scores it against known ground truth." },
      ],
      learned: "Where AI belongs in a public-service tool: reading language, not deciding outcomes. Keeping the rules testable made the whole system easier to trust and to demo.",
      next: "Finish polishing the system and release a stable live demo.",
    },
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
    detail: {
      role: "Team build · delivered to a real client",
      problem: "A real restaurant needed more than a demo POS. Orders had to sync across terminals instantly, and the math on every bill had to be correct every single time.",
      approach: "Firebase everywhere: Firestore keeps every terminal on the same live order stream, while one billing module owns the VAT and 6% service-charge rules so no two receipts can disagree.",
      challenges: [
        { title: "Multiple terminals, one truth", fix: "Real-time Firestore listeners so an order taken anywhere updates everywhere." },
        { title: "Billing math that can't drift", fix: "A single shared computation for VAT and service charge instead of logic scattered across screens." },
        { title: "Handover, not just delivery", fix: "Shipped with technical documentation and client training so the restaurant can actually run it in production." },
      ],
      learned: "What 'production' really means: correctness under a real workload, documentation, and a handover a non-technical owner can run with.",
      next: "Better offline tolerance for spotty connections and deeper sales reporting.",
    },
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
    detail: {
      role: "Thesis project · published and maintained",
      problem: "Explaining a whole university journey is hard to do in a document. A game lets players live it instead.",
      approach: "A full Roblox experience: custom environments plus a Lua quest system that walks players through enrollment, classes, and campus life, with progression tracking the whole way.",
      challenges: [
        { title: "A whole university in one game", fix: "Broke the journey into quests and environments instead of one overwhelming map." },
        { title: "Launching is the easy part", fix: "After publishing, weekly updates driven by player bug reports keep it stable." },
      ],
      learned: "Lua and game design, but mostly that shipped software keeps talking back: player reports became a real maintenance loop.",
      next: "More questlines and polish on the early-game experience where new players drop off.",
    },
  },
  {
    title: "KuryenteWatch",
    eyebrow: "Household Energy App · Hackathon",
    meta: "Hackathon · AppBuilders PH · Oct 2026",
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
    detail: {
      role: "Team build · 24-hour hackathon sprint",
      problem: "Most households only learn what they spent on electricity when the bill arrives, too late to change anything. Reading the meter is a chore nobody keeps up with, so day-to-day usage stays invisible.",
      approach: "Make meter reading a two-second habit: snap a photo and let OCR do the rest. Everything runs local-first; readings, estimates, and alerts live on the device, so the app works offline and private data never leaves the phone.",
      challenges: [
        { title: "No clean answer for reading meters", fix: "Tesseract.js reads the photo right in the browser; the engine stays out of the precache and is warmed into a runtime cache so installs stay fast." },
        { title: "Alerts without per-device sensors", fix: "Derived usage-jump alerts from the cumulative meter readings users already submit, no smart plugs needed." },
        { title: "AI on any phone, with no cloud key", fix: "Ollama when it's reachable and a built-in rule-based assistant when it isn't, so the chat never degrades to an error." },
      ],
      learned: "How much architecture a 'simple' 24-hour app hides: an Express + SQLite API, a PWA shell, an OCR pipeline, and two offline paths all had to land in one day.",
      next: "Tighten OCR accuracy on more meter types and break usage down per appliance.",
    },
  },
];

export const SOFTWARE_ORDER = ["UGAT", "Salo Sa Antipolo", "URSAC Simulation Academy", "KuryenteWatch"];
export const WEB_APPS = [...WEB_APPS_LIST].sort((a, b) => SOFTWARE_ORDER.indexOf(a.title) - SOFTWARE_ORDER.indexOf(b.title));

export const yearOf = (p) => (p.meta && (p.meta.match(/(\d{4})/) || [])[1]) || "-";
export const contextOf = (p) => (p.meta ? p.meta.split(" · ")[0] : p.category || "Lab");
export const ALL_PROJECTS = [...WEB_APPS, ...LABS]
  .filter((p, i, arr) => arr.findIndex((q) => q.title === p.title) === i)
  .sort((a, b) => (+yearOf(b) || 0) - (+yearOf(a) || 0));
export const trackOf = (title) => {
  const inSoftware = WEB_APPS.some((p) => p.title === title);
  const inNetwork = LABS.some((p) => p.title === title);
  if (inSoftware && inNetwork) return "Both";
  return inSoftware ? "Software" : "Networking & IT";
};
export const thumbFor = (p, isDark) => (isDark && p.thumbnailDark) || p.thumbnail;
export const galleryFor = (p, isDark) => (isDark && p.galleryDark) || p.gallery;
export const taglineOf = (p) => (p.eyebrow ? p.eyebrow.split(" · ")[0] : p.meta);
export const slugOf = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const PROJECT_BY_SLUG = Object.fromEntries(ALL_PROJECTS.map((p) => [slugOf(p.title), p]));

export const CERTIFICATIONS = [
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

export const HACKATHON_LINKEDIN = "https://lnkd.in/p/ghcHxX-M";
export const KURYENTE_GITHUB = "https://github.com/dioxaaa/Kuryente-Watch-AppBuilder-Hackaton";

export const FEATURED_ACTIVITY = {
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
    { label: "See the project page", short: "Project page", page: "#kuryentewatch" },
  ],
};

export const AI30_LINKEDIN = "https://www.linkedin.com/posts/pldtenterprise_aiin30hours-pldtenterprise-epldt-activity-7520409177354309632-h8-B";
export const AI30_FACEBOOK = "https://www.facebook.com/share/p/1FQeKnihxv/";

export const AI30_ACTIVITY = {
  label: "Latest",
  date: "November 3 - 4, 2026",
  title: "PLDT AI in 30 Hours Hackathon",
  location: "De La Salle University, Manila",
  description:
    "A nationwide student challenge by PLDT Enterprise, PLDT Innolab, and ePLDT, with DLSU Animo Labs and Rokid Philippines. Teams had 30 hours to turn ideas into working AI prototypes for real problems in government, public services, and safety. My team made it into the Top 10 finalists out of 440 participants!",
  image: "ai-in-30-hours-group",
  aspect: "aspect-[16/9]",
  links: [
    { label: "See the post on LinkedIn", short: "LinkedIn post", url: AI30_LINKEDIN },
    { label: "See the post on Facebook", short: "Facebook post", url: AI30_FACEBOOK },
    { label: "See the project page", short: "Project page", page: "#ugat" },
  ],
};

export const AMA_FACEBOOK = "https://www.facebook.com/amaeducsystem";

export const CTIA_ACTIVITY = {
  label: "Training",
  date: "Day 1",
  title: "Cyber Threat Intelligence Analysis (CTIA) Level III",
  location: "AMA University, Quezon City",
  description:
    "Day 1 of CTIA Level III. A full lab of fellow learners, and the start of going deeper into how security teams track, analyze, and make sense of threats.",
  image: "ctia-level-3-day-1",
  links: [{ label: "See AMA on Facebook", short: "AMA on Facebook", url: AMA_FACEBOOK }],
};

export const ACTIVITIES = [AI30_ACTIVITY, CTIA_ACTIVITY, FEATURED_ACTIVITY];

export const PATHWAY_ICONS = { internship: GraduationCap, work: Briefcase };

export const EXPERIENCE = [
  {
    company: "ATSOCA Learning & Consultancy OPC",
    pathway: "internship",
    position: "Tech Intern",
    logo: "atsoca-logo",
    website: "https://atsoca.co/index.php",
    employment: "Internship",
    location: "Sta. Mesa",
    period: "Oct 2026 - Present",
    duration: "Oct 2026 - Present",
    type: "Software & IT · Internship",
    description: [
      "Support internal databases, dashboards, forms, and automated workflows for the Tech Department.",
      "Assist with website and landing page updates and with data encoding and validation for daily operations.",
      "Help identify repetitive tasks that can be improved through AI and automation solutions.",
    ],
  },
  {
    company: "DOLE",
    pathway: "work",
    position: "Special Program for Employment of Students",
    logo: "asset-11af5d6e",
    website: "https://dole.gov.ph/special-program-for-the-employment-of-students-spes/",
    employment: "May 2026",
    location: "San Mateo, Rizal · On-site",
    period: "",
    duration: "May 2026",
    type: "Networking & IT · Government Program",
    description:
      "Provided IT support and hardware troubleshooting, and handled data entry and digital filing for the department, all while studying Computer Engineering full-time.",
  },
];

export const experienceYear = (exp) => (String(exp.period || exp.duration || "").match(/\d{4}/) || [""])[0];

export const AFFILIATIONS = [
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

export const ABOUT_PHOTOS = [
  { name: "About me · Photo", caption: "Me", image: "aboutme-photo-main" },
];

export const EDUCATION = [
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

export const HERO_PILLS = [
  { id: "software", label: "software-developer", Icon: CodeBrackets },
  { id: "networking", label: "networking-engineer", Icon: NetworkNodes },
  { id: "cybersecurity", label: "cybersecurity-enthusiast", Icon: ShieldCheck },
];

export const SPOTIFY_TRACK = {
  title: "Last Night on Earth",
  artist: "Green Day",
  url: "https://open.spotify.com/track/5TpPSTItCwtZ8Sltr3vdzm",
  cover: "last-night-on-earth",
};

export const theme = {
  dark: {
    bg: "bg-black",
    bgSoft: "bg-neutral-900",
    surface: "bg-neutral-900/60",
    surfaceSolid: "bg-neutral-900",
    border: "border-neutral-800",
    text: "text-neutral-100",
    textMuted: "text-neutral-400",
    textFaint: "text-neutral-500",
    accent: "text-accent-400",
    accentBg: "bg-accent-400",
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
    accent: "text-accent-400",
    accentBg: "bg-accent-400",
    navBg: "bg-white/80",
    ring: "ring-slate-200",
  },
};

export function eduProgress(duration) {
  const m = String(duration).match(/(\d{4})\D+(\d{4})/);
  if (!m) return { done: true, total: 1, elapsed: 1, startY: "", endY: "" };
  const start = new Date(+m[1], 5, 1).getTime();
  const end = new Date(+m[2], 3, 30).getTime();
  const total = Math.max(1, +m[2] - +m[1]);
  const elapsed = Math.max(0, Math.min(total, (Date.now() - start) / (365.25 * 864e5)));
  return { done: Date.now() >= end, total, elapsed, startY: m[1], endY: m[2] };
}
export const initialsOf = (name) =>
  name.replace(/[—–-].*$/, "").split(" ").filter((w) => /^[A-Z]/.test(w)).slice(0, 3).map((w) => w[0]).join("");

export const ABOUT_ME = [
  "I'm a fourth-year Computer Engineering student at the University of Rizal System, Antipolo. I build web apps end to end: a restaurant POS delivered to a real client, a 24-hour hackathon energy app, an AI tool for local government that made the Top 10 at a national hackathon, and a published Roblox game. I also keep the network side sharp through certifications in network security.",
  "I like work where software meets infrastructure: interfaces people enjoy using, and a clear picture of everything carrying them underneath.",
];

export const ALL_SKILL_ITEMS = SKILLS.flatMap((g) => g.items);
export const pickSkills = (names) => names.map((n) => ALL_SKILL_ITEMS.find((i) => i.name === n)).filter(Boolean);

export const AI_TOOLING = [
  { name: "Claude", abbr: "CL", icon: "https://cdn.simpleicons.org/claude" },
  { name: "ChatGPT", abbr: "GPT", icon: "asset-5fd2cb0e" },
  { name: "Gemini", abbr: "GEM", icon: "https://cdn.simpleicons.org/googlegemini" },
];


export const TOOLKIT_GROUPS = [
  {
    num: "01",
    title: "Software Development",
    blurb: "Languages, frontend and frameworks",
    proof: ["Salo Sa Antipolo"],
    items: pickSkills(["JavaScript", "Python", "React", "HTML", "CSS", "Tailwind CSS", "Vite"]),
  },
  {
    num: "02",
    title: "Networking & IT",
    blurb: "Fundamentals, simulation and lab environments",
    proof: ["Home Network Device Monitor", "Networking Labs"],
    proofLabel: "Related project",
    items: pickSkills(["TCP/IP, DNS & DHCP", "Cisco Packet Tracer", "VirtualBox", "Kali Linux"]),
  },
  {
    num: "03",
    title: "Backend, Databases & APIs",
    blurb: "SQL, databases, persistence and integrations",
    proof: ["KuryenteWatch"],
    items: pickSkills(["SQL", "Firebase / Firestore", "SQLite", "PostgreSQL", "Microsoft SQL Server", "REST API Integration"]),
  },
  {
    num: "04",
    title: "Developer Tools",
    blurb: "Git, GitHub, runtime and workflow",
    proof: [],
    items: pickSkills(["Git", "GitHub", "VS Code", "Node.js", "Express"]),
  },
];

export const ADDITIONAL_ITEMS = pickSkills(["Lua (Roblox)", "Progressive Web Apps (PWA)", "Local AI with Ollama"]);

export const AI_ASSISTED_ITEM = {
  name: "AI-assisted development tools",
  icons: AI_TOOLING.map((a) => a.icon),
};

export const SKILL_GROUPS = [
  ...TOOLKIT_GROUPS,
  {
    num: "05",
    title: "Additional Tools & Technologies",
    blurb: "AI tools, emerging technologies, learning",
    compact: true,
    items: [...ADDITIONAL_ITEMS, AI_ASSISTED_ITEM],
  },
];
export const SKILL_TOTAL = SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0);

export const IMAGE_FIELDS = ["icon", "thumbnail", "thumbnailDark", "gallery", "galleryDark", "image", "inset", "logo"];
export const IMAGE_SLOTS = (() => {
  const slots = { [PROFILE.photo]: ["Profile photo"] };
  const sources = [...ALL_SKILL_ITEMS, ...AI_TOOLING, ...ALL_PROJECTS, ...CERTIFICATIONS, ...ACTIVITIES, ...EXPERIENCE, ...AFFILIATIONS, ...ABOUT_PHOTOS, ...EDUCATION];
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

export const HOME_PROJECT_BY_TAB = { webapps: "Salo Sa Antipolo", labs: "Home Network Device Monitor" };
export const FEATURED_TITLES = ["Home Network Device Monitor", "Salo Sa Antipolo"];
export const TRACK_FILTERS = ["All", "Software", "Networking & IT", "Hackathon"];