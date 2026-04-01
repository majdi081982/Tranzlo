# Appwrite Data Model

## Database

- Database id: `tranzlo`

## Collections

### `users`

- `userId`: string, required, unique
- `email`: string, required, unique
- `name`: string, required
- `role`: enum `translator | company | admin | admin_employee`
- `status`: enum `active | suspended | invited`
- `plan`: enum `starter | growth | enterprise`
- `trialEndsAt`: datetime
- `companyId`: string, nullable
- `profileCompleted`: boolean
- `country`: string
- `avatarFileId`: string, nullable
- `lastSeenAt`: datetime

### `translator_profiles`

- `userId`: string, required, unique
- `slug`: string, required, unique
- `headline`: string
- `bio`: string
- `sourceLanguages`: string[]
- `targetLanguages`: string[]
- `languagePairs`: string[]
- `specialties`: string[]
- `rates`: string
- `experienceYears`: integer
- `certifications`: string[]
- `catTools`: string[]
- `country`: string
- `verificationStatus`: enum `unverified | pending | verified | rejected`
- `cvFileId`: string, nullable
- `cvVisibility`: enum `view_only | downloadable | hidden`
- `portfolioItems`: json
- `isPublic`: boolean

### `company_profiles`

- `ownerUserId`: string, required
- `companyId`: string, required, unique
- `slug`: string, required, unique
- `name`: string, required
- `tagline`: string
- `description`: string
- `website`: string
- `country`: string
- `sizeBand`: string
- `logoFileId`: string, nullable
- `verified`: boolean

### `jobs`

- `companyId`: string, required
- `createdByUserId`: string, required
- `title`: string, required
- `description`: string, required
- `sourceLanguage`: string, required
- `targetLanguage`: string, required
- `specialization`: string, required
- `budgetMin`: integer
- `budgetMax`: integer
- `budgetCurrency`: string
- `deadlineAt`: datetime
- `workMode`: enum `remote | onsite | hybrid`
- `country`: string
- `city`: string
- `experienceLevel`: enum `junior | mid | senior | expert`
- `catTools`: string[]
- `verifiedOnly`: boolean
- `communicationPreference`: enum `platform_chat | email_link | both`
- `status`: enum `draft | published | closed | archived`
- `attachmentFileIds`: string[]

### `job_applications`

- `jobId`: string, required
- `translatorUserId`: string, required
- `companyId`: string, required
- `coverLetter`: string
- `quotedRate`: string
- `estimatedDelivery`: datetime
- `status`: enum `submitted | shortlisted | rejected | hired | withdrawn`
- `conversationId`: string, nullable

### `conversations`

- `participantIds`: string[], required
- `participantRoles`: string[]
- `jobId`: string, nullable
- `companyId`: string, nullable
- `lastMessageAt`: datetime
- `lastMessagePreview`: string
- `unreadBy`: string[]
- `status`: enum `open | archived | blocked`

### `messages`

- `conversationId`: string, required
- `senderUserId`: string, required
- `recipientUserId`: string, required
- `body`: string
- `attachmentFileIds`: string[]
- `readAt`: datetime, nullable
- `createdAt`: datetime

### `subscriptions`

- `userId`: string, required
- `accountRole`: enum `translator | company`
- `plan`: enum `starter | growth | enterprise`
- `status`: enum `trialing | active | past_due | canceled | expired`
- `trialStartsAt`: datetime
- `trialEndsAt`: datetime
- `currentPeriodStart`: datetime
- `currentPeriodEnd`: datetime
- `paymentCustomerId`: string
- `paymentSubscriptionId`: string

### `payments`

- `userId`: string, required
- `subscriptionId`: string
- `provider`: string
- `providerPaymentId`: string
- `amount`: integer
- `currency`: string
- `status`: enum `pending | succeeded | failed | refunded`
- `payload`: json

### `verifications`

- `subjectUserId`: string, required
- `reviewerUserId`: string, nullable
- `type`: enum `identity | qualification | company`
- `status`: enum `submitted | in_review | approved | rejected`
- `notes`: string
- `evidenceFileIds`: string[]

### `disputes`

- `openedByUserId`: string, required
- `assignedToUserId`: string, nullable
- `jobId`: string, nullable
- `conversationId`: string, nullable
- `status`: enum `open | investigating | resolved | escalated`
- `priority`: enum `low | medium | high | urgent`
- `summary`: string
- `resolution`: string

### `blog_posts`

- `title`: string, required
- `slug`: string, required, unique
- `excerpt`: string
- `content`: string
- `coverImageFileId`: string
- `authorUserId`: string
- `status`: enum `draft | published | archived`
- `publishedAt`: datetime
- `seoTitle`: string
- `seoDescription`: string

### `community_posts`

- `authorUserId`: string, required
- `content`: string, required
- `attachmentFileIds`: string[]
- `visibility`: enum `public | members`
- `status`: enum `active | flagged | removed`
- `commentCount`: integer

### `community_comments`

- `postId`: string, required
- `authorUserId`: string, required
- `content`: string, required
- `status`: enum `active | flagged | removed`

### `notifications`

- `userId`: string, required
- `type`: string, required
- `title`: string
- `body`: string
- `actionUrl`: string
- `readAt`: datetime, nullable
- `metadata`: json

### `audit_logs`

- `actorUserId`: string
- `actorRole`: string
- `action`: string, required
- `entityType`: string, required
- `entityId`: string, required
- `summary`: string
- `metadata`: json
- `createdAt`: datetime

## Suggested Indexes

- `jobs`: source language, target language, specialization, status, country, deadline, verified only
- `translator_profiles`: slug, verification status, specialties, country, language pairs
- `job_applications`: job id plus status, translator id plus status
- `conversations`: participant ids, last message at
- `notifications`: user id plus readAt
