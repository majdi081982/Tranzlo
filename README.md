# Tranzlo MVP

Production-oriented MVP scaffold for `tranzlo.net`, a translation marketplace for translators, companies, and admins.

## Stack

- Next.js App Router with TypeScript and Tailwind CSS
- Self-hosted Appwrite for auth, database, storage, teams, and functions
- Self-hosted n8n for automation workflows
- Docker Compose and Nginx for Ubuntu 24 VPS deployment

## Monorepo

```text
apps/
  web/        Next.js application
  functions/  Sample Appwrite Functions
automation/
  n8n/        Workflow skeletons and webhook contracts
docs/
  architecture, schema, permissions, deployment, and ops docs
infra/
  nginx/      Reverse proxy config
packages/
  config/     Shared workspace config placeholders
  ui/         Shared component package placeholder
scripts/      Deploy and bootstrap scripts
```

## Quick Start

1. Copy [`.env.example`](/C:/Users/molo/Documents/Tranzlo/.env.example) to `.env`.
2. Copy [`apps/web/.env.example`](/C:/Users/molo/Documents/Tranzlo/apps/web/.env.example) to `apps/web/.env.local`.
3. Install dependencies from the repo root with `npm install`.
4. Start local development with `npm run dev`.

## Docs

- [Project plan](/C:/Users/molo/Documents/Tranzlo/docs/project-plan.md)
- [Architecture](/C:/Users/molo/Documents/Tranzlo/docs/architecture.md)
- [Database schema](/C:/Users/molo/Documents/Tranzlo/docs/database-schema.md)
- [Permissions model](/C:/Users/molo/Documents/Tranzlo/docs/permissions-model.md)
- [Deployment guide](/C:/Users/molo/Documents/Tranzlo/docs/deployment-guide-ubuntu24.md)
- [DNS checklist](/C:/Users/molo/Documents/Tranzlo/docs/dns-checklist.md)
- [Firewall checklist](/C:/Users/molo/Documents/Tranzlo/docs/firewall-checklist.md)
- [MVP milestone plan](/C:/Users/molo/Documents/Tranzlo/docs/mvp-milestone-plan.md)

## Assumptions

- Billing integration is prepared through webhook contracts and subscription state handling, with Stripe named as the default provider.
- Appwrite is the source of truth for authentication, authorization, storage, and marketplace data.
- n8n owns asynchronous notifications and lifecycle automations.
- Real-time chat can be layered on Appwrite Realtime or a dedicated websocket service in a later iteration; the MVP models conversation state now.
