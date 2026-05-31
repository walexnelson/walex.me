# walex.me Portfolio Redesign

**Date:** 2026-05-31  
**Status:** Approved

---

## Overview

Full rebuild of walex.me from Gatsby v1 / React 15 to a modern Vite + React + shadcn/ui stack, with CI/CD deployment to GitHub Pages and a custom `walex.me` domain. The existing Netlify dependency is dropped entirely.

---

## Stack

| Layer | Choice | Rationale |
|---|---|---|
| Build tool | Vite | Zero-config, fastest builds, native ESM |
| UI framework | React 18 | Already known, shadcn targets it |
| Component library | shadcn/ui | Tailwind-based, unstyled primitives, fits the dark design |
| Styling | Tailwind CSS v3 | Utility-first, colocated with components; v3 is shadcn's current target |
| Icons | lucide-react | shadcn's default, clean SVG icons |
| Font | Inter (Google Fonts / local) | Clean, modern, suits the aesthetic |
| Hosting | GitHub Pages | Free, no Netlify dependency |
| CI/CD | GitHub Actions | Native, first-class Pages support |

---

## Site Structure

Single scrolling page. No router needed. Two sections:

1. **Hero** — full viewport height
2. **About** — below the fold, scrolled to

---

## Design

### Visual Direction
Dark atmospheric. Near-black base (`#09090b`), muted zinc palette, no harsh whites. Full-bleed hero photo (NASA Artemis/Gemini moon mission image — user to source and place at `src/assets/hero.jpg`).

### Hero Section
- Full-bleed background photo with dark overlay + bottom-to-top gradient fade into the page background
- Large bold name: **Alex Nelson** (80–90px, weight 800, tight tracking)
- Eyebrow label: `walex.me` in small uppercase zinc text
- Tagline: `Building software. Raising kids. Breaking things with AI.` — "Building software." slightly highlighted (white), rest in zinc-400
- Social icon row: GitHub, LinkedIn, Instagram, Facebook — small square icon buttons, zinc border, lucide icons
- Subtle scroll indicator bottom-right: vertical line + "scroll" label, fades out on scroll
- Entrance animation: name + tagline fade up on mount (CSS transition, ~600ms), social icons stagger in after (~1000ms)

### About Section
- Two-column layout: photo left, text right
- **Photo:** Gravatar avatar fetched from `https://www.gravatar.com/avatar/8ad72a6d9df91e7cdb79fd88a5f4cb4d?s=240&d=retro`
  - MD5 of `w.alexnelson@gmail.com` — hardcoded hash, no runtime computation needed
  - Circular, zinc border, subtle ring
- **Location:** `Lehi, Utah` in small uppercase zinc text below photo
- **Bio copy (from user's LinkedIn):**

  > I'm an engineer who enjoys getting to the heart of complex problems and turning business goals into clear, scalable technical solutions. I bring a strategic mindset to the work, grounding every decision in customer impact, long-term product direction, and what the organization needs to succeed.
  >
  > My background spans senior engineering and executive leadership roles, which allows me to move comfortably between architecture, product strategy, and hands-on technical guidance. I help teams clarify problems, make high-quality decisions quickly, and design solutions that hold up as products and usage grow. I also enjoy mentoring engineers and contributing to a strong engineering culture where people can do their best work.
  >
  > I care about thoughtful architecture, clear problem definition, and strong alignment between engineering and the rest of the business. I'm always open to connecting about distributed systems, SaaS architecture, and building high-performing engineering teams.

- Section divider: horizontal gradient line between hero and about
- No "ex-CTO" framing — bio stands on its own

### Footer
- Minimal: `WALEX.ME` left, `© 2026 Alex Nelson` right
- Same dark background, top border in zinc-900

---

## Content Config

All copy lives in `src/config/site.ts` (a plain typed object — no GraphQL, no CMS):

```ts
export const siteConfig = {
  name: 'Alex Nelson',
  tagline: 'Building software. Raising kids. Breaking things with AI.',
  location: 'Lehi, Utah',
  gravatarHash: '8ad72a6d9df91e7cdb79fd88a5f4cb4d', // w.alexnelson@gmail.com
  social: {
    github: 'https://github.com/walexnelson',
    linkedin: 'https://www.linkedin.com/in/walexnelson',
    instagram: 'https://www.instagram.com/walexnelson',
    facebook: 'https://www.facebook.com/walexnelson',
  },
  about: `...`,
}
```

---

## GitHub Pages Deployment

### Repository setup
- Branch: `master` (existing)
- GitHub Pages source: GitHub Actions (not a branch)
- Settings → Pages → Source → "GitHub Actions"

### Workflow: `.github/workflows/deploy.yml`
```
Trigger: push to master
Steps:
  1. Checkout
  2. Setup Node 22
  3. Install deps (npm ci)
  4. Build (npm run build) → outputs dist/
  5. Upload dist/ as Pages artifact
  6. Deploy to GitHub Pages
```

Uses official actions: `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`.

### Vite config
```ts
// vite.config.ts
base: '/'  // root domain, no subdirectory
```

### Custom domain
- File `public/CNAME` containing `walex.me`
- Vite copies `public/` into `dist/` at build time — CNAME lands at root
- DNS: point `walex.me` A records to GitHub Pages IPs, `www` CNAME to `<username>.github.io`
- HTTPS enforced via GitHub Pages settings (Let's Encrypt, automatic)

---

## File Layout

```
walex.me/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── CNAME                  # walex.me
├── src/
│   ├── assets/
│   │   └── hero.jpg           # moon mission photo (user-provided)
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── SocialLinks.tsx
│   │   └── Footer.tsx
│   ├── config/
│   │   └── site.ts
│   ├── lib/
│   │   └── utils.ts           # shadcn cn() utility
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css              # Tailwind directives
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## What Gets Removed

- All Gatsby dependencies and config
- `yarn.lock` → replaced with `package-lock.json` (npm)
- `react-motion`, `react-transition-group` → CSS transitions + Tailwind
- `gatsby-image`, `gatsby-source-filesystem`, `gatsby-transformer-sharp` → plain `<img>` tag
- `sanitize.css` → Tailwind's preflight handles resets
- GraphQL data layer → static `siteConfig` object
- Netlify (no config needed)

---

## Out of Scope

- Blog / writing section
- Projects section
- Contact form
- Dark/light mode toggle
- Analytics (can add later)
