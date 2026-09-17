# Device Session Manager

A security authentication sessions console showing active browsers, IP geolocations, and remote termination.

## Install

```bash
openui add device-session-manager
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `security`
- Interaction model: `session-revocation-controls`
- Visual model: `connected-device-roster`
- Motion model: `subtle`
- Semantic purpose: `user-session-security`

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
