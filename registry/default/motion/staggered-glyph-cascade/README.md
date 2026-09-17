# Staggered Glyph Cascade

A dramatic entrance reveal splitting strings into glyphs that drop down like raindrops with slight pseudo-random angle jitter and spring settle.

## Install

```bash
openui add staggered-glyph-cascade
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `entrance`
- Interaction model: `viewport-entrance-cycle`
- Visual model: `character-split-raindrop`
- Motion model: `staggered-spring-delay`
- Semantic purpose: `hero-statement-entrance`

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
