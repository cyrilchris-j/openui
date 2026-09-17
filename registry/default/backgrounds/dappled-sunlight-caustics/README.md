# Dappled Sunlight Caustics

Subtle forest canopy or water ripple dappled lighting caustics with soft blurred highlights.

## Install

```bash
openui add dappled-sunlight-caustics
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-caustic-lighting`
- Visual model: `dappled-sunlight-mask`
- Motion model: `none`
- Semantic purpose: `natural-sunlight-caustics`

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
