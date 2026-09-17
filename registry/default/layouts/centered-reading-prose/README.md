# Centered Reading Prose

Narrow-measure centered typography layout optimized for distraction-free longform reading.

## Install

```bash
openui add centered-reading-prose
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `reading`
- Interaction model: `passive-focused-reading`
- Visual model: `narrow-measure-prose-strip`
- Motion model: `none`
- Semantic purpose: `distraction-free-reading`

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
