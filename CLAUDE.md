# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal one-page site for Virginia Marin (writer, literary translator, nature photographer), built with Astro and following a Canva-made design. Content is bilingual (Spanish primary, English secondary) throughout.

## Commands

Package manager is `pnpm` (see `pnpm-workspace.yaml`).

| Command        | Action                                  |
| :------------- | :--------------------------------------- |
| `pnpm install` | Install dependencies                     |
| `pnpm dev`     | Dev server at `localhost:4321`           |
| `pnpm build`   | Build static site to `./dist/`           |
| `pnpm preview` | Preview the production build             |

There is no test suite or linter configured.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Architecture

The entire site is a single page (`src/pages/index.astro`) that assembles one `.astro` component per section, in order: `Hero`, `Biografia`, `Escritura`, `Traduccion`, `Fotografia`, `Contacto`. Each section component owns its own `<section id="...">`, content, and scoped `<style>` block — there's no shared section wrapper component. The design has no footer, so there is no footer component.

`SiteNav.astro` renders the section menu and takes a `variant` prop. `Hero` embeds `variant="hero"` (overlaid on the cover photo, as in the Canva design); `index.astro` renders `variant="sticky"`, a fixed bar that a small `IntersectionObserver` in `SiteNav` reveals only once the hero scrolls out of view. Both read the same link list from `src/data/nav.ts` — add or reorder sections there, not in the components.

`SectionTitle.astro` is the shared bilingual heading used by every content section: it takes `es`/`en` props. The Canva design has no visible section titles (the nav marks the current section), so it renders `.visually-hidden` — the `<h2>` stays in the HTML for screen readers and search engines. Follow the `es`/`en` prop pattern (not separate components) when adding bilingual text elsewhere.

Design tokens (colors, fonts) live in `src/styles/global.css` as CSS custom properties (`--bg`, `--ink`, `--accent`, `--accent-soft`, `--title`, `--font-serif`, etc.), derived from the Canva design and imported once in `src/layouts/Layout.astro`. Reuse these tokens rather than hardcoding colors/fonts in component styles. Fonts are **self-hosted**, declared in the top-level `fonts` array in `astro.config.mjs` (Astro's built-in font API) and emitted by the `<Font>` components in `Layout.astro`. Astro downloads the files at build time into `dist/_astro/fonts/`, so the page makes **no request to Google**. Two families: `Water Brush` (`--font-display`: hero title, signature, and the handwritten verses in `Escritura`) and `Cormorant Garamond` (`--font-serif`: body). Water Brush has a small x-height, so anything set in it needs a noticeably larger `font-size` than a body-text equivalent to read at the same apparent size. The semantic `--font-*` tokens in `global.css` just alias the `cssVariable` Astro generates — don't hardcode family names, and don't add a `fallbacks` entry ending in `cursive`, which prevents Astro from generating the metric-adjusted fallback that keeps the title from shifting on load. Only the above-the-fold variants are preloaded (Water Brush, plus Cormorant 400 normal). `global.css` also holds the shared `.col-title` (blue centred column heading), `.divider` (rule with a diamond) and `.frame` (white polaroid frame) pieces that recur across sections.

Photos live in `src/assets/images/` and are rendered through `astro:assets` `<Image>`, which needs the `sharp` dependency to build. **When cropping an `<Image>` with `aspect-ratio`, always set `height: auto` too** — the component emits a `height` attribute that otherwise wins and stretches the image. Alt text for each photo comes from the author's accessibility sheet; keep those descriptions when swapping images.

### Contact form

`Contacto.astro` posts to **Netlify Forms** (`data-netlify="true"`, honeypot field, hidden `form-name` input) — this only works when deployed on Netlify. If the site is ever moved to Cloudflare Pages instead, the form needs a third-party backend (e.g. Web3Forms, Formspree): change the form `action` and remove the `data-netlify`/`netlify-honeypot` attributes.

### Deployment

Domain (`virginiamarin.com`, set in `astro.config.mjs`) is managed in Cloudflare DNS; `netlify.toml` defines the Netlify build (`pnpm build` → `dist`). DNS records to Netlify must have the Cloudflare proxy **disabled** ("DNS only") since Netlify issues its own SSL certificate.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
