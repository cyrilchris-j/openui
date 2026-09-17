# Progress Circle Ring

An SVG circular percentage progress meter with stroke dash-offset visualization and centered value readout.

## Install

```bash
openui add progress-circle-ring
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `feedback`
- Interaction model: `static-circle-gauge`
- Visual model: `circumferential-ring-meter`
- Motion model: `none`
- Semantic purpose: `circular-capacity-gauge`

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
