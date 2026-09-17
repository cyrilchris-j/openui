# Exit Fade Hierarchy

Content exits in reverse importance order: the least important elements fade first, headings hold longest — a choreography where the eye keeps its anchor while everything else dissolves around it.

## Install

```bash
openui add exit-fade-hierarchy
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `exit`
- Interaction model: `exit-sequence`
- Visual model: `importance-ordered-fade`
- Motion model: `reverse-priority-stagger`
- Semantic purpose: `transition-out`

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
