# Hover Expand Accordion Row

A compact feed row list that expands active disclosure content smoothly on cursor hover.

## Install

```bash
openui add hover-expand-accordion-row
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `hover-accordion-disclosure`
- Visual model: `vertical-collapsible-slabs`
- Motion model: `smooth-height-expansion`
- Semantic purpose: `hover-disclosure-row`

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
