# CRM Customer Contact Card

A customer relationship management overview featuring deal pipeline status, company info, and call log notes.

## Install

```bash
openui add crm-customer-contact-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `crm`
- Interaction model: `deal-pipeline-stage-selection`
- Visual model: `customer-dossier-card`
- Motion model: `subtle`
- Semantic purpose: `crm-contact-record`

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
