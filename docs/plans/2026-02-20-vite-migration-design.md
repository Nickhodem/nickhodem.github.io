# Design: Migrate personal site from Next.js to Vite + React

**Date:** 2026-02-20
**Approach:** A — Direct lift-and-shift from `brainy-bio-box/`

## Goal

Replace the existing Next.js personal site with the Vite + React app from `brainy-bio-box/`, porting the IKE Comparison tool as a routed page and fixing placeholder contact links.

## Architecture

The `brainy-bio-box/` app becomes the canonical site at the root of `personal_site/`. React Router handles both the homepage and the IKE Comparison tool page.

**Stack:** Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + framer-motion + react-router-dom

## File Changes

### Copy to root (from brainy-bio-box/)
- `src/` — all components, pages, hooks, lib
- `index.html`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`
- `components.json`, `eslint.config.js`, `vitest.config.ts`
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- `package.json`, `bun.lockb`
- `public/`

### Delete from root
- `app/`, `components/`, `tools/` (Next.js app directory structure)
- `next.config.ts`, `next-env.d.ts`
- Old `node_modules/` (reinstall for Vite deps)
- Old `package.json`, `package-lock.json`, `tsconfig.json`

## Code Changes

### 1. IKE Comparison page
- Copy `tools/IkeComparison.tsx` → `src/pages/IkeComparison.tsx`
- Remove `"use client"` directive (Next.js specific, not needed in Vite)
- Add route in `App.tsx`: `<Route path="/ike-comparison" element={<IkeComparison />} />`

### 2. Navbar
- Add a "tools" link navigating to `/ike-comparison` using react-router-dom `<Link>`
- Style consistent with existing mono nav links but as a page route (not scroll anchor)

### 3. ContactSection
- Replace placeholder links with real ones:
  - Email: `mailto:nickhodem@gmail.com`
  - GitHub: `https://github.com/nickhodem`
  - LinkedIn: `https://linkedin.com/in/nikodem-pankiewicz`

### 4. Makefile
- Update `dev` → `npm run dev` (Vite)
- Update `build` → `npm run build` (Vite)
- Update `deploy` → `npm run build && npx gh-pages -d dist --nojekyll`

### 5. Vite config
- Ensure `base: "/"` is set appropriately for GitHub Pages deployment

## Out of Scope
- Content changes to Mission, Bio, or Projects sections
- Adding a full Tools section to the homepage
- Any new features beyond IKE Comparison port
