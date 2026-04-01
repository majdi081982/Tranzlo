import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/shared/badge";
import { requireSession } from "@/lib/server/auth";

const conversations = [
  {
    id: "conv-1",
    title: "LexBridge legal brief",
    counterpart: "Sarah Kim",
    preview: "We can share the annex glossary in the thread.",
    unread: true,
  },
  {
    id: "conv-2",
    title: "Northpeak onboarding kit",
    counterpart: "Marco Varela",
    preview: "Estimated delivery is Friday 17:00 UTC.",
    unread: false,
  },
];

export default async function MessagesPage() {
  const session = await requireSession();

  return (
    <DashboardShell
      description="One-to-one messaging between translators and companies with conversation list, read states, and notification-ready hooks."
      session={session}
      title="Messages"
    >
      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <section className="panel p-4">
          <h2 className="px-2 py-3 text-lg font-semibold text-ink">Conversations</h2>
          <div className="space-y-3">
            {conversations.map((conversation) => (
              <article className="rounded-3xl bg-white/80 p-4" key={conversation.id}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-ink">{conversation.title}</h3>
                    <p className="text-sm text-fog">{conversation.counterpart}</p>
                  </div>
                  {conversation.unread ? <Badge tone="success">Unread</Badge> : null}
                </div>
                <p className="mt-2 text-sm text-fog">{conversation.preview}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Current thread</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-muted p-4 text-sm text-ink">
              Can you confirm whether the CAT package includes locked segments?
            </div>
            <div className="rounded-3xl bg-white p-4 text-sm text-ink">
              Yes, and we have also attached the terminology list for review.
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
