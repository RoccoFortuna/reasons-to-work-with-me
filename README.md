# “Countless Reasons to Work With Me” Generator

A beautifully useless, neon cyber web app that generates short, witty, grounded reasons to work with Rocco Fortuna.

Tech stack:
- Next.js 14 (App Router, TypeScript, Static Export)
- Tailwind CSS
- Framer Motion
- three.js + @react-three/drei (low-CPU 3D blob)
- Vitest for unit tests
- GitHub Actions for deployment

## Getting started

Prereqs: Node.js 18.17+ (Node 20 recommended), npm.

Install deps:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Open http://localhost:3000

Build for production:

```bash
npm run build
```

This creates a static export in the `out/` directory.

Lint, typecheck, test:

```bash
npm run lint
npm run typecheck
npm test
```

## Routes

- `/` — Home generator page
- `/?seed=[seed]` — Load a specific reason by seed (shareable links)

## Features

- Seeded PRNG; deterministic reasons per `?seed=[seed]` query parameter
- "Another reason" button with smooth motion animations
- Copy text, copy link, and share to X/LinkedIn
- Neon gradient background with subtle noise
- Low-CPU 3D blob (respects `prefers-reduced-motion`)
- SFX toggle (click/chime) with WebAudio, disabled by default if `prefers-reduced-motion` is on
- Email modal popup after 10 seconds
- PDF CV viewer modal
- Accessible: keyboard focus styles, tabbable controls, reduced motion compliance
- Fully static export compatible with GitHub Pages

## Deployment

This app is configured for GitHub Pages deployment with a custom domain:

- **Live Site**: https://whyworkwith.me
- Automatic deployment on push to `main` branch via GitHub Actions
- Static export optimized for GitHub Pages

## Notes

- Avatar image lives at `public/icon-reasons-to-work-with-rocco.jpeg`
- CV lives at `public/cv-rocco-fortuna-ai-engineer.pdf`
- Facts used by the generator live in `data/facts.ts` and can be extended
- Unit tests cover generator determinism and template integrity
- The app uses query parameters (`?seed=`) instead of dynamic routes for GitHub Pages compatibility

