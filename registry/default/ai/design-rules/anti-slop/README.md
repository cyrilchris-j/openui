# Anti-Slop Rules

A negative ruleset: eleven prohibitions that catch the recognisable generated-UI
look before it ships.

## Install

```bash
openui add anti-slop
```

The file is written to `.openui/anti-slop.md`. Point your agent at it, or paste
it into a system prompt for design review.

## Why prohibitions

Positive rules ("use good typography") cannot be checked. Each rule here maps to
a scoring check in `@openui/design-system`, so an agent or a reviewer can verify
compliance instead of arguing about taste.

## Related

- `editorial-rules` — the positive counterpart for editorial work.
- `audit-ui` — the skill that scores an interface against these rules.
