import cvPdf from "./assets/Rose_Kate_Zonio_CV.pdf";
import { CodeBrackets, NetworkNodes, ShieldCheck, Code2, Network, GraduationCap, Briefcase } from "./icons.jsx";

export const PROFILE = {
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

export const hasLink = (u) => !!u && u !== "#";

export const RESUME_URL = cvPdf;

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "activities", label: "Activities" },
  { id: "labs", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "github-activity", label: "GitHub" },
];

export const SKILL_LEVELS = {
  core: { dot: "bg-accent-400", glow: "dot-glow-accent", text: "text-accent-400", label: "Core competency", code: "CORE", chipBg: "bg-accent-400", chipText: "text-onaccent", desc: "Comfortable using this independently in real projects and troubleshooting scenarios." },
  working: { dot: "bg-neutral-300", glow: "dot-glow-mid", text: "text-neutral-300", label: "Guided practice", code: "GUIDED", chipBg: "bg-neutral-300", chipText: "text-slate-950", desc: "Can apply this with documentation, references, or guidance close at hand." },
  basic: { dot: "bg-slate-400", glow: "dot-glow-soft", text: "text-slate-400", label: "Basic familiarity", code: "BASIC", chipBg: "bg-slate-400", chipText: "text-slate-950", desc: "Understands the fundamentals through hands-on labs and coursework." },
  learning: { dot: "bg-slate-500", glow: "dot-glow-gray", text: "text-slate-400", label: "Currently learning", code: "NEW", chipBg: "bg-slate-500", chipText: "text-white", desc: "Just getting started, actively studying this right now." },
};

export const SKILLS = [
  {
    category: "Software",
    blurb: "Full-stack web, Python, Lua, databases",
    icon: Code2,
    items: [
      { name: "JavaScript", level: "core", abbr: "JS" , icon: "asset-9fd9590f" },
      { name: "HTML", level: "core", abbr: "HTML" , icon: "asset-84111716" },
      { name: "CSS", level: "core", abbr: "CSS" , icon: "asset-96c75af1" },
      { name: "React", level: "core", abbr: "JSX" , icon: "asset-b5acca38" },
      { name: "Tailwind CSS", level: "core", abbr: "TW" , icon: "asset-12b1b727" },
      { name: "Python", level: "core", abbr: "PY" , icon: "asset-2567e649" },
      { name: "Lua (Roblox)", level: "working", abbr: "LUA" , icon: "asset-dc866c64" },
      { name: "Git", level: "working", abbr: "GIT", icon: "asset-e9ee8d5e" },
      { name: "GitHub", level: "working", abbr: "GH", icon: "asset-44876619" },
      { name: "VS Code", level: "working", abbr: "VS", icon: "asset-3c66e1fc" },
      { name: "Microsoft SQL Server", level: "basic", abbr: "MS", icon: "asset-247d2abe" },
      { name: "Firebase / Firestore", level: "working", abbr: "FB" , icon: "asset-83b2b79f" },
      { name: "SQL", level: "basic", abbr: "SQL" , icon: "asset-b5f6c886" },
      { name: "PostgreSQL", level: "basic", abbr: "PG" , icon: "asset-c5fca167" },
      { name: "Vite", level: "working", abbr: "VITE", icon: "https://cdn.simpleicons.org/vite" },
      { name: "Node.js", level: "basic", abbr: "NODE", icon: "https://cdn.simpleicons.org/nodedotjs" },
      { name: "Express", level: "basic", abbr: "EXP", icon: "https://cdn.simpleicons.org/express" },
      { name: "SQLite", level: "working", abbr: "SQLT", icon: "https://cdn.simpleicons.org/sqlite" },
      { name: "Progressive Web Apps (PWA)", level: "basic", abbr: "PWA", icon: "https://cdn.simpleicons.org/pwa" },
      { name: "Local AI with Ollama", level: "basic", abbr: "AI", icon: "https://cdn.simpleicons.org/ollama" },
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
      { name: "Linux (WSL)", level: "learning", abbr: "WSL" },
    ],
  },
];

export const RFID_PROJECT = {
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
  detail: {
    role: "Group project · hardware + software",
    problem: "Tracking parking slots and billing by hand is slow and easy to get wrong. Attendants guess, drivers wait, and nothing is recorded.",
    approach: "Close the loop with RFID: scan a card, see live slot availability, and let the system track occupancy and compute the bill automatically. Hardware, application, and database working as one flow.",
    challenges: [
      { title: "Hardware talking to software", fix: "Wired the RFID reader into a custom VB.NET app so every scan lands as a real event instead of a manual input." },
      { title: "Keeping occupancy truthful", fix: "A SQL database tracks slot state in real time so the availability display and the billing can never disagree." },
    ],
    learned: "The full shape of a hardware-integrated project: physical input, application logic, and a database all moving together.",
    next: "A cleaner interface and support for more than one entrance and exit.",
  },
};

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
  { ...RFID_PROJECT, category: "Hardware" },
];

export const WEB_APPS_LIST = [
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
    detail: {
      role: "Solo project · design to deploy",
      problem: "Movie lists that never change are boring. I wanted a real browsing app with live listings, search, and watchlists that follow the user, not a static page.",
      approach: "Pull everything from TMDb's API and let Firebase handle identity, so watchlists, ratings, and private lists sync to each account instead of living in one browser.",
      challenges: [
        { title: "Wrangling an external API", fix: "Kept API calls behind a thin layer so the listing, detail, and search views all share the same data path." },
        { title: "Per-user data without a backend", fix: "Firebase auth plus Firestore gives every user their own synced watchlist." },
      ],
      learned: "API integration end to end: auth, request flow, and keeping the UI honest about loading and error states.",
      next: "Polish the discovery side: better recommendations and a tighter watch experience.",
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

export const SOFTWARE_ORDER = ["URSAC Simulation Academy", "Salo Sa Antipolo", "KuryenteWatch", "CineLookUp"];
export const WEB_APPS = [...WEB_APPS_LIST].sort((a, b) => SOFTWARE_ORDER.indexOf(a.title) - SOFTWARE_ORDER.indexOf(b.title));

export const yearOf = (p) => (p.meta && (p.meta.match(/(\d{4})/) || [])[1]) || "-";
export const contextOf = (p) => (p.meta ? p.meta.split(" · ")[0] : p.category || "Lab");
export const LOGO_SKILLS = SKILLS.flatMap((g) => g.items).filter((item) => item.icon);
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

export const AMA_FACEBOOK = "https://www.facebook.com/amaeducsystem";

export const CTIA_ACTIVITY = {
  label: "Latest",
  date: "Day 1",
  title: "Cyber Threat Intelligence Analysis (CTIA) Level III",
  location: "AMA University, Quezon City",
  description:
    "Day 1 of CTIA Level III. A full lab of fellow learners, and the start of going deeper into how security teams track, analyze, and make sense of threats.",
  image: "ctia-level-3-day-1",
  links: [{ label: "See AMA on Facebook", short: "AMA on Facebook", url: AMA_FACEBOOK }],
};

export const ACTIVITIES = [CTIA_ACTIVITY, FEATURED_ACTIVITY];

export const PATHWAY_ICONS = { internship: GraduationCap, work: Briefcase };

export const EXPERIENCE = [
  {
    company: "TechBizAcademy",
    pathway: "internship",
    position: "SOC Analyst Intern",
    logo: "techbizacademy-logo",
    employment: "Internship · 240 hours",
    location: "Remote",
    period: "Oct 2026 - Present",
    duration: "Oct 2026 - Present · 240 hours",
    type: "Networking & IT · Internship",
    description:
      "Just started a 240-hour OJT as a SOC analyst intern: triaging alerts, monitoring for suspicious activity, and learning how a real security operations team works day to day.",
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

export const BLOG_PAGE_SIZE = 6;

export const BLOGS = [
  {
    title: "What I Learned at the AppBuilders PH Hackathon",
    date: "Oct 9 - 10, 2026",
    category: "Hackathon",
    image: "appbuilders-hackathon-group",
    position: "object-[center_75%]",
    hero: true,
    excerpt: "500+ builders, a live top-12 showcase, and why losing taught me more than winning.",
    body: [
      "Participating in hackathons is always an intense experience, but AppBuilders PH was something different for me.",
      "During my first hackathon, we built our project, recorded a pitch video at home, and submitted everything online. A few days later, we received an email saying we didn't make the top 10. And that was pretty much it. No feedback, no chance to see how the other teams presented, just an email and the end of the experience.",
      "But this time, things felt different.",
      "Walking into the venue and seeing 500+ builders, from college students to professionals with years of experience, was an experience on its own. The energy was different, and being surrounded by people who were also building things made me realize how much there is to learn outside the classroom.",
      "Our team didn't win, but I stayed to watch the top 12 teams present their projects live. Seeing how they explained their ideas, approached problems, and presented their solutions taught me things I probably wouldn't have learned from watching tutorials alone.",
      "And honestly, I think that's what made this experience worth it.",
      "Maybe stepping outside my comfort zone and saying yes to random side quests isn't such a bad idea after all HAHAHAHAHA",
    ],
    links: FEATURED_ACTIVITY.links,
  },
];

export const blogSlug = (post) => slugOf(post.title);
export const BLOG_BY_SLUG = Object.fromEntries(BLOGS.map((b) => [blogSlug(b), b]));
export const readMinutes = (post) => Math.max(1, Math.ceil(post.body.join(" ").split(/\s+/).filter(Boolean).length / 200));

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
  { id: "software", label: "software-developer", Icon: CodeBrackets, tilt: "-2deg" },
  { id: "networking", label: "networking-engineer", Icon: NetworkNodes, tilt: "1.5deg" },
  { id: "cybersecurity", label: "cybersecurity-enthusiast", Icon: ShieldCheck, tilt: "-1deg" },
];

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
    accent: "text-accent-600",
    accentBg: "bg-accent-500",
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
  "I'm a fourth-year Computer Engineering student at the University of Rizal System, Antipolo. I build web apps end to end: a restaurant POS delivered to a real client, a 24-hour hackathon energy app, an RFID parking system, and a published Roblox game. I also keep the network side sharp through a SOC analyst internship and certifications in network security.",
  "I like work where software meets infrastructure: interfaces people enjoy using, and a clear picture of everything carrying them underneath.",
  "## Outside of work",
  "There's a part of me that has always belonged to stories. I used to write novels on Wattpad and still daydream about films; becoming a filmmaker is one of those dreams I never quite let go of. Away from the keyboard, you'll find me solving a Rubik's Cube, listening to jazz, or admiring the little garden I'd love to grow someday.",
  "Still learning, still exploring, still discovering what I could become, and honestly, that's one of the most exciting parts of being me.",
];

export const ALL_SKILL_ITEMS = SKILLS.flatMap((g) => g.items);
export const pickSkills = (names) => names.map((n) => ALL_SKILL_ITEMS.find((i) => i.name === n)).filter(Boolean);

export const AI_TOOLING = [
  { name: "Claude", abbr: "CL", icon: "https://cdn.simpleicons.org/claude" },
  { name: "ChatGPT", abbr: "GPT", icon: "asset-5fd2cb0e" },
  { name: "Gemini", abbr: "GEM", icon: "https://cdn.simpleicons.org/googlegemini" },
];

export const SKILL_GROUPS = [
  { title: "Languages", items: pickSkills(["JavaScript", "HTML", "CSS", "Python", "Lua (Roblox)", "SQL"]) },
  { title: "Frameworks & Libraries", items: pickSkills(["React", "Tailwind CSS", "Vite", "Node.js", "Express", "Progressive Web Apps (PWA)"]) },
  { title: "Databases", items: pickSkills(["Firebase / Firestore", "PostgreSQL", "Microsoft SQL Server", "SQLite"]) },
  { title: "Platforms & Tooling", items: pickSkills(["Git", "GitHub", "VS Code", "Cisco Packet Tracer"]) },
  { title: "AI Tooling", items: [...AI_TOOLING, ...pickSkills(["Local AI with Ollama"])] },
];
export const SKILL_TOTAL = SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0);

export const IMAGE_FIELDS = ["icon", "thumbnail", "thumbnailDark", "gallery", "galleryDark", "image", "inset", "logo"];
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

export const FEATURED_TITLES = ["KuryenteWatch", "Salo Sa Antipolo", "Home Network Device Monitor"];
export const TRACK_FILTERS = ["All", "Software", "Networking & IT", "Hackathon"];
