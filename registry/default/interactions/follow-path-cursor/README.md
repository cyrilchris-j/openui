# Follow Path Cursor

An interactive tracker node that constrains mouse interaction to a curvilinear parametric SVG spline rail.

## Install

```bash
openui add follow-path-cursor
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `constrained-spline-slider`
- Visual model: `sinusoidal-rail-guide`
- Motion model: `parametric-curve-travel`
- Semantic purpose: `rail-constrained-tracker`

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
