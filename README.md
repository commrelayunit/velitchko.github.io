# Velitchko Filipov

Source for [velitchko.github.io](https://velitchko.github.io): a static personal academic website for research, projects, publications, writing, and contact information.

The site is built with Next.js and TypeScript, exported as static files, and deployed to GitHub Pages. It has a retro theme alongside a restrained professional theme; the visitor's choice is stored locally in the browser.

## What lives here

- The homepage in `app/page.tsx`: profile, research interests, projects, publications, and contact details.
- Publication utilities and types in `data/publications.ts`.
- A BibTeX source of truth in `data/publications.bib`, plus generated data in `data/publications-generated.ts`.
- The co-author network at `/coauthors`, built with `d3-force`.
- Markdown posts in `data/blog-posts/`, served under `/blog`.
- Static assets, including the CV, in `public/`.

## Local development

The deployment workflow uses Node.js 20. Use the same major version locally.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Useful checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

`npm run build` produces the static export in `out/`. The GitHub Actions deployment runs `npm ci` and the production build on every push to `main`.

## Publications

Do not edit `data/publications-generated.ts` by hand. Edit `data/publications.bib`, then regenerate:

```bash
node scripts/parse-bibtex.js
```

Commit the BibTeX source and generated TypeScript file together. The parser handles authors, venues, DOI/arXiv links, keywords, awards, and invited status.

Use standard entry types where possible. Presentations use `@presentation`; the website renders them as **Presentation** and automatically adds the **Invited** badge.

```bibtex
@presentation{example2026,
  author   = {First Author and Velitchko Filipov},
  title    = {{Example Presentation}},
  year     = {2026},
  venue    = {Example Workshop, Vienna, Austria},
  doi      = {10.xxxx/example},
  keywords = {Visualization; Visual Analytics}
}
```

For other invited work, add `invited = {true}`. Keyword values are semicolon- or comma-separated and feed the publication filter.

## Writing

Create a Markdown file in `data/blog-posts/` with front matter such as:

```markdown
---
title: "Post title"
subtitle: "Optional subtitle"
date: "2026-08-27"
author: "Velitchko Filipov"
hashtags: ["#datavis"]
categories: ["Research"]
excerpt: "A short listing summary."
---
```

Posts support GitHub-flavoured Markdown, code highlighting, and math. Drafts or material not meant for publication belong in `data/blog-posts/backlog/`.

## Deployment

`.github/workflows/deploy.yml` deploys the static export to GitHub Pages after pushes to `main`; it can also be triggered manually from GitHub Actions. The workflow accepts the optional `NEXT_PUBLIC_SITE_URL` secret to render absolute Open Graph URLs.

## Maintenance

- Keep generated publication data in sync with the BibTeX source.
- Prefer small, focused pull requests and include the checks you ran.
- Do not commit credentials, local configuration, or generated dependency directories.

This repository is the live website source, not a generic portfolio template.
