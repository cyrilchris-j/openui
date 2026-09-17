# Multilingual Locale Selector

International geographic region selector section with interactive continent pills and currency selector.

## Install

```bash
openui add multilingual-locale-selector
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `footer`
- Interaction model: `locale-region-selection`
- Visual model: `language-continent-picker`
- Motion model: `none`
- Semantic purpose: `internationalization-selector`

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
