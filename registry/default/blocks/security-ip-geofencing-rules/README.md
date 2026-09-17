# Security IP Geofencing Rules

A country-based edge geofencing rule controller allowing developers to allow or block inbound CIDR traffic.

## Install

```bash
openui add security-ip-geofencing-rules
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `security`
- Interaction model: `geofence-country-rule-toggle`
- Visual model: `geofence-policy-table`
- Motion model: `none`
- Semantic purpose: `ip-geofence-firewall`

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
