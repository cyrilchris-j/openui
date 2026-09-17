# Employee Onboarding Progress Tray

An HR and IT provisioning tracker managing laptop shipping, GitHub team access, and SSO credentialing.

## Install

```bash
openui add employee-onboarding-progress-tray
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `team`
- Interaction model: `employee-provisioning-checklist`
- Visual model: `it-onboarding-status-tray`
- Motion model: `subtle`
- Semantic purpose: `employee-provisioning-tracking`

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
