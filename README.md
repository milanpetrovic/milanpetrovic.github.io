# Milan Petrović — Digital CV

A self-contained personal CV/portfolio site. Built with **Vite 7**, **Tailwind CSS v4** (CSS-first, no PostCSS), and the **Instrument Sans** variable font (self-hosted via Fontsource). The design system — warm paper palette, sharp-cornered bracketed cards with L-shaped corner ticks, dotted backgrounds, and lightweight scroll animations — is ported from the Filament UI aesthetic.

## Stack

- Vite `^7` with `@tailwindcss/vite` plugin
- Tailwind CSS `^4.3` configured CSS-first via `@theme {}` in `src/style.css`
- `@fontsource-variable/instrument-sans` (self-hosted, no Google Fonts request)
- Zero runtime JS dependencies — scroll reveals, active-nav highlighting, and back-to-top are vanilla `IntersectionObserver` in `src/main.js`

## Project structure

```
digital-cv/
├── index.html              # Vite entry — all CV markup
├── src/
│   ├── style.css           # Tailwind import + @theme tokens + components
│   └── main.js             # Font import + lightweight interactions
├── public/                 # Static assets copied as-is (photo, patterns)
├── vite.config.js          # base "/", outDir "dist"
└── .github/workflows/deploy.yml
```

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploy to GitHub Pages

This site is meant to ship to the **user page** `milanpetrovic.github.io`, which serves from the domain root — hence `base: "/"` in `vite.config.js`. (For a *project* page, change `base` to `"/<repo-name>/"`.)

The included workflow (`.github/workflows/deploy.yml`) builds and publishes automatically:

1. Push this folder's contents to the **`main`** branch of the `milanpetrovic.github.io` repository.
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Every push to `main` builds `dist/` and deploys it. You can also trigger it manually from the **Actions** tab (`workflow_dispatch`).

## Editing content

All copy lives in `index.html`. Design tokens (colors, font, spacing) live in the `@theme {}` block at the top of `src/style.css`; component styles (`.frame`, `.frame-featured`, `.feature`, `.chip`, `.btn`, timeline, etc.) follow in `@layer components`.

> **Note:** The three Projects and three Testimonials are placeholder content — swap in real descriptions, links, and tags. The original CV's footer year (© 2022) and job-title spelling were preserved verbatim from the source site.
