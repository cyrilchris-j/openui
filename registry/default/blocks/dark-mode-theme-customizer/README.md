# Dark Mode Theme Customizer

An interactive color palette modifier letting developers adjust primary hue, saturation, and export CSS variables.

## Install

```bash
openui add dark-mode-theme-customizer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `theme`
- Interaction model: `theme-hsl-token-manipulation`
- Visual model: `theme-color-palette-configurator`
- Motion model: `subtle`
- Semantic purpose: `theme-token-customization`

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
