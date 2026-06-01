# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild walex.me from Gatsby v1/React 15 to Vite + React 18 + shadcn/ui, deployed to GitHub Pages with a custom domain.

**Architecture:** Single-page React SPA (no router) with Hero and About sections. All content lives in a typed config object. CSS keyframe animations replace react-motion. GitHub Actions builds and deploys on push to master.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS v3, lucide-react, Vitest + @testing-library/react, GitHub Pages

---

## File Map

| File | Purpose |
|---|---|
| `package.json` | Dependencies and scripts |
| `index.html` | Vite entry point |
| `vite.config.ts` | Vite + Vitest config, `@` alias |
| `tsconfig.json` | TypeScript config with path alias |
| `tsconfig.node.json` | TS config for vite.config.ts itself |
| `tailwind.config.ts` | Tailwind content paths + Inter font |
| `postcss.config.js` | PostCSS plugins for Tailwind |
| `src/index.css` | Tailwind directives + keyframe animations |
| `src/main.tsx` | React DOM mount |
| `src/App.tsx` | Composes Hero → divider → About → Footer |
| `src/config/site.ts` | All copy and URLs — single source of truth |
| `src/lib/utils.ts` | shadcn `cn()` helper |
| `src/components/SocialLinks.tsx` | Icon link buttons (GitHub, LinkedIn, Instagram, Facebook) |
| `src/components/Hero.tsx` | Full-bleed hero section with scroll indicator |
| `src/components/About.tsx` | Two-column about with Gravatar photo |
| `src/components/Footer.tsx` | Minimal footer |
| `src/assets/hero.jpg` | **User-provided** NASA moon mission photo |
| `src/test/setup.ts` | @testing-library/jest-dom import |
| `src/test/App.test.tsx` | Smoke tests |
| `public/CNAME` | Custom domain for GitHub Pages |
| `.github/workflows/deploy.yml` | CI/CD pipeline |

---

## Task 1: Remove old project files

**Files:**
- Delete: `gatsby-config.js`, `yarn.lock`, `.eslintrc`, `package.json`, `src/` (entire tree)

- [ ] **Step 1: Delete Gatsby-specific files**

```bash
rm -f gatsby-config.js yarn.lock .eslintrc
rm -rf src
```

- [ ] **Step 2: Add `.superpowers/` to .gitignore**

Open `.gitignore` and append:

```
# Superpowers brainstorm sessions
.superpowers/
```

- [ ] **Step 3: Commit the removal**

```bash
git add -A
git commit -m "chore: remove gatsby project files"
```

---

## Task 2: Create project scaffolding files

**Files:**
- Create: `package.json`, `index.html`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `postcss.config.js`, `tailwind.config.ts`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "walex.me",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.400.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^20.14.9",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "@vitest/coverage-v8": "^1.6.0",
    "autoprefixer": "^10.4.19",
    "jsdom": "^24.1.0",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.6",
    "typescript": "^5.5.3",
    "vite": "^5.3.3",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 2: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/icon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Alex Nelson — Software Engineer" />
    <title>walex.me</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 5: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 7: Create `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 8: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 9: Commit scaffolding**

```bash
git add package.json index.html vite.config.ts tsconfig.json tsconfig.node.json tailwind.config.ts postcss.config.js package-lock.json
git commit -m "chore: scaffold vite + react + typescript project"
```

---

## Task 3: CSS, animations, and test setup

**Files:**
- Create: `src/index.css`, `src/main.tsx`, `src/test/setup.ts`
- Create: `src/assets/` directory placeholder

- [ ] **Step 1: Create `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .animate-fade-up {
    animation: fade-up 0.6s ease-out forwards;
  }

  .animate-fade-up-d1 {
    animation: fade-up 0.6s ease-out 0.2s forwards;
    opacity: 0;
  }

  .animate-fade-up-d2 {
    animation: fade-up 0.6s ease-out 0.4s forwards;
    opacity: 0;
  }

  .animate-fade-up-stagger {
    animation: fade-up 0.5s ease-out forwards;
    opacity: 0;
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 2: Create `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 3: Create `src/assets/.gitkeep`**

```bash
mkdir -p src/assets
touch src/assets/.gitkeep
```

Add a note in `.gitignore` so hero.jpg is NOT ignored (it should be committed):

Open `.gitignore` and verify `*.jpg` or `src/assets/` is not listed. If it is, add an exception:
```
!src/assets/hero.jpg
```

- [ ] **Step 4: Create placeholder `src/main.tsx`** (real version in Task 9)

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>loading...</div>
  </React.StrictMode>
)
```

- [ ] **Step 5: Verify tests run**

```bash
npm run test:run
```

Expected: `No test files found` — that's fine, setup works.

- [ ] **Step 6: Commit**

```bash
git add src/
git commit -m "chore: add css, animations, and test setup"
```

---

## Task 4: Site config and utils

**Files:**
- Create: `src/config/site.ts`, `src/lib/utils.ts`

- [ ] **Step 1: Create `src/config/site.ts`**

```ts
export const siteConfig = {
  name: 'Alex Nelson',
  tagline: 'Building software. Raising kids. Breaking things with AI.',
  location: 'Lehi, Utah',
  gravatarHash: '8ad72a6d9df91e7cdb79fd88a5f4cb4d',
  social: {
    github: 'https://github.com/walexnelson',
    linkedin: 'https://www.linkedin.com/in/walexnelson',
    instagram: 'https://www.instagram.com/walexnelson',
    facebook: 'https://www.facebook.com/walexnelson',
  },
  about: [
    "I'm an engineer who enjoys getting to the heart of complex problems and turning business goals into clear, scalable technical solutions. I bring a strategic mindset to the work, grounding every decision in customer impact, long-term product direction, and what the organization needs to succeed.",
    "My background spans senior engineering and executive leadership roles, which allows me to move comfortably between architecture, product strategy, and hands-on technical guidance. I help teams clarify problems, make high-quality decisions quickly, and design solutions that hold up as products and usage grow. I also enjoy mentoring engineers and contributing to a strong engineering culture where people can do their best work.",
    "I care about thoughtful architecture, clear problem definition, and strong alignment between engineering and the rest of the business. I'm always open to connecting about distributed systems, SaaS architecture, and building high-performing engineering teams.",
  ],
} as const
```

- [ ] **Step 2: Create `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 3: Commit**

```bash
git add src/config/site.ts src/lib/utils.ts
git commit -m "feat: add site config and cn utility"
```

---

## Task 5: SocialLinks component

**Files:**
- Create: `src/components/SocialLinks.tsx`
- Test in: `src/test/App.test.tsx` (written here, extended in later tasks)

- [ ] **Step 1: Write the failing test**

Create `src/test/App.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SocialLinks } from '../components/SocialLinks'

describe('SocialLinks', () => {
  it('renders all four social links', () => {
    render(<SocialLinks />)
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
  })

  it('links open in a new tab', () => {
    render(<SocialLinks />)
    const github = screen.getByLabelText('GitHub')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('github link points to the correct URL', () => {
    render(<SocialLinks />)
    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/walexnelson'
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run
```

Expected: FAIL — `Cannot find module '../components/SocialLinks'`

- [ ] **Step 3: Create `src/components/SocialLinks.tsx`**

```tsx
import { Github, Linkedin, Instagram, Facebook } from 'lucide-react'
import { siteConfig } from '@/config/site'

const links = [
  { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
] as const

export function SocialLinks() {
  return (
    <div className="flex gap-3">
      {links.map(({ icon: Icon, href, label }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="animate-fade-up-stagger flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-700 bg-white/5 text-zinc-400 hover:text-zinc-50 hover:border-zinc-500 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
          style={{ animationDelay: `${1000 + i * 150}ms` }}
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run
```

Expected: PASS — 3 tests in `SocialLinks`

- [ ] **Step 5: Commit**

```bash
git add src/components/SocialLinks.tsx src/test/App.test.tsx
git commit -m "feat: add SocialLinks component"
```

---

## Task 6: Footer component

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/test/App.test.tsx`

- [ ] **Step 1: Add failing test to `src/test/App.test.tsx`**

Append this `describe` block to the existing file:

```tsx
import { Footer } from '../components/Footer'

describe('Footer', () => {
  it('renders the site name', () => {
    render(<Footer />)
    expect(screen.getByText('WALEX.ME')).toBeInTheDocument()
  })

  it('renders the copyright year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} Alex Nelson`)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run
```

Expected: FAIL — `Cannot find module '../components/Footer'`

- [ ] **Step 3: Create `src/components/Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="px-14 py-8 border-t border-zinc-900 flex justify-between items-center">
      <span className="text-xs font-semibold tracking-[0.05em] text-zinc-600">
        WALEX.ME
      </span>
      <span className="text-xs text-zinc-600">
        © {new Date().getFullYear()} Alex Nelson
      </span>
    </footer>
  )
}
```

- [ ] **Step 4: Run tests**

```bash
npm run test:run
```

Expected: PASS — all 5 tests

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/test/App.test.tsx
git commit -m "feat: add Footer component"
```

---

## Task 7: About component

**Files:**
- Create: `src/components/About.tsx`
- Modify: `src/test/App.test.tsx`

- [ ] **Step 1: Add failing test**

Append to `src/test/App.test.tsx`:

```tsx
import { About } from '../components/About'

describe('About', () => {
  it('renders the heading', () => {
    render(<About />)
    expect(screen.getByText("Hi, I'm Alex.")).toBeInTheDocument()
  })

  it('renders the gravatar image with correct src', () => {
    render(<About />)
    const img = screen.getByAltText('Alex Nelson')
    expect(img).toHaveAttribute(
      'src',
      'https://www.gravatar.com/avatar/8ad72a6d9df91e7cdb79fd88a5f4cb4d?s=240&d=retro'
    )
  })

  it('renders the location', () => {
    render(<About />)
    expect(screen.getByText('Lehi, Utah')).toBeInTheDocument()
  })

  it('renders the first bio paragraph', () => {
    render(<About />)
    expect(screen.getByText(/getting to the heart of complex problems/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run
```

Expected: FAIL — `Cannot find module '../components/About'`

- [ ] **Step 3: Create `src/components/About.tsx`**

```tsx
import { siteConfig } from '@/config/site'

export function About() {
  const gravatarUrl = `https://www.gravatar.com/avatar/${siteConfig.gravatarHash}?s=240&d=retro`

  return (
    <section id="about" className="px-14 py-24 max-w-5xl mx-auto">
      <div className="grid grid-cols-[auto_1fr] gap-16 items-start">
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-zinc-700 ring-4 ring-zinc-800/50">
            <img
              src={gravatarUrl}
              alt={siteConfig.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-600">
            {siteConfig.location}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-5">
            About
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 mb-6">
            Hi, I'm Alex.
          </h2>
          <div className="space-y-4">
            {siteConfig.about.map((paragraph, i) => (
              <p key={i} className="text-zinc-400 leading-relaxed text-[0.95rem]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests**

```bash
npm run test:run
```

Expected: PASS — all 9 tests

- [ ] **Step 5: Commit**

```bash
git add src/components/About.tsx src/test/App.test.tsx
git commit -m "feat: add About component"
```

---

## Task 8: Hero component

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/test/App.test.tsx`

**Note:** `hero.jpg` is imported as a static asset. In the test environment, Vite mocks static asset imports as their filename string — no special setup needed.

- [ ] **Step 1: Place the hero photo**

Copy your NASA moon mission photo to `src/assets/hero.jpg`. The file must exist before `npm run build` succeeds. For local dev it can be a placeholder.

- [ ] **Step 2: Add failing test**

Append to `src/test/App.test.tsx`:

```tsx
import { Hero } from '../components/Hero'

// Mock the hero image asset — Vitest returns the module path for static assets
vi.mock('@/assets/hero.jpg', () => ({ default: '/src/assets/hero.jpg' }))

describe('Hero', () => {
  it('renders the name', () => {
    render(<Hero />)
    expect(screen.getByText('Alex Nelson')).toBeInTheDocument()
  })

  it('renders the tagline highlight', () => {
    render(<Hero />)
    expect(screen.getByText('Building software.')).toBeInTheDocument()
  })

  it('renders the tagline remainder', () => {
    render(<Hero />)
    expect(screen.getByText('Raising kids. Breaking things with AI.')).toBeInTheDocument()
  })

  it('renders social links inside hero', () => {
    render(<Hero />)
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm run test:run
```

Expected: FAIL — `Cannot find module '../components/Hero'`

- [ ] **Step 4: Create `src/components/Hero.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/site'
import { SocialLinks } from './SocialLinks'
import heroImage from '@/assets/hero.jpg'

export function Hero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-end px-14 pb-14 overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Gradient fade to page background at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-500 mb-4 animate-fade-up">
          walex.me
        </p>
        <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-extrabold tracking-tighter leading-none text-zinc-50 mb-5 animate-fade-up-d1">
          {siteConfig.name}
        </h1>
        <p className="text-lg text-zinc-400 mb-10 max-w-md animate-fade-up-d2">
          <span className="text-zinc-50 font-medium">Building software.</span>{' '}
          Raising kids. Breaking things with AI.
        </p>
        <SocialLinks />
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 right-14 flex flex-col items-center gap-2 transition-opacity duration-500 ${
          scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.1em] text-zinc-600">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent" />
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run tests**

```bash
npm run test:run
```

Expected: PASS — all 13 tests

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.tsx src/test/App.test.tsx
git commit -m "feat: add Hero component"
```

---

## Task 9: Wire up App and main

**Files:**
- Create: `src/App.tsx`
- Modify: `src/main.tsx`, `src/test/App.test.tsx`

- [ ] **Step 1: Add integration test**

Append to `src/test/App.test.tsx`:

```tsx
import App from '../App'

describe('App (integration)', () => {
  it('renders hero and about sections', () => {
    render(<App />)
    expect(screen.getByText('Alex Nelson')).toBeInTheDocument()
    expect(screen.getByText("Hi, I'm Alex.")).toBeInTheDocument()
    expect(screen.getByText('WALEX.ME')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to confirm it fails**

```bash
npm run test:run
```

Expected: FAIL — `Cannot find module '../App'`

- [ ] **Step 3: Create `src/App.tsx`**

```tsx
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="bg-[#09090b] min-h-screen">
      <Hero />
      <div
        className="h-px mx-14 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"
        aria-hidden="true"
      />
      <About />
      <Footer />
    </div>
  )
}

export default App
```

- [ ] **Step 4: Update `src/main.tsx`**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 5: Run all tests**

```bash
npm run test:run
```

Expected: PASS — all 14 tests

- [ ] **Step 6: Verify dev server runs**

```bash
npm run dev
```

Open `http://localhost:5173`. Verify:
- Hero photo fills the screen (add a placeholder if `hero.jpg` not yet sourced)
- Name fades up on load
- Social icon buttons appear with stagger
- Scrolling down reveals the About section with Gravatar photo
- Footer visible at bottom

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx src/main.tsx src/test/App.test.tsx
git commit -m "feat: wire up App and main entry point"
```

---

## Task 10: GitHub Actions deployment + custom domain

**Files:**
- Create: `.github/workflows/deploy.yml`, `public/CNAME`

- [ ] **Step 1: Create `public/CNAME`**

```
walex.me
```

- [ ] **Step 2: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:run

      - name: Build
        run: npm run build

      - uses: actions/configure-pages@v4

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Verify the build produces correct output**

```bash
npm run build
```

Expected: `dist/` created with `index.html`, `assets/`, and `CNAME` at the root.

```bash
ls dist/
# Should show: index.html  assets/  CNAME
cat dist/CNAME
# Should show: walex.me
```

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy.yml public/CNAME
git commit -m "ci: add github actions deploy workflow and CNAME"
```

---

## Task 11: Enable GitHub Pages and configure DNS

These are manual steps done in the GitHub and your DNS provider's UI.

- [ ] **Step 1: Enable GitHub Pages in the repo settings**

Go to: `https://github.com/walexnelson/walex.me/settings/pages`
- Source: **GitHub Actions**
- Custom domain: `walex.me`
- Check **Enforce HTTPS** (after DNS propagates)

- [ ] **Step 2: Add DNS records at your registrar**

Add these A records pointing `walex.me` to GitHub Pages IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Add a CNAME record for `www`:
```
www  CNAME  walexnelson.github.io
```

- [ ] **Step 3: Push to master and verify the Action runs**

```bash
git push origin master
```

Go to the Actions tab in GitHub. The `Deploy to GitHub Pages` workflow should run and succeed. The site will be live at `https://walex.me` once DNS propagates (up to 24h, usually under 1h).

- [ ] **Step 4: Final verification**

Once DNS propagates:
- `https://walex.me` loads the site
- `https://www.walex.me` redirects correctly
- HTTPS padlock is green
- Gravatar photo loads
- All social links work

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Vite + React 18 + TypeScript
- ✅ Tailwind CSS v3 + shadcn `cn()` utility
- ✅ lucide-react icons (GitHub, LinkedIn, Instagram, Facebook — no Twitter)
- ✅ Inter font via Google Fonts
- ✅ Hero: full-bleed photo, overlay + gradient, name, eyebrow, tagline with highlight, social links, scroll indicator
- ✅ Entrance animations: fade-up with delays, social stagger
- ✅ About: two-column, Gravatar URL with hardcoded hash for `w.alexnelson@gmail.com`, location, bio paragraphs
- ✅ Footer: minimal, dynamic year
- ✅ Section divider gradient
- ✅ GitHub Actions workflow (build → test → deploy)
- ✅ `public/CNAME` for custom domain
- ✅ Vite `base: '/'` for root domain
- ✅ DNS instructions

**Confirmed removed:**
- ✅ Gatsby, GraphQL, gatsby-image
- ✅ react-motion, react-transition-group
- ✅ yarn.lock → npm
- ✅ Twitter/X social link
