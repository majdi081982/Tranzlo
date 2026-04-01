import { createJobAction } from "@/app/auth/actions";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireRole } from "@/lib/server/auth";

interface CompanyDashboardPageProps {
  searchParams?: Promise<{ created?: string }>;
}

export default async function CompanyDashboardPage({
  searchParams,
}: CompanyDashboardPageProps) {
  const session = await requireRole(["company"]);
  const params = await searchParams;

  return (
    <DashboardShell
      description="Create and manage jobs, review applicants, control communication preferences, and monitor subscription and billing."
      session={session}
      title="Company Workspace"
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="panel p-6">
          <h2 className="text-2xl font-semibold text-ink">Create a job post</h2>
          <p className="mt-2 text-sm text-fog">
            Recent creation: {params?.created ?? "none yet"}.
          </p>
          <form action={createJobAction} className="mt-6 grid gap-4">
            <input className="field" name="title" placeholder="Job title" required />
            <textarea
              className="field min-h-28"
              name="description"
              placeholder="Project brief"
              required
            />
            <div className="grid gap-4 md:grid-cols-2">
              <input className="field" name="sourceLanguage" placeholder="Source language" />
              <input className="field" name="targetLanguage" placeholder="Target language" />
              <input className="field" name="specialization" placeholder="Specialization" />
              <input className="field" name="budget" placeholder="Budget" />
            </div>
            <select className="field" defaultValue="both" name="communicationPreference">
              <option value="platform_chat">Platform chat</option>
              <option value="email_link">Email link</option>
              <option value="both">Both</option>
            </select>
            <button className="button-primary" type="submit">
              Save job post
            </button>
          </form>
        </section>
        <section className="space-y-6">
          <div className="panel p-6">
            <h2 className="text-xl font-semibold text-ink">Applicants</h2>
            <p className="mt-2 text-sm text-fog">
              Review submitted applications, shortlist, reject, or hire.
            </p>
          </div>
          <div className="panel p-6">
            <h2 className="text-xl font-semibold text-ink">Subscription and billing</h2>
            <p className="mt-2 text-sm text-fog">
              Growth plan trial active. Payment webhook updates are handled through n8n and Appwrite.
            </p>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
