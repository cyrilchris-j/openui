# Waterfall Progress Bar

Sequential build/deployment phases tracker showing pipeline stage timings and completion states.

## Install

```bash
openui add waterfall-progress-bar
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `sequential-phase-inspection`
- Visual model: `waterfall-timing-bars`
- Motion model: `none`
- Semantic purpose: `pipeline-latency-breakdown`

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
