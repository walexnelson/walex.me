# walex.me

Personal portfolio site for Alex Nelson.

## Stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS v3** + **shadcn/ui** utilities
- **lucide-react** icons
- **Vitest** + **@testing-library/react**

## Hosting

Deployed to **GitHub Pages** via GitHub Actions on every push to `master`. Custom domain: [walex.me](https://walex.me)

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run test      # watch mode
npm run test:run  # single run
npm run build     # production build → dist/
```

## Hero Photo

Place your hero image at `src/assets/hero.jpg`. It should be a high-resolution landscape photo (recommended: 1920×1080 or larger). The current placeholder is a 100×100px stub — replace it before deploying.

## Deployment

Pushes to `master` automatically trigger the deploy workflow (`.github/workflows/deploy.yml`). The workflow runs tests, builds, and deploys to GitHub Pages.

### DNS (Google Domains)

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `walexnelson.github.io` |
