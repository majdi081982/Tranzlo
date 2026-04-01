import { publishCommunityPostAction } from "@/app/auth/actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/shared/badge";
import { communityPosts } from "@/lib/mock-data";

export default function CommunityPage() {
  return (
    <div className="pb-16">
      <SiteHeader />
      <main className="shell space-y-6 py-8">
        <section className="panel p-8">
          <span className="eyebrow">Community</span>
          <h1 className="mt-4 text-4xl font-semibold text-ink">
            Peer discussion with basic moderation hooks
          </h1>
          <form action={publishCommunityPostAction} className="mt-6 space-y-4">
            <textarea
              className="field min-h-28"
              name="content"
              placeholder="Share a question, update, or discussion prompt"
              required
            />
            <button className="button-primary" type="submit">
              Publish post
            </button>
          </form>
        </section>
        <section className="space-y-4">
          {communityPosts.map((post) => (
            <article className="panel p-6" key={post.id}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-ink">{post.author}</h2>
                  <p className="text-sm capitalize text-fog">{post.role}</p>
                </div>
                <Badge>{post.comments.length} comments</Badge>
              </div>
              <p className="mt-4 text-sm leading-7 text-fog">{post.content}</p>
              <div className="mt-5 space-y-3 rounded-3xl bg-white/85 p-4">
                {post.comments.map((comment) => (
                  <div key={comment.id}>
                    <p className="text-sm font-semibold text-ink">{comment.author}</p>
                    <p className="mt-1 text-sm text-fog">{comment.content}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
