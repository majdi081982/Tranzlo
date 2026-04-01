import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { blogPosts } from "@/lib/mock-data";

export default function BlogPage() {
  return (
    <div className="pb-16">
      <SiteHeader />
      <main className="shell py-8">
        <section className="panel p-8">
          <span className="eyebrow">Blog</span>
          <h1 className="mt-4 text-4xl font-semibold text-ink">
            Publishing for translators, companies, and ops teams
          </h1>
          <div className="mt-6 grid gap-4">
            {blogPosts.map((post) => (
              <Link className="rounded-3xl bg-white/85 p-5" href={`/blog/${post.slug}`} key={post.slug}>
                <p className="text-sm text-fog">{post.publishedAt}</p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">{post.title}</h2>
                <p className="mt-2 text-sm text-fog">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
