# Inertia Scroll Marquee

A dual-strip ticker banner with interactive swipe flick: dragging alters translation velocity, settling back smoothly to baseline crawl velocity.

## Install

```bash
openui add inertia-scroll-marquee
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `scroll`
- Interaction model: `drag-acceleration-glide`
- Visual model: `infinite-tape-strip`
- Motion model: `momentum-decay-to-baseline`
- Semantic purpose: `continuous-feature-ticker`

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
