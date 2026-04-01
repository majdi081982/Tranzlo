import type { Plan } from "@/lib/types";

export const APP_NAME = "Tranzlo";
export const TRIAL_DAYS = 14;

export const PLAN_CONFIG: Plan[] = [
  {
    slug: "starter",
    name: "Starter",
    price: "$29/mo",
    audience: "Freelance translators",
    description: "Professional profile, applications, messaging, and billing.",
    features: [
      "Public translator profile",
      "CV privacy controls",
      "Job applications and inbox",
      "Community access",
    ],
  },
  {
    slug: "growth",
    name: "Growth",
    price: "$99/mo",
    audience: "Growing language companies",
    description:
      "Job postings, applicant management, platform chat, and automation hooks.",
    features: [
      "Unlimited active job posts",
      "Applicant review board",
      "Platform chat and email link options",
      "Subscription and billing center",
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    price: "Custom",
    audience: "Operations-heavy teams",
    description:
      "Advanced admin workflows, moderation coverage, and custom automation support.",
    features: [
      "Admin employee seats",
      "Verification and dispute center",
      "Audit logs and analytics",
      "n8n and AI trigger integrations",
    ],
  },
];
