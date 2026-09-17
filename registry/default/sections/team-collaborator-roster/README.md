# Team Collaborator Roster

Team profile grid showcasing principal architects, designers, and systems engineers.

## Install

```bash
openui add team-collaborator-roster
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `team`
- Interaction model: `team-member-inspection`
- Visual model: `avatar-card-cluster`
- Motion model: `none`
- Semantic purpose: `team-member-showcase`

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
