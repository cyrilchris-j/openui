# Database Backup Restore Panel

A database snapshot management block with manual snapshot trigger, backup size logs, and point-in-time recovery.

## Install

```bash
openui add database-backup-restore-panel
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `database`
- Interaction model: `database-snapshot-creation-and-restore`
- Visual model: `backup-recovery-management-card`
- Motion model: `none`
- Semantic purpose: `database-backup-recovery`

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
