# Skill: Compose Page

Turn a brief into a composition plan. **Plan before code.** A page assembled from
registry resources with a stated structure outperforms one improvised into JSX.

## Inputs

- the brief (what the page is for, who reads it)
- the installed design system (`design.md` + tokens)
- the registry index (`GET /r/registry.json`)

## Procedure

1. **Choose the design system.** If none is installed, propose one and state why
   it fits the brief. Never proceed without a DNA.
2. **Choose the macrostructure** from the DNA (asymmetric, mosaic, rail, …).
   State the ratio for any split.
3. **Draft the band list.** Six to nine bands, one idea each. For every band
   write: purpose, resources to use, and composition.
4. **Assign resources by name from the index.** Prefer resources whose `dna`
   matches the system. List registry dependencies the install will pull in.
5. **Check the plan against `anti-slop`.** For each rule, confirm the plan does
   not break it. If it does, change the plan, not the rule.
6. **State the plan** as a table before writing any component code.
7. **Generate the code** band by band, using the resources' real props.
8. **Report** the fingerprint score for the plan and the audit score after
   implementation.

## Output format

```text
Design system: swiss-editorial (editorial · asymmetric · sharp)
Macrostructure: asymmetric 7/5
Bands: 7
  01  masthead          editorial-navigation    full-bleed
  02  hero              asymmetric-hero         7/5 split, rail right
  03  index rail        marquee-index           full-bleed, hairline
  ...
Resources: asymmetric-hero, marquee-index, ledger-table, editorial-heading
Registry deps pulled in: cn, editorial-heading
Anti-slop check: rules 1, 2, 6, 10 constrained the plan
```

## Rules

- Never invent a resource name. If the index does not have it, propose adding it.
- Never use more than two resource types per band.
- Ask before downloading or installing anything.
