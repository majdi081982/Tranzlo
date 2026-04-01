# Tranzlo Project Plan

## Goal

Ship a realistic MVP for `tranzlo.net` that supports marketplace discovery, onboarding, job posting, job applications, community content, admin operations, and automation workflows.

## Delivery Strategy

1. Establish the monorepo, environment contracts, and deployment path.
2. Build public acquisition flows:
   - homepage
   - pricing
   - signup, login, onboarding
   - blog and community discovery
3. Build marketplace operations:
   - translator profile management
   - company job posting and applicant review
   - searchable jobs marketplace
   - conversation and notification foundation
4. Build admin operations:
   - moderation and verification queues
   - subscription oversight
   - dispute management
   - audit visibility
5. Add automation and webhook integration points with n8n.
6. Harden deployment and security controls.

## Suggested Folder Tree

```text
Tranzlo/
  apps/
    functions/
      job-alert-matcher/
      subscription-sync/
    web/
      public/
      src/
        app/
        components/
        lib/
  automation/
    n8n/
  docs/
  infra/
    nginx/
      conf.d/
  packages/
    config/
    ui/
  scripts/
  .github/
    workflows/
```

## Assumptions

- The MVP uses a single Next.js frontend application for marketing and application surfaces.
- Admin accounts are seeded via Appwrite Console, Appwrite CLI, or a secure bootstrap function instead of public signup.
- Payment checkout is exposed as a server-side integration boundary. Actual provider checkout session creation is intentionally isolated behind server actions and webhook handlers.
- Community and blog moderation are routed through admin dashboards rather than separate back-office apps.
