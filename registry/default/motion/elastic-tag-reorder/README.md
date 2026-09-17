# Elastic Tag Reorder

An interactive tag pill shelf where items exchange grid slots with smooth spring-driven layout shifts.

## Install

```bash
openui add elastic-tag-reorder
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gestures`
- Interaction model: `tag-swap-shuffle`
- Visual model: `flex-pill-shelf`
- Motion model: `fluid-reordering-spring`
- Semantic purpose: `interactive-filter-organizer`

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
