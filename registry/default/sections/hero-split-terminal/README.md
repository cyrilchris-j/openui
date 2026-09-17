# Hero Split Terminal

A high-conversion landing hero pairing an editorial headline with an interactive installation terminal.

## Install

```bash
openui add hero-split-terminal
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `hero`
- Interaction model: `hero-split-terminal-interaction`
- Visual model: `hero-split-terminal-visual`
- Motion model: `subtle`
- Semantic purpose: `hero-split-terminal-section`

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
