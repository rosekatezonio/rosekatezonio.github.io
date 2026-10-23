# rosekatezonio.github.io

Personal portfolio of Rose Kate Zonio (RK), a Computer Engineering student working across software development, networking, and cybersecurity. Live at https://rosekatezonio.github.io/

Built with React 18, Vite, and Tailwind CSS. Deploys to GitHub Pages from `main` via `.github/workflows/deploy.yml`.

## Getting started

```bash
npm ci
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Deploying is automatic: every push to `main` runs `npm ci` + `vite build` and publishes `dist/` to GitHub Pages.

## Project structure

```
src/
  main.jsx               entry point
  App.jsx                shell: theme, routing (hash-based overlays), layout
  data.js                all content: profile, projects, skills, experience, blogs
  hooks.js               useScrollProgress, useReveal, useOverlayClose
  icons.jsx              inline SVG icon set (makeIcon factory)
  styles.css             theme variables, custom effects
  images.js              image resolver: Firestore -> Cloudinary -> local assets
  firebase.js            Firebase init (skipped when env vars are absent)
  Admin.jsx              hidden image-admin panel at #admin
  components/
    NetworkCanvas.jsx    animated background canvas
    Sidebar.jsx          desktop sidebar + mobile drawer nav
    ui.jsx               Reveal, HeroPill, SectionHeading, ActivityLink, SectionPanel
    Home.jsx             HeroSection, AboutSection, SkillsSection,
                         ProjectsSection, ExperienceSection, ExperienceTimeline
    Sections.jsx         LatestActivities, GithubActivity
    Panels.jsx           overlay content: CertificationSection, AboutMeSection,
                         AffiliationSection, BlogSection, BlogArticle
    Archives.jsx         SkillsArchive, ProjectArchive, ProjectDetail
```

Editing site content (bio, projects, skills, experience, blogs) almost always means editing `src/data.js` only. Layout and behavior live in `src/components/`.

## Environment variables

The site works with zero env vars. Firebase/Cloudinary features (remote images, admin uploads) activate only when the vars are set. Create `.env` in the repo root (it is gitignored):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_ADMIN_EMAIL=
```

On GitHub, these same names must exist under Settings -> Secrets and variables -> Actions; the deploy workflow injects them at build time.

## Admin panel

Visit `/#admin` and sign in with the Google account matching `VITE_ADMIN_EMAIL`. It manages the images served across the site (Firestore documents pointing at Cloudinary uploads, with local assets as fallback).

## Notes

- The theme toggles between literal-black dark mode and a light mode via CSS variables in `styles.css`; Tailwind's `accent-*` scale maps onto them.
- `index.html` carries the Open Graph and Twitter card tags; `public/og-image.png` and `public/apple-touch-icon.png` are referenced there.
