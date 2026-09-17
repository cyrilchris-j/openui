# Firework Pop Glyphs

Celebration typography: on trigger, each glyph fires once — pops upward with rotation, bursts into two spark pseudo-elements that fly apart, then the glyph re-seats with an overshoot settle. One shot per click.

## Install

```bash
openui add firework-pop-glyphs
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `kinetic`
- Interaction model: `click-trigger-one-shot`
- Visual model: `glyph-burst-sparks`
- Motion model: `pop-overshoot-settle`
- Semantic purpose: `celebration-heading`

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
