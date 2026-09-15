# Skill: Audit UI

Score an interface against the design rules and return a report, not an opinion.

## Inputs

- a page, route or component tree
- `anti-slop.md` and the project's `design.md`
- optional: the structure description accepted by `@openui/design-system`

## Procedure

1. **Describe the structure** in the audit's shape: sections (role, columns,
   alignment), typography (families, weights, sizes, heading levels), surface
   (radii, gradients, shadows, colour pairs), motion (durations, easings,
   reduced-motion coverage), interactions, spacing.
2. **Run the engine** (`runAudit`) if available; otherwise score by hand against
   the same checks and say that you did.
3. **Report per category:** Structure, Typography, Motion, Composition,
   Originality, Accessibility — each 0–100, each with the findings that produced
   it.
4. **Report the overall score** and the five highest-impact changes, ranked by
   score improvement per unit of work.
5. **Never** report a score without the evidence that produced it.

## Output format

```text
AI UI AUDIT

Structure        72/100
Typography       81/100
Motion           54/100
Composition      66/100
Originality      48/100
Accessibility    63/100
Overall          64/100

Potential issues:
- Generic centred hero with a three-column grid beneath it
- 80% of containers use a radius of 12px or more
- No interaction beyond default hover states
- Animated elements are not guarded by prefers-reduced-motion

Highest-impact changes:
1. Recompose the hero as a 7/5 asymmetric split (+14 originality)
2. Reduce radii to 0–2px and separate with hairlines (+9 composition)
3. Add one scroll-linked reveal and one pointer interaction (+11 motion)
4. Guard animations behind prefers-reduced-motion (+8 accessibility)
5. Widen the type scale to a 6× display-to-body ratio (+6 typography)
```

## Rules

- A score is a claim about evidence. Cite the finding behind every number.
- Do not audit aesthetics you cannot measure — say "not assessed" instead.
- Never suggest a change that breaks an accessibility requirement.
