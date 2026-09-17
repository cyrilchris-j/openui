# Split Search Filter Map

Airbnb-style discovery layout: facet filters on left, scrollable entity cards in center, interactive map on right.

## Install

```bash
openui add split-search-filter-map
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `triptych-search-discovery`
- Visual model: `filter-cards-map-triptych`
- Motion model: `none`
- Semantic purpose: `location-discovery-search`

## Accessibility

- Keyboard reachable; visible focus ring.
- Honours `prefers-reduced-motion`: animation is disabled or replaced with a
  static state change.
- Semantic HTML first; ARIA only where the semantics need help.

## When to use

When the interface needs exactly this behaviour — check the fingerprint above
against the composition you are building.

## When not to use

When a simpler resource meets the need. Do not stack decorative motion on top
of a surface that already carries motion.
