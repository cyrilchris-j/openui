# Neon Flicker Sign

A neon sign built from text-shadow stacks with a scripted flicker that buzzes specific letters off-beat — the failure pattern of real signage, applied per glyph, resting steady most of the time.

## Install

```bash
openui add neon-flicker-sign
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `per-glyph-script`
- Visual model: `shadow-glow-stack`
- Motion model: `offbeat-buzz`
- Semantic purpose: `signage`

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
