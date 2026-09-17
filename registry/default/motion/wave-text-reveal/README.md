# Wave Text Reveal

A headline phrase whose characters oscillate in an undulated sine wave rhythm before locking into typography baseline.

## Install

```bash
openui add wave-text-reveal
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `entrance`
- Interaction model: `sinusoidal-glyph-wave`
- Visual model: `undulating-character-ribbon`
- Motion model: `phase-offset-harmonic-sine`
- Semantic purpose: `kinetic-hero-headline`

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
