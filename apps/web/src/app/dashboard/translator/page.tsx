import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/shared/badge";
import { translators } from "@/lib/mock-data";
import { requireRole } from "@/lib/server/auth";

interface TranslatorDashboardPageProps {
  searchParams?: Promise<{ applied?: string }>;
}

export default async function TranslatorDashboardPage({
  searchParams,
}: TranslatorDashboardPageProps) {
  const session = await requireRole(["translator"]);
  const params = await searchParams;
  const profile = translators[0];

  return (
    <DashboardShell
      description="Manage profile quality, portfolio, CV permissions, applications, messages, notifications, and billing."
      session={session}
      title="Translator Workspace"
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="panel p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-ink">{profile.name}</h2>
              <p className="mt-2 text-sm text-fog">{profile.headline}</p>
            </div>
            <Badge tone="success">{profile.verificationStatus}</Badge>
          </div>
          <p className="mt-4 text-sm leading-7 text-fog">{profile.bio}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-fog">CV privacy</p>
              <p className="mt-2 text-sm text-ink">
                {profile.cvVisibility.replaceAll("_", " ")}
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-fog">Applications</p>
              <p className="mt-2 text-sm text-ink">
                {params?.applied ? `Applied to ${params.applied}` : "3 active applications"}
              </p>
            </div>
          </div>
        </section>
        <section className="space-y-6">
          <div className="panel p-6">
            <h2 className="text-xl font-semibold text-ink">Messages and notifications</h2>
            <p className="mt-2 text-sm text-fog">
              2 unread conversations, 1 billing reminder, and 1 verification update.
            </p>
          </div>
          <div className="panel p-6">
            <h2 className="text-xl font-semibold text-ink">Portfolio and rates</h2>
            <p className="mt-2 text-sm text-fog">
              Rates: {profile.rates}. Portfolio supports text, links, screenshots, and attachment ids.
            </p>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
