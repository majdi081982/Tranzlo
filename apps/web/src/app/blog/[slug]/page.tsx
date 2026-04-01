import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/mock-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="shell py-10">
      <article className="panel mx-auto max-w-4xl p-8">
        <p className="text-sm text-fog">{post.publishedAt}</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">{post.title}</h1>
        <p className="mt-4 text-lg text-fog">{post.excerpt}</p>
        <div className="mt-8 space-y-5 text-base leading-8 text-fog">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
