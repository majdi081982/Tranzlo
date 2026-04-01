export type UserRole = "translator" | "company" | "admin" | "admin_employee";
export type PlanSlug = "starter" | "growth" | "enterprise";

export interface Plan {
  slug: PlanSlug;
  name: string;
  price: string;
  audience: string;
  description: string;
  features: string[];
}

export interface TranslatorProfile {
  slug: string;
  name: string;
  headline: string;
  bio: string;
  languagePairs: string[];
  specialties: string[];
  rates: string;
  experienceYears: number;
  certifications: string[];
  verificationStatus: "pending" | "verified" | "unverified";
  cvVisibility: "view_only" | "downloadable";
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  sourceLanguage: string;
  targetLanguage: string;
  specialization: string;
  budget: string;
  budgetRange: [number, number];
  workMode: "remote" | "onsite" | "hybrid";
  country: string;
  deadlineLabel: string;
  experienceLevel: "junior" | "mid" | "senior" | "expert";
  catTools: string[];
  verifiedOnly: boolean;
  communicationPreference: "platform_chat" | "email_link" | "both";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedAt: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  role: UserRole;
  content: string;
  comments: Array<{ id: string; author: string; content: string }>;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  selectedPlan?: PlanSlug;
}
