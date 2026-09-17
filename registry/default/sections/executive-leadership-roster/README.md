# Executive Leadership Roster

An organizational leadership card display showcasing founder portraits, credentials, and social links.

## Install

```bash
openui add executive-leadership-roster
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `team`
- Interaction model: `executive-leadership-roster-interaction`
- Visual model: `executive-leadership-roster-visual`
- Motion model: `subtle`
- Semantic purpose: `executive-leadership-roster-section`

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
