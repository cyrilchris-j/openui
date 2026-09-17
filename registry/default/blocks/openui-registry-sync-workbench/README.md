# OpenUI Registry Sync Workbench

An air-gapped private registry synchronizer checking upstream catalog parity and security advisories.

## Install

```bash
openui add openui-registry-sync-workbench
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `registry-sync-audit-execution`
- Visual model: `airgapped-mirror-synchronizer`
- Motion model: `subtle`
- Semantic purpose: `private-registry-synchronization`

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
