import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { blogPosts } from "@/lib/mock-data";
import { requireRole } from "@/lib/server/auth";

export default async function AdminBlogPage() {
  const session = await requireRole(["admin", "admin_employee"]);

  return (
    <DashboardShell
      description="Admin CRUD surface for blog posts with publishing status, SEO fields, and editorial workflow."
      session={session}
      title="Blog Management"
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="panel p-6">
          <h2 className="text-2xl font-semibold text-ink">Create or edit post</h2>
          <form className="mt-6 grid gap-4">
            <input className="field" placeholder="Title" />
            <input className="field" placeholder="Slug" />
            <input className="field" placeholder="SEO title" />
            <textarea className="field min-h-40" placeholder="Content" />
            <button className="button-primary" type="button">
              Save draft
            </button>
          </form>
        </section>
        <section className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Published posts</h2>
          <div className="mt-4 space-y-3">
            {blogPosts.map((post) => (
              <article className="rounded-3xl bg-white/85 p-4" key={post.slug}>
                <h3 className="font-semibold text-ink">{post.title}</h3>
                <p className="mt-1 text-sm text-fog">{post.publishedAt}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
