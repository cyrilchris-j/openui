# Compliance Tamper-Proof Ledger

A cryptographic Merkle tree audit log displaying chained block hashes and automated immutability verification.

## Install

```bash
openui add compliance-tamper-proof-ledger
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `compliance`
- Interaction model: `merkle-hash-chain-verification`
- Visual model: `cryptographic-ledger-block-view`
- Motion model: `none`
- Semantic purpose: `immutable-audit-ledger`

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
