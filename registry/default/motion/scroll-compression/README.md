# Scroll Compression

A stack of panels that compresses together as the page scrolls — each layer's gap interpolates from loose to sealed based on scroll progress through the section, like a deck being squeezed shut.

## Install

```bash
openui add scroll-compression
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `scroll`
- Interaction model: `scroll-progress-trigger`
- Visual model: `gap-collapsing-stack`
- Motion model: `scroll-linked-gap-interpolation`
- Semantic purpose: `narrative-sequence`

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
