import { PLAN_CONFIG } from "@/lib/constants";
import type { BlogPost, CommunityPost, Job, TranslatorProfile } from "@/lib/types";

export const plans = PLAN_CONFIG;

export const translators: TranslatorProfile[] = [
  {
    slug: "lina-haddad",
    name: "Lina Haddad",
    headline: "Legal Arabic <> English translator",
    bio: "Specialized in contracts, arbitration files, and compliance-ready document workflows.",
    languagePairs: ["Arabic > English", "English > Arabic"],
    specialties: ["Legal", "Compliance", "Corporate"],
    rates: "$0.14 per word",
    experienceYears: 11,
    certifications: ["ATA member", "CIOL Diploma"],
    verificationStatus: "verified",
    cvVisibility: "view_only",
  },
  {
    slug: "marco-varela",
    name: "Marco Varela",
    headline: "Medical Spanish <> English linguist",
    bio: "Handles trial protocols, informed consent materials, and patient communications.",
    languagePairs: ["Spanish > English", "English > Spanish"],
    specialties: ["Medical", "Life Sciences", "Clinical Trials"],
    rates: "$0.18 per word",
    experienceYears: 8,
    certifications: ["ISO 17100 reviewer"],
    verificationStatus: "verified",
    cvVisibility: "downloadable",
  },
];

export const featuredJobs: Job[] = [
  {
    id: "job-legal-001",
    title: "Translate SaaS MSA from English to Arabic",
    company: "LexBridge",
    description:
      "Need a legal specialist for a recurring master services agreement and annexes.",
    sourceLanguage: "English",
    targetLanguage: "Arabic",
    specialization: "Legal",
    budget: "$900 - $1,400",
    budgetRange: [900, 1400],
    workMode: "remote",
    country: "UAE",
    deadlineLabel: "Due in 5 days",
    experienceLevel: "senior",
    catTools: ["Trados", "memoQ"],
    verifiedOnly: true,
    communicationPreference: "both",
  },
  {
    id: "job-medical-014",
    title: "Patient onboarding kit EN > ES",
    company: "Northpeak Health",
    description:
      "Translate onboarding documents and product safety inserts for LATAM rollout.",
    sourceLanguage: "English",
    targetLanguage: "Spanish",
    specialization: "Medical",
    budget: "$1,200 - $1,700",
    budgetRange: [1200, 1700],
    workMode: "hybrid",
    country: "United States",
    deadlineLabel: "Due in 8 days",
    experienceLevel: "mid",
    catTools: ["Phrase", "Xbench"],
    verifiedOnly: false,
    communicationPreference: "platform_chat",
  },
  {
    id: "job-game-022",
    title: "Game UI localization QA JP <> EN",
    company: "PlayForge",
    description:
      "Review localized strings and terminology consistency for a liveops launch.",
    sourceLanguage: "Japanese",
    targetLanguage: "English",
    specialization: "Gaming",
    budget: "$650 - $900",
    budgetRange: [650, 900],
    workMode: "remote",
    country: "Japan",
    deadlineLabel: "Due in 3 days",
    experienceLevel: "expert",
    catTools: ["Crowdin", "Xbench"],
    verifiedOnly: true,
    communicationPreference: "email_link",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-build-a-high-converting-translator-profile",
    title: "How to build a high-converting translator profile",
    excerpt: "Practical profile elements that help linguists win better-fit work.",
    content: [
      "A strong profile starts with a specific headline, not a generic job title.",
      "Language pairs and domain expertise should appear above the fold.",
      "Clients respond faster when rates, tools, and verification status are clear.",
    ],
    publishedAt: "2026-03-22",
  },
  {
    slug: "operating-a-lean-language-vendor-team",
    title: "Operating a lean language vendor team",
    excerpt: "How companies can manage briefs, applicants, and delivery risk.",
    content: [
      "Standardize job briefs around language pair, specialization, deadline, and communication preference.",
      "Give vendors a clear review state so they know whether they are shortlisted or closed out.",
    ],
    publishedAt: "2026-03-17",
  },
];

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "Lina Haddad",
    role: "translator",
    content:
      "What is your preferred way to price multi-jurisdiction contract review when terminology alignment is included?",
    comments: [
      {
        id: "comment-1",
        author: "Adam Cho",
        content: "I separate glossary prep from translation so the scope stays clear.",
      },
    ],
  },
  {
    id: "post-2",
    author: "Northpeak Health",
    role: "company",
    content:
      "We are refining our briefs for regulatory translations. Which details save you the most back-and-forth?",
    comments: [
      {
        id: "comment-2",
        author: "Marco Varela",
        content: "Intended audience, target market, and available reference material help the most.",
      },
    ],
  },
];
