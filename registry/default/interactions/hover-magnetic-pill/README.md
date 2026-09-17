# Hover Magnetic Pill

A compact tag chip that shifts coordinates toward cursor proximity with elastic rubberband pull.

## Install

```bash
openui add hover-magnetic-pill
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `hover`
- Interaction model: `pill-proximity-tracking`
- Visual model: `elastic-badge-capsule`
- Motion model: `damped-attractor-displacement`
- Semantic purpose: `magnetic-tag-indicator`

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
