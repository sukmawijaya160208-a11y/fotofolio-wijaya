# Fotofolio Wijaya

Portfolio one-pager — Muhammad Sukma Wijaya (Wijaya). Art-directed editorial layout: extruded hero title, split-flank slogan, blueprint journey & skills boards.

## Stack

- React 19 + TypeScript (strict) + Vite 8
- Tailwind CSS 4 (vite plugin)
- framer-motion (scroll reveals / camera scrub), lucide-react
- three.js + @react-three/fiber + @react-three/drei — Section 11 Code Universe
  (chunk terpisah, lazy-load hanya saat section mendekati viewport)
- Fonts: Anton, Bebas Neue, Caveat, IBM Plex Mono, Inter (fontsource, self-hosted)
- Lint: oxlint

## Scripts

```bash
npm run dev       # dev server (vite)
npm run build     # tsc -b && vite build -> dist/
npm run lint      # oxlint
npm run preview   # preview build hasil
```

## Deploy (Vercel)

Config siap di `vercel.json` (framework: vite, output: `dist/`, SPA rewrite).

**Via CLI:**

```bash
npx vercel login
npx vercel --prod
```

**Via Dashboard:** import repo `sukmawijaya160208-a11y/fotofolio-wijaya` di [vercel.com/new](https://vercel.com/new) — settings auto-detect dari `vercel.json`.

## Struktur

```
src/
  components/hero/        # hero stage (desktop absolute + mobile stack)
  components/case-study/  # 07 editorial dossier (sticky cinematic)
  components/universe/    # 11 code universe (three.js, lazy)
  components/contact/     # 12 command center + 13 final signature
  components/…            # sections lain
  data/                   # konten + asset registry (assets.ts, profile.ts, universe.ts, …)
  lib/                    # helpers
public/assets/            # foto real (wijaya-hero.webp, wijaya-portrait.webp, …)
docs/                     # PRD addendum + session notes
```

## Catatan desain

- Person hero dikunci di tengah (50%), photo immutable: no filter, no crop — hanya layout + shadow.
- Slogan split-flank: ter-anchor ke 50% viewport, gap tetap dari muka di semua lebar (1280–1920 verified).
- Breakpoint desktop: `min-[1280px]` (di bawah itu stacked layout utuh).
- Section 11: WebGL hanya mount saat IntersectionObserver mendekati viewport;
  `prefers-reduced-motion` → kamera & orbit statis; mobile → quality `low` (dpr 1, bintang sedikit).
- Detail lengkap: `docs/PRD-ADDENDUM-OPencode.md`.
