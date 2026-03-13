# CLAUDE.md

## Project Overview

**La Vie est Belle** is a production website for an aesthetic care business (Soin Esthetique Nussbaumer) based in Bellevue, Switzerland. It features a public-facing services showcase and a protected admin dashboard for content management. All user-facing content is in **French**.

## Tech Stack

- **Framework:** Next.js 15 (App Router) with TypeScript (strict mode)
- **UI:** React 19, Tailwind CSS 3.4, shadcn/ui (Radix primitives), Framer Motion
- **Backend:** Firebase (Firestore, Storage, Authentication)
- **AI:** Google Genkit with Gemini 2.5 Flash (minimal integration)
- **Forms:** React Hook Form + Zod validation
- **Node.js:** 20

## Commands

```bash
npm run dev          # Start dev server (Turbopack, port 9002)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint via Next.js
npm run typecheck    # TypeScript type checking (tsc --noEmit)
npm run genkit:dev   # Start Genkit AI dev server
```

## Project Structure

```
src/
  app/                  # Next.js App Router pages
    admin/              # Protected admin dashboard (auth-guarded)
    about/              # About page
    contact/            # Contact page with Firestore integration
    login/              # Firebase auth login
    services/           # Services showcase
    mentions-legales/   # Legal notices
    actions.ts          # Server actions
    layout.tsx          # Root layout (fonts, providers)
    globals.css         # Global styles & CSS variables
  components/
    layout/             # Header.tsx, Footer.tsx
    sections/           # Hero, ServicesPreview, AboutPreview, Testimonials
    ui/                 # shadcn/ui components (40+ components)
    admin/              # Admin-specific components (image upload)
    ContactForm.tsx     # Contact form with validation
  firebase/
    config.ts           # Firebase project config
    index.ts            # Client-side initialization & exports
    index.server.ts     # Server-side initialization
    auth.ts             # Dynamic/lazy-loaded Firebase Auth
    provider.tsx        # Firebase context provider
    firestore/          # useCollection, useDoc hooks
  hooks/                # Custom React hooks (use-toast)
  lib/
    utils.ts            # cn() utility, memoization helpers
    data.ts             # TypeScript interfaces & helpers
    initial-data.ts     # Seed data for services, categories, testimonials
  ai/                   # Genkit AI configuration
docs/
  blueprint.md          # Design spec & feature documentation
```

## Key Patterns & Conventions

### Naming
- **Components:** PascalCase filenames (`Hero.tsx`, `ServicesPreview.tsx`)
- **Hooks/utilities:** kebab-case (`use-collection.tsx`, `use-toast.ts`)
- **Routes:** kebab-case (`/mentions-legales`, `/admin`)
- **Path alias:** `@/*` maps to `./src/*`

### Architecture
- Heavy use of `'use client'` directives for interactive components
- Server Actions (`'use server'`) for form submissions in `actions.ts` files
- Firebase context via `FirebaseProvider` wrapping the app
- Custom hooks for Firestore real-time subscriptions: `useCollection<T>()`, `useDoc<T>()`
- Firebase Auth is lazy-loaded/dynamically imported to reduce bundle size
- Error handling via custom `FirestorePermissionError` and event-based error emitter

### Firestore Collections
- `services` - Service offerings
- `serviceCategories` - Service categories
- `testimonials` - Customer reviews
- `aboutContent` - About page content
- `contactInfo` - Contact information

### Design System
- **Primary color:** Gold/Bronze (#C68E56)
- **Background:** Off-white (#FAF9F6)
- **Heading font:** Cormorant Garamond (serif)
- **Body font:** Plus Jakarta Sans (sans-serif)
- HSL-based CSS variables for theming
- Dark mode: class-based (`:root.dark`)

### Security
- Firestore rules: public read, authenticated-only write
- Firebase API key is hardcoded but restricted in production
- Admin routes are auth-guarded via `admin/layout.tsx`

## Build & Deploy

- **Deployment:** Firebase App Hosting (`apphosting.yaml`)
- **Max instances:** 1 (minimal auto-scaling)
- **Image domains:** `placehold.co`, `images.unsplash.com`, `picsum.photos`, `firebasestorage.googleapis.com`
- Build config ignores TypeScript and ESLint errors (`ignoreDuringBuilds: true`)

## Testing

No formal test framework is configured. Rely on:
- TypeScript strict mode for type safety
- `npm run typecheck` to validate types
- `npm run lint` for linting
- Manual testing during development

## Important Notes

- All user-facing text is in **French** - maintain this when editing content
- The `next.config.ts` ignores TS/ESLint errors during build - run `typecheck` and `lint` separately to catch issues
- Firebase config is in `src/firebase/config.ts` - do not change project credentials
- shadcn/ui components live in `src/components/ui/` - add new ones via the shadcn CLI
