# Te Lo Resuelvo — Monorepo

This repository contains three Next.js applications deployed as separate Vercel projects.

## Structure

```
apps/
  flex/          → Checkout app (flex.teloresuelvo.it)
  farmaqueens/   → Checkout app (flex.farmaqueens.com)
  landing/       → Marketing landing page (teloresuelvo.it)
```

## Setup

Each app is independent. To work on one:

```bash
cd apps/flex      # or apps/farmaqueens or apps/landing
npm install
npm run dev
```

## Vercel Deployment

Each app is a separate Vercel project pointing to this repo with a different **Root Directory**:

| Vercel Project | Root Directory     | Domain                 |
|----------------|--------------------|------------------------|
| Flex           | `apps/flex`        | `flex.teloresuelvo.it` |
| FarmaQueens    | `apps/farmaqueens` | `flex.farmaqueens.com` |
| Landing        | `apps/landing`     | `teloresuelvo.it`      |

## Environment Variables

**Flex & FarmaQueens** require:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_WEBHOOK_SECRET`

**Landing** requires:
- `NEXT_PUBLIC_SITE_URL`
