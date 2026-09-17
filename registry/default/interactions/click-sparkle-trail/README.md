# Click Sparkle Trail

A playful click feedback system spawning miniature starburst vectors that scatter outward and twinkle away on click.

## Install

```bash
openui add click-sparkle-trail
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `feedback`
- Interaction model: `coordinate-click-burst`
- Visual model: `geometric-starburst-sparks`
- Motion model: `radial-twinkle-fadeout`
- Semantic purpose: `sensory-click-reward`

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
