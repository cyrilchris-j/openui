# Sticky Sidebar Flow

Main content column flanked by a sticky utility sidebar that remains anchored while scrolling.

## Install

```bash
openui add sticky-sidebar-flow
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `pinned-sidebar-scroll`
- Visual model: `sticky-rail-split`
- Motion model: `none`
- Semantic purpose: `article-with-sticky-tools`

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
