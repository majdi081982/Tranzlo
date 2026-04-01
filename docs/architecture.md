# Tranzlo Architecture

## Overview

Tranzlo is structured as a monorepo with one primary user-facing application and supporting operational assets.

- `apps/web`: Next.js App Router application for marketing, dashboards, marketplace browsing, admin operations, and webhook endpoints.
- `apps/functions`: Appwrite Functions for privileged workflows that should not run in the browser.
- `automation/n8n`: n8n workflow skeletons and webhook payload definitions.
- `infra/nginx`: Nginx reverse proxy config for public routing and TLS termination.

## Runtime Architecture

### Web tier

- Nginx terminates TLS and routes:
  - `tranzlo.net` and `www.tranzlo.net` to Next.js
  - `appwrite.tranzlo.net` to Appwrite
  - `n8n.tranzlo.net` to n8n
- Next.js runs in standalone mode in Docker.

### Data and identity tier

- Appwrite handles:
  - email/password auth
  - OAuth providers
  - teams and roles
  - document database
  - object storage
  - function execution
- User-facing pages should use server-side reads when possible and isolate privileged operations in server actions or Appwrite Functions.

### Automation tier

- n8n receives internal webhook triggers from Next.js or Appwrite Functions.
- n8n handles:
  - lifecycle reminders
  - matching notifications
  - operational escalation
  - AI trigger orchestration

## Request Flow Examples

### Plan selection

1. Guest clicks a pricing plan CTA.
2. App redirects to `/auth/signup?plan=pro`.
3. After signup and onboarding completion, the selected plan is written to `subscriptions` with `status=trialing`.
4. Trial window defaults to 14 days from activation.
5. If the user is already authenticated, the CTA points to a server-side billing flow instead.

### Job application

1. Company creates a job post.
2. Job is stored in Appwrite with normalized filter fields.
3. n8n receives a job-created webhook to notify matching translators.
4. Translator applies through a server action.
5. Application creates or links a conversation if platform chat is enabled.

### Admin verification

1. Translator uploads identity and certification artifacts.
2. Verification request is stored under `verifications`.
3. Admin employees can review only assigned or broadly permitted cases.
4. Approval updates `translator_profiles.verificationStatus` and emits an audit log.

## Scalability Notes

- Search fields should be denormalized for Appwrite querying efficiency.
- Chat lists should store `lastMessageAt`, `lastMessagePreview`, and participant ids on the conversation document.
- Notifications should be fan-out friendly and consumable by both in-app feeds and n8n workflows.
- Heavier AI and file-analysis jobs should be offloaded to n8n and dedicated worker services later, not the web container.
