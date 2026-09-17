# Scroll Mask Wipe

A headline wiped open by the page's own scroll position: an inset clip-path tied to viewport progress means the reader, not a timer, controls how much of the statement is visible.

## Install

```bash
openui add scroll-mask-wipe
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `reveal`
- Interaction model: `scroll-progress`
- Visual model: `inset-clip`
- Motion model: `scroll-mapped-reveal`
- Semantic purpose: `statement-reveal`

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
