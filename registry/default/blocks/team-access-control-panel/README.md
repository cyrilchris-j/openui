# Team Access Control Panel

An administrative user permissions manager with role selectors (Admin, Editor, Viewer) and invitation modals.

## Install

```bash
openui add team-access-control-panel
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `team`
- Interaction model: `role-permission-assignment-matrix`
- Visual model: `user-roster-access-management`
- Motion model: `subtle`
- Semantic purpose: `organization-access-control`

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
