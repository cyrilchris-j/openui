# Incident Postmortem Report

An operational incident debrief card summarizing root cause analysis, timeline, and mitigation actions.

## Install

```bash
openui add incident-postmortem-report
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `incident-postmortem-review`
- Visual model: `structured-postmortem-dossier`
- Motion model: `none`
- Semantic purpose: `incident-resolution-postmortem`

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
