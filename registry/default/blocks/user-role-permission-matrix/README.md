# User Role Permission Matrix

An enterprise access control table defining read, write, and delete permissions per team persona.

## Install

```bash
openui add user-role-permission-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `security`
- Interaction model: `permission-checkbox-toggling`
- Visual model: `crud-permission-matrix-grid`
- Motion model: `none`
- Semantic purpose: `rbac-access-permissions`

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
