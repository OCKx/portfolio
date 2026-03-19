# Testing the React Portfolio App

## Local Development Setup

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev` (runs on http://localhost:5173 by default)
3. Build for production: `npm run build` (outputs to `dist/`)

## Key Features to Test

### Sections (scroll order)
1. **Hero** — Name ("Callistus Obiorah"), title ("Full-Stack Developer"), profile photo with "4+ Years" badge, two CTA buttons, 5 social icons
2. **About** — Experience timeline (7 entries), Education cards (2 entries)
3. **Projects** — 6 project cards in grid, tech tags, status badges (e.g. "In Progress")
4. **Skills** — 5 categorized groups: Frontend, Backend, Databases, DevOps & Tools, Cloud & Hosting
5. **Contact** — Email, Phone, Location cards
6. **Footer** — Signature, nav links, social icons, copyright

### Interactive Features
- **Dark/Light mode toggle**: Moon/Sun icon button in the navbar. Toggles `dark` class on `<html>`. Verify background, text, and card colors change across ALL sections.
- **Navbar scroll effect**: Transparent at top, gains white background + shadow after scrolling ~50px.
- **Navigation links**: Anchor links (#Home, #About, #Projects, #Skills, #Contact) should scroll to the correct section.
- **Scroll-to-top button**: Green circular button appears at bottom-right after scrolling past ~400px.
- **Scroll-reveal animations**: Sections fade in via IntersectionObserver when scrolled into view.

### Profile Image
- Located at `public/images/profile.jpg`
- Falls back to placeholder (`https://placehold.co/400x400/png?text=CO`) if image fails to load

## Deployment

- Build first with `npm run build`
- Deploy the `dist/` folder
- Note: The project uses Vite, so GitHub Pages needs to be configured to serve from `dist/` or use a GitHub Actions workflow

## Tech Stack
- React + TypeScript
- Vite (build tool)
- Tailwind CSS (styling with dark mode via `class` strategy)
- Lucide React (icons)
- No backend required — fully static site

## Common Issues
- If dark mode doesn't work, check that `tailwind.config.js` has `darkMode: ["class"]`
- If images don't load, verify files exist in `public/images/`
- The signature image (`line.png`) uses `dark:invert` class to work in dark mode
