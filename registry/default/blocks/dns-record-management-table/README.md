# DNS Record Management Table

A domain routing table managing A, CNAME, and TXT records with TTL durations and verification checks.

## Install

```bash
openui add dns-record-management-table
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `dns-record-row-management`
- Visual model: `domain-nameserver-table`
- Motion model: `none`
- Semantic purpose: `dns-configuration-console`

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
