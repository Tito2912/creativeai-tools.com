# creativeai-tools.com (Next.js + MDX)

Static-exported Next.js site for an international affiliate SEO cluster.

- Primary language: **EN** at `/`
- Other languages: **FR** `/fr/`, **ES** `/es/`, **DE** `/de/`

## Install

```bash
npm i
npm run dev
```

## Build (static export)

```bash
npm run build
```

Deploy the `out/` folder (Netlify `publish` directory).

## Content

- Content lives in `content/` (MDX).
- Translations follow the folder prefix convention (ex: `content/fr/...`).

## Legacy

The previous static site is kept in `legacy-static/`.
