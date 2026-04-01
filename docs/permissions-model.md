# Tranzlo Permissions Model

## Role Groups

- `translator`
- `company`
- `admin`
- `admin_employee`

## Appwrite Strategy

- Use Appwrite Auth for identity.
- Use Appwrite Teams to map coarse roles:
  - `team:translators`
  - `team:companies`
  - `team:admins`
  - `team:admin-employees`
- Add per-document permissions for owner-scoped records.
- Use Appwrite Functions or server-side API keys for privileged writes that should never originate directly from the client.

## Access Rules

### Translators

- Can read:
  - published jobs
  - public translator profiles
  - published blog posts
  - public community content
  - their own private profile, applications, conversations, notifications, subscription, and payments
- Can write:
  - their translator profile
  - their own job applications
  - messages inside conversations they participate in
  - community posts and comments they author

### Companies

- Can read:
  - public translator profiles
  - their own company profile, jobs, applicants, conversations, notifications, subscription, and payments
- Can write:
  - company profile documents they own
  - jobs created under their company
  - application review state for jobs they own
  - messages inside conversations they participate in

### Admins

- Full access to admin dashboards, moderation queues, audit logs, disputes, subscriptions, verification flows, and employee management.
- Prefer API-key-backed server actions or Appwrite Functions for these operations instead of exposing broad client permissions.

### Admin employees

- Can access only delegated admin tools.
- Recommended scopes:
  - moderation
  - verification
  - support and disputes
- Store scope claims in the `users` document or team memberships and enforce in Next.js server-side guards.

## File Upload Security

- Separate buckets by asset type.
- Restrict file types and max sizes per bucket.
- Generate signed previews or downloads for private CVs and attachments.
- Never expose raw bucket ids and file ids without server-side authorization checks for private files.

## Route Protection

- Middleware blocks dashboard routes for unauthenticated visitors.
- Server components must re-check access before rendering sensitive data.
- Server actions verify session, role, and ownership before mutating records.

## Recommended Ownership Patterns

- Translator profile: read/write by owner, read by any for public fields only if `isPublic=true`.
- Company profile: read public company fields by any; full detail by company members and admins.
- Job documents: public read when published; write only by owning company or admins.
- Applications: read by applicant, owning company, and admins.
- Messages and conversations: read/write only by participants and admins where necessary.
