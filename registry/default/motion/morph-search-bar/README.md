# Morph Search Bar

A compact search icon button that expands smoothly into a full input field upon user click.

## Install

```bash
openui add morph-search-bar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `transitions`
- Interaction model: `expand-search-aperture`
- Visual model: `morphing-pill-chassis`
- Motion model: `width-interpolation-spring`
- Semantic purpose: `collapsible-search-trigger`

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
