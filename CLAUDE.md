# nezdemkovski.com — Developer Notes

## Tech Stack
- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 — uses `@theme` in `app/globals.css` for custom colors (`woodsmoke`, `whisper`, `mulled-wine`)
- **Database**: Supabase (PostgreSQL) — typed via `database.types.ts`
- **Auth**: Supabase Auth (email/password + GitHub OAuth)
- **Deployment**: Vercel
- **Package manager**: pnpm

## Commands
```bash
pnpm dev          # Start dev server with Turbopack on :3000
pnpm build        # Production build
pnpm lint         # ESLint
pnpm supabase:generate_types  # Regenerate database.types.ts from Supabase schema
```

## Key Paths
| Path | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, metadata, fonts, analytics, JSON-LD |
| `app/globals.css` | Tailwind imports + custom theme variables |
| `app/page.tsx` | Home dashboard (widget grid) |
| `app/games/` | Games tracker — Supabase CRUD, ADMIN-gated add/remove |
| `app/countries/` | Travel log — read-only public view |
| `app/hire-me/` | Cal.com booking page — intentionally excluded from sitemap |
| `components/WidgetCard.tsx` | Base wrapper for all dashboard widgets |
| `utils/handleError.ts` | Shared error handler used across all utils |
| `utils/fetcher.ts` | Generic typed fetch wrapper |
| `utils/supabase/` | Server and client Supabase instances |
| `database.types.ts` | Auto-generated DB types — do not edit manually |

## Architecture Notes
- All pages are **server components** by default; add `'use client'` only when needed (state, effects)
- Database access happens server-side only via `utils/supabase/server.ts`
- Admin features (add/remove games) are guarded by `getUserRights()` which checks the `users.user_rights` column
- Widget components must use `<WidgetCard>` from `components/WidgetCard.tsx` for consistent sizing
- Error handling uses `handleError()` from `utils/handleError.ts` — do not throw inline errors in utils

## Conventions
- Use `cn()` from `lib/utils.ts` (clsx + tailwind-merge) for conditional class merging
- Format: Prettier with `printWidth: 80`, single quotes, trailing commas
- List renders: always use stable IDs (e.g. `key={item.id}`), never `key={index}`
- Form inputs must have associated `<label>` elements with matching `htmlFor`/`id`
