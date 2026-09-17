# Tab Underline Strip

A tab bar displaying underlined selection border styles below active option.

## Install

```bash
openui add tab-underline-strip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `underline-tab-selection`
- Visual model: `ruled-underline-track`
- Motion model: `none`
- Semantic purpose: `underline-tab-bar`

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
