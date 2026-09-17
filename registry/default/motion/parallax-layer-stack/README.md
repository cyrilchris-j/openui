# Parallax Layer Stack

Depth from scroll: three planes move at different rates (background 0.3×, mid 0.6×, foreground 1.2×) with depths declared per layer, plus a gentle scale falloff so far planes feel genuinely distant.

## Install

```bash
openui add parallax-layer-stack
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `scroll`
- Interaction model: `scroll-progress-trigger`
- Visual model: `multi-speed-planes`
- Motion model: `depth-rate-parallax`
- Semantic purpose: `depth-narrative`

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
