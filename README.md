# Neon Cyber “Reasons to Work With Me” Generator

A beautifully useless, neon cyber web app that generates short, witty, grounded reasons to work with Rocco Fortuna.

Tech stack:
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Framer Motion
- three.js + @react-three/drei (low-CPU 3D blob)
- @vercel/og for dynamic OG images
- Vitest for unit tests

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

Build and start:

```bash
npm run build
npm start
```

Lint, typecheck, test:

```bash
npm run lint
npm run typecheck
npm test
```

## Routes

- `/` — Home generator page
- `/r/[seed]` — Deterministic, server-rendered detail page per seed
- `/api/og?seed=...` — OG image endpoint (Edge Runtime)

## Features

- Seeded PRNG; deterministic reasons per `/r/[seed]`
- “Another reason” button with smooth motion
- Copy text, copy link, and share to X/LinkedIn
- Pin favorites into an animated mini-grid (localStorage)
- Neon gradient background with subtle noise
- Low-CPU 3D blob (respects `prefers-reduced-motion`)
- SFX toggle (click/chime) with WebAudio, disabled by default if `prefers-reduced-motion` is on
- Accessible: keyboard focus styles, tabbable controls, reduced motion compliance
- Footer credit: “Rocco Fortuna — https://www.linkedin.com/in/roccofortuna/”

## Notes

- Placeholder avatar lives at `public/placeholder.svg`.
- Facts used by the generator live in `data/facts.ts` and can be extended.
- Unit tests cover generator determinism and template integrity.

