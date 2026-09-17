# Matrix Permission Table

Role-based access control grid with toggleable capability checkboxes across User, Manager, and Admin roles.

## Install

```bash
openui add matrix-permission-table
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `matrix-checkbox-toggle`
- Visual model: `role-permission-grid`
- Motion model: `none`
- Semantic purpose: `rbac-access-assignment`

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
