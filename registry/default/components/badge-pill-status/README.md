# Badge Pill Status

A compact status capsule token with colored state indicators for verified, pending, and degraded states.

## Install

```bash
openui add badge-pill-status
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `status-capsule-token`
- Visual model: `pill-status-dot`
- Motion model: `none`
- Semantic purpose: `resource-status-badge`

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
