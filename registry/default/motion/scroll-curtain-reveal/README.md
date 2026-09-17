# Scroll Curtain Reveal

A dual-leaf curtain mechanism that parts horizontally across the viewport as the user scrolls, unveiling underlying content.

## Install

```bash
openui add scroll-curtain-reveal
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `scroll`
- Interaction model: `wheel-scrubbed-reveal`
- Visual model: `bisected-shutter-leaves`
- Motion model: `linear-scroll-displacement`
- Semantic purpose: `dramatic-section-gate`

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
