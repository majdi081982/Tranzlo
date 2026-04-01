import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/shared/badge";
import { requireRole } from "@/lib/server/auth";

export default async function AdminDashboardPage() {
  const session = await requireRole(["admin", "admin_employee"]);

  return (
    <DashboardShell
      description="Practical admin operations surface for people, verification, disputes, subscriptions, moderation, analytics, and audit visibility."
      session={session}
      title="Admin Operations"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Verification center</h2>
          <p className="mt-2 text-sm text-fog">
            12 pending translator reviews and 3 company verification requests.
          </p>
        </div>
        <div className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Dispute center</h2>
          <p className="mt-2 text-sm text-fog">
            2 escalated disputes with SLA breach risk within 24 hours.
          </p>
        </div>
        <div className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Employees and moderators</h2>
          <p className="mt-2 text-sm text-fog">
            Manage invitations, scopes, and assignment queues for admin staff.
          </p>
        </div>
        <div className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Content moderation</h2>
          <p className="mt-2 text-sm text-fog">
            Community and blog review with reversible moderation states.
          </p>
        </div>
        <div className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Subscription management</h2>
          <p className="mt-2 text-sm text-fog">
            Trial conversions, payment status, and past-due handling.
          </p>
        </div>
        <div className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Audit logs</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="warning">verification.approved</Badge>
            <Badge>dispute.escalated</Badge>
            <Badge>community.post.removed</Badge>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
