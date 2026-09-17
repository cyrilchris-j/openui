# Split Reading Dictionary

Glossary lookup layout: alphabetical term list on left and comprehensive term definition on right.

## Install

```bash
openui add split-reading-dictionary
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `reading`
- Interaction model: `glossary-term-selection`
- Visual model: `dictionary-term-and-definition`
- Motion model: `none`
- Semantic purpose: `glossary-lookup-layout`

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
