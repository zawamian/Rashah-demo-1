# Recipes Page — Design Spec

**Date:** 2026-05-25  
**Status:** Approved  
**Feature:** F — Recipes Page

---

## Overview

Add a dedicated **Recipes** page to the Rashah storefront showcasing full editorial recipes built around each product. Layout style: Split Editorial (photo left, steps right). Navigation: new "Recipes" nav tab between Collections and Connect.

---

## Data Structure

### New `Recipe` interface — add to `src/types.ts`

```typescript
export interface Recipe {
  id: string
  title: string
  title_ar?: string
  title_tr?: string
  productId: string        // references a Product.id in products.ts
  tag: string              // meal category e.g. "Breakfast", "Dinner", "Snack"
  prepTime: string         // e.g. "5 min"
  cookTime?: string        // e.g. "20 min" — omit if not applicable
  servings: number
  ingredients: string[]
  ingredients_ar?: string[]
  ingredients_tr?: string[]
  steps: string[]          // ordered method steps
  steps_ar?: string[]
  steps_tr?: string[]
  note?: string            // optional pairing tip shown after steps
  note_ar?: string
  note_tr?: string
}
```

### New `src/data/recipes.ts`

Five recipes covering all three product series. Product images are reused from `products.ts` via `productId` — no new image assets needed.

| Recipe | `productId` | Tag |
|---|---|---|
| Sumac Labneh with Wild Herbs | `rashah-signature-blend` | Breakfast |
| Za'atar Flatbread Dip | `zaatar-premium-artisanal` | Snack |
| Aleppo Pepper Fried Eggs | `aleppo-smoked-pepper-flakes` | Breakfast |
| Cardamom Rose Granola Bowl | `cardamom-rose-pecan-granola` | Breakfast |
| Black Lime Seafood Risotto | `loomi-fermented-black-lime` | Dinner |

Each recipe includes full EN/AR/TR translations for `title`, `ingredients`, `steps`, and `note`.

---

## Component Architecture

### New file: `src/components/Recipes.tsx`

**Page structure:**
1. **Page header** — "Recipes" heading + brand subtitle (e.g. *"From our kitchen to yours"*), translated via `useLanguage()`
2. **Recipe list** — vertical stack of recipe cards, staggered fade-in via `motion/react`

**Each recipe card (Split Editorial layout):**
- **Left panel (40%)** — product image (from linked product), tag badge, prep time, servings count
- **Right panel (60%):**
  - Recipe title (bold, serif-style)
  - Ingredients list (bulleted)
  - Numbered method steps
  - Optional tip/note in italic
  - `→ Shop [Product Name]` CTA button — navigates to Collections page with `selectedCategory` set to the linked product's category

**RTL support:** Card uses `flexbox` with `dir` from `useLanguage()`. In Arabic (`dir="rtl"`), panels swap naturally.

**Animations:** Page enters with `opacity: 0 → 1` (same as other pages). Recipe cards stagger in with `y: 20 → 0, opacity: 0 → 1` using `motion/react` `variants` + `staggerChildren`.

---

## Files Modified

| File | Change |
|---|---|
| `src/types.ts` | Add `Recipe` interface |
| `src/data/recipes.ts` | **New** — recipe data array |
| `src/components/Recipes.tsx` | **New** — Recipes page component |
| `src/App.tsx` | Add `'recipes'` to `activePage` union type; import and render `<Recipes />`; add `handleNavigateToRecipes` helper |
| `src/components/Header.tsx` | Add `recipes` nav link between Collections and Connect |
| `src/components/Footer.tsx` | Add Recipes link in footer nav |

---

## Data Flow

```
recipes.ts (static array)
    └── Recipes.tsx
            ├── useLanguage()  →  title / ingredients / steps in active language
            ├── productId      →  look up product image from products.ts
            └── CTA click      →  setActivePage('collections') + setSelectedCategory(product.category)
```

No async fetching — data is static. No React Query needed for this feature.

---

## Out of Scope

- User-submitted recipes
- Recipe search or filtering (can be added later as the recipe list grows)
- New photography assets (reuses product images)
- Recipe ratings or comments
