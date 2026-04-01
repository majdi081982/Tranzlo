import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/shared/badge";
import { requireSession } from "@/lib/server/auth";

interface DashboardPageProps {
  searchParams?: Promise<{ trial?: string; trialDays?: string; plan?: string; checkout?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const session = await requireSession();
  const params = await searchParams;

  return (
    <DashboardShell
      description="Role-aware overview with quick access to jobs, profiles, messaging, notifications, subscription, and moderation surfaces."
      session={session}
      title="Dashboard"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="panel p-5">
          <p className="text-sm text-fog">Current role</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{session.role}</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-fog">Selected plan</p>
          <p className="mt-2 text-2xl font-semibold text-ink">
            {params?.plan ?? session.selectedPlan ?? "starter"}
          </p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-fog">Trial status</p>
          <p className="mt-2 text-2xl font-semibold text-ink">
            {params?.trial === "active" ? `${params.trialDays} days active` : "Ready"}
          </p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-fog">Checkout intent</p>
          <p className="mt-2 text-2xl font-semibold text-ink">
            {params?.checkout ?? "none"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Translator</h2>
          <p className="mt-2 text-sm leading-7 text-fog">
            Public profile, CV privacy, portfolio, applications, messages,
            notifications, and billing.
          </p>
          <Link className="button-secondary mt-6" href="/dashboard/translator">
            Open translator dashboard
          </Link>
        </div>
        <div className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Company</h2>
          <p className="mt-2 text-sm leading-7 text-fog">
            Company profile, jobs, applicants, communication preferences,
            subscription, and billing.
          </p>
          <Link className="button-secondary mt-6" href="/dashboard/company">
            Open company dashboard
          </Link>
        </div>
        <div className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Admin</h2>
          <p className="mt-2 text-sm leading-7 text-fog">
            Verification, disputes, moderation, employees, subscriptions,
            analytics, and audit logs.
          </p>
          <Link className="button-secondary mt-6" href="/dashboard/admin">
            Open admin dashboard
          </Link>
        </div>
      </div>

      <div className="panel p-6">
        <div className="flex flex-wrap gap-2">
          <Badge tone="success">Route protection enabled</Badge>
          <Badge>Server-side patterns</Badge>
          <Badge>Appwrite-ready auth utilities</Badge>
          <Badge>n8n webhook integration points</Badge>
        </div>
      </div>
    </DashboardShell>
  );
}
