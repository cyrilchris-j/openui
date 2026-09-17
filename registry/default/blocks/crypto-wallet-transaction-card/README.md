# Crypto Wallet Transaction Card

A web3 payment card showing wallet balance, network confirmation status, and transaction hash link.

## Install

```bash
openui add crypto-wallet-transaction-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `finance`
- Interaction model: `wallet-transfer-confirmation`
- Visual model: `crypto-balance-payment-card`
- Motion model: `subtle`
- Semantic purpose: `crypto-wallet-transfers`

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
