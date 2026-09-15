# Skill: Audit UI

A structured design-quality report for an existing interface.

## Install

```bash
openui add audit-ui
```

Written to `.openui/audit-ui.md`.

## Output shape

Six category scores, an overall score, the findings behind each number, and five
ranked remediation steps. The same report shape is produced by
`@openui/design-system`'s `runAudit` and rendered in the Playground's Audit tab,
so an agent's verdict and the tool's verdict can be compared directly.
