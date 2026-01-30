# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Terra Gogo Official website built with React + Vite + Hono + Cloudflare Workers. This is a full-stack application where the React frontend is served as static assets from Cloudflare Workers, and Hono provides API routes at the edge.

## Package Manager

This project uses **pnpm**. Always use `pnpm` instead of npm or yarn.

## Common Commands

### Development
```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server at http://localhost:23456
pnpm typecheck        # Run TypeScript type checking
pnpm lint             # Run ESLint
pnpm format.fix       # Format code with Prettier
```

### Build & Deploy
```bash
pnpm build            # Build for production (runs tsc + vite build)
pnpm preview          # Build and preview locally
pnpm check            # Full check: typecheck + build + dry-run deploy
pnpm deploy           # Deploy to Cloudflare Workers
npx wrangler tail     # Monitor deployed worker logs
```

**SEO / route-specific HTML:** Each route (`/`, `/about`, `/cooperation`, `/agentic-pay`, `/blogs`) has its own pre-rendered HTML in `dist/client`. The Worker serves route-specific `index.html` so "View Source" shows the correct page. If non-homepage routes still show homepage source after deploy, clear the Cloudflare build cache in the dashboard and redeploy so assets (including subdirectory `index.html` files) are re-uploaded.

### Cloudflare Workers
```bash
pnpm cf-typegen       # Generate TypeScript types for Cloudflare bindings
```

## Architecture

### Project Structure
- `src/react-app/` - React frontend application
  - `pages/` - Page components (index, cooperation, about)
  - `components/` - Reusable React components
  - `components/ui/` - shadcn/ui components
  - `locales/` - Internationalization (i18n) files
  - `lib/` - Utility functions
  - `hooks/` - Custom React hooks
- `src/worker/` - Hono backend running on Cloudflare Workers
- `dist/client/` - Built static assets (served by Workers)

### Key Technologies
- **React 19** with TypeScript
- **Vite** for build tooling (dev server runs on port 23456)
- **Hono** for API routes in Cloudflare Workers
- **Cloudflare Workers** for edge deployment
- **shadcn/ui** + **Radix UI** for UI components
- **Tailwind CSS** for styling
- **React Router** for client-side routing
- **TanStack Query** for data fetching
- **Framer Motion** for animations
- **Three.js** (@react-three/fiber) for 3D graphics

### Path Aliases
- `@/` maps to `/src/react-app/` (configured in vite.config.ts)

### Internationalization (i18n)
The app supports multiple languages via a custom context-based system:
- Languages: `zh-CN`, `en-US`, `zh-TW`, `es-ES`
- Translation files in `src/react-app/locales/`
- Use `useLanguage()` hook to access `t()` function and `currentLanguage`
- Language preference stored in localStorage
- `zh-CN` is the fallback language

### Routing
Routes are defined in `src/react-app/App.tsx`:
- `/` - Home page
- `/cooperation` - Cooperation page
- `/about` - About page
- `*` - 404 Not Found page

**Important**: Add all custom routes ABOVE the catch-all `*` route.

### Worker Configuration
- Entry point: `src/worker/index.ts`
- Static assets served from `dist/client/`
- SPA mode enabled (all routes serve index.html)
- Observability enabled for monitoring
- Source maps uploaded for debugging

### TypeScript Configuration
Uses project references with separate configs:
- `tsconfig.app.json` - React app
- `tsconfig.node.json` - Vite config
- `tsconfig.worker.json` - Cloudflare Worker

## Development Notes

### Adding New Routes
1. Create page component in `src/react-app/pages/`
2. Add route in `src/react-app/App.tsx` BEFORE the `*` catch-all route

### Adding API Endpoints
Add routes in `src/worker/index.ts` using Hono's routing API.

### Adding Translations
1. Add key-value pairs to all locale files in `src/react-app/locales/`
2. Use `t('key')` in components via `useLanguage()` hook

### UI Components
This project uses shadcn/ui components. Components are in `src/react-app/components/ui/`. Follow shadcn/ui patterns when modifying or adding components.
