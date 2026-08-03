# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

FinLearn AI is a single-page React app for self-teaching financial-statement analysis, built around real S&P500 and VN30 companies. **The entire UI and all learning content are in Vietnamese** — keep new user-facing strings and Gemini prompts in Vietnamese to stay consistent. It was scaffolded as a Google AI Studio app (`react-example`), so some config carries AI Studio assumptions (see below).

## Commands

```bash
npm install        # install dependencies
npm run dev        # Vite dev server on 0.0.0.0:3000
npm run build      # production build to dist/
npm run preview    # serve the built dist/
npm run lint       # type-check only — runs `tsc --noEmit`, emits no JS
npm run clean      # rm -rf dist
```

There is **no test runner and no ESLint** configured. `npm run lint` is purely TypeScript type-checking; run it to validate changes. The toolchain (`tsc`) emits nothing (`noEmit: true`) — Vite handles the actual build.

## Environment

- `GEMINI_API_KEY` is read from `.env.local` (gitignored). Without it, all Gemini calls fail. Copy `.env.example` for the variable list.
- Vite injects the key via `define` in `vite.config.ts`, replacing `process.env.GEMINI_API_KEY` at build time. **This means the key is bundled into client-side JS** — an inherent property of this AI Studio scaffold, not a bug to "fix" silently.
- `DISABLE_HMR=true` disables Vite HMR/file-watching (used in the AI Studio sandbox to prevent flicker during agent edits). Do not change the HMR wiring in `vite.config.ts`.

## Architecture

Four source files carry all the logic; everything else is config.

- **`src/data/modules.ts`** — The single source of truth for course content. `MODULES` is a hardcoded array of 6 `Module` objects (Income Statement → Balance Sheet → Cash Flow → Key Ratios → Valuation → Comprehensive Analysis). Each module has a `companyExample` (e.g. "Apple Inc. (AAPL)") and a `sections` object whose `theory`/`deepDive`/`exercise`/`project` fields are **markdown strings** rendered via `react-markdown` + `remark-gfm`. Adding/editing a lesson means editing this file — no CMS or backend.
- **`src/services/gemini.ts`** — All AI calls. Four functions wrap the `@google/genai` SDK: `chatWithAI` (persona-driven chat), `analyzeFinancialImage` (vision), `getRealTimeCompanyData` and `getCompanyESGData` (both use the `googleSearch` grounding tool for live data). The model is `gemini-3-flash-preview` across all calls. Every call goes through `withRetry`, which retries **only on quota/429 (`RESOURCE_EXHAUSTED`) errors** with exponential backoff capped at 30s. The chat persona system (Value Investing / Growth / Technical / Dividend / General) maps each persona to a Vietnamese `systemInstruction`; `customKeywords` is appended to that instruction.
- **`src/App.tsx`** — The whole UI in one ~500-line component. Holds all state via `useState` (current module index, active tab, chat messages, fetched real-time/ESG data keyed by module id). No router, no global state library, no persistence — everything resets on reload. The `quiz` data exists in the `Module` type and `modules.ts` but **is not rendered anywhere** in the current UI; the four visible tabs are theory/deepDive/exercise/project.
- **`src/lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge), used throughout for conditional class names.

Entry point is `src/main.tsx` → `App`. Styling is Tailwind CSS v4 (configured in `vite.config.ts` via `@tailwindcss/vite`, no `tailwind.config.js`); the dark theme tokens and all `.prose` markdown styles live in `src/index.css`. Animations use `motion/react` (Framer Motion). Icons are `lucide-react`.

## Conventions

- Import alias `@/*` maps to the repo root (`tsconfig.json` + `vite.config.ts`), e.g. `@/src/lib/utils`. Existing code mostly uses relative imports — match the surrounding file.
- Error handling pattern: UI code distinguishes quota/429 errors and shows a Vietnamese "system overloaded" message with a retry button (see `handleSendMessage` / `handleFetchRealTimeData` in `App.tsx`). Reuse this pattern for new AI-backed features rather than surfacing raw errors.
- `react`/`react-dom` are v19 and the app runs under `StrictMode`.

## Notes / loose ends

- `express` and `tsx` are in dependencies but there is **no server file** in the repo and no script that runs one — the app is currently client-only.
- `index.html`'s `<title>` is still the AI Studio placeholder ("My Google AI Studio App").
