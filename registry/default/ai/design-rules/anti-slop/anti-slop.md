# Anti-Slop Rules

Read this before generating or reviewing an interface. Every rule is a
prohibition, so it can be checked mechanically by
`@openui/design-system`'s audit.

1. **Do not centre a hero headline over a three-column feature grid.** This is the
   single most recognisable generated layout. If a hero is centred, the rest of
   the page must not be a symmetric grid.
2. **Do not repeat the same multi-column card grid more than twice per page.**
   Vary composition, not just content.
3. **Do not use a gradient as background decoration.** A gradient must encode
   something: depth, direction, state, data.
4. **Do not give every container the same large radius.** Above 8px, radius is a
   statement — make it once.
5. **Do not use a single neutral grotesk for everything.** Pair a display face
   with a text face, or use weight and width as hierarchy.
6. **Do not separate every region with a shadow.** Elevation implies
   interactivity. Use hairlines for structure.
7. **Do not ship a page with no interaction.** One deliberate pointer, scroll or
   keyboard behaviour is the difference between an interface and a poster.
8. **Do not use more than one spacing step for a single relationship.** Rhythm
   comes from a small scale applied consistently.
9. **Do not let more than two accent colours compete.** One accent, one neutral
   scale, one signal.
10. **Do not animate for decoration.** Every transition should explain hierarchy,
   confirm input or preserve context.
11. **Do not hide content on small screens.** Recompose the layout; never delete
    the argument.

## How to use this file

- **Agents:** include it in context, then self-check the output against each rule
  and state which ones constrained the result.
- **Reviewers:** use it as the acceptance checklist in a pull request.
- **Audits:** run `pnpm audit:ui` (or the Playground's "Audit" tab) and treat
  anything below 70/100 in Originality as a blocker.
