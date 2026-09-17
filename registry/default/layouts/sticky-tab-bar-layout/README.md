# Sticky Tab Bar Layout

Scrollable view layout featuring a horizontal tab strip that sticks cleanly to the top viewport edge.

## Install

```bash
openui add sticky-tab-bar-layout
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `sticky-tab-bar-scroll`
- Visual model: `pinned-horizontal-tab-rail`
- Motion model: `none`
- Semantic purpose: `tabbed-content-viewport`

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
