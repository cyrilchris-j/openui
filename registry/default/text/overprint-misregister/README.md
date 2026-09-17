# Overprint Misregister

Simulated CMYK misregistration: cyan, magenta and yellow copies of the word sit one pixel off each side of a black key plate, and dragging a control shifts the plates further out of register like a cheap print run.

## Install

```bash
openui add overprint-misregister
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `offset-dial`
- Visual model: `cmyk-plate-split`
- Motion model: `none`
- Semantic purpose: `display-statement`

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
