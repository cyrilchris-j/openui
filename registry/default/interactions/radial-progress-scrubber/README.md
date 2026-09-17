# Radial Progress Scrubber

A circular progress dial whose sweep angle can be adjusted interactively by dragging pointer around ring origin.

## Install

```bash
openui add radial-progress-scrubber
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `circumferential-angle-scrub`
- Visual model: `annular-svg-ring-gauge`
- Motion model: `polar-angle-tracking-stroke`
- Semantic purpose: `radial-percentage-dial`

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
