# Reviews & Testimonials — Design Spec

**Date:** 2026-05-25  
**Status:** Implemented  
**Feature:** G — Reviews & Testimonials

---

## Overview

Add social proof to the Rashah storefront in two locations: a full-width testimonials section on the homepage, and per-product star ratings on every Collections card. Uses the `CircularTestimonials` component (adapted for Vite/Tailwind/motion).

---

## Placement

| Location | What |
|---|---|
| Homepage — after Narrative section | `CircularTestimonials` carousel (dark bg) |
| Collections — each product card | Static star rating row (★★★★★ + count) |

---

## Component

**`src/components/ui/circular-testimonials.tsx`**  
Adapted from the original prompt's component:

| Original | Adapted |
|---|---|
| `"use client"` directive | Removed (Vite, not Next.js) |
| `framer-motion` imports | `motion/react` (project standard) |
| `FaArrowLeft/Right` (react-icons) | `ArrowLeft/Right` from lucide-react |
| `<style jsx>` blocks | Tailwind utility classes |

Props: `testimonials[]`, `autoplay`, `colors`, `fontSizes` — all configurable.

---

## Data

**`src/data/testimonials.ts`**

- 4 testimonials with `quote`, `name`, `designation`, `src` (Unsplash portrait URLs)
- `productRatings` map: `Record<productId, { stars, count }>` — static ratings for all 7 products

---

## Homepage Section (`src/components/Testimonials.tsx`)

- Dark charcoal background (`bg-brand-charcoal`) to contrast with the cream Narrative above it
- Brand colours passed to `CircularTestimonials` (terracotta arrows, cream text, ochre accent)
- Auto-rotates every 5s; manual arrow navigation; keyboard arrow key support
- Animated word-blur entrance on each quote transition
- Section label + heading translated via `useLanguage()` (EN/AR/TR keys added)
- Entrance animation via `motion/react` `whileInView`

---

## Star Ratings on Product Cards (`Collections.tsx`)

- Inserted between the product subtitle and description
- 5 filled `Star` icons (lucide-react) in `brand-terracotta`
- Numeric rating + review count pulled from `productRatings[product.id]`
- Hidden gracefully if product has no entry in the ratings map

---

## Files Changed

| File | Change |
|---|---|
| `src/components/ui/circular-testimonials.tsx` | **New** — adapted component |
| `src/data/testimonials.ts` | **New** — testimonial data + ratings map |
| `src/components/Testimonials.tsx` | **New** — homepage section wrapper |
| `src/App.tsx` | Import + render `<Testimonials />` after `<Narrative />` |
| `src/components/Collections.tsx` | Star rating row on product cards |
| `src/context/LanguageContext.tsx` | `testimonials_label` / `testimonials_heading` in EN/AR/TR |
| `vite.config.ts` | `@/` alias → `./src` |
| `tsconfig.json` | `@/*` paths → `./src/*` |

---

## Out of Scope (deferred)

- User-submitted reviews / review form
- Per-product review modals
- Review filtering or sorting
- Verified purchase badges
