# Timeline Event Card

An audit trail card tracking historical deployment and commit operations with author attribution.

## Install

```bash
openui add timeline-event-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `audit-event-inspection`
- Visual model: `chronological-event-slab`
- Motion model: `none`
- Semantic purpose: `audit-trail-event-card`

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
