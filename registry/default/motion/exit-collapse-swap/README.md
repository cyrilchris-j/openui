# Exit Collapse Swap

List-item removal done respectfully: the leaving item animates height, margin and opacity to zero while neighbours slide into place simultaneously via FLIP measurement — no layout jump, no re-render jank.

## Install

```bash
openui add exit-collapse-swap
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `exit`
- Interaction model: `remove-trigger`
- Visual model: `measured-collapse-rows`
- Motion model: `flip-neighbour-slide`
- Semantic purpose: `list-mutation`

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
