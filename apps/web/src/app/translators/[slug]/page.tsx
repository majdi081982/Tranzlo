import { notFound } from "next/navigation";
import { Badge } from "@/components/shared/badge";
import { translators } from "@/lib/mock-data";

interface TranslatorDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TranslatorDetailPage({
  params,
}: TranslatorDetailPageProps) {
  const { slug } = await params;
  const translator = translators.find((item) => item.slug === slug);

  if (!translator) {
    notFound();
  }

  return (
    <main className="shell py-10">
      <section className="panel p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold text-ink">{translator.name}</h1>
            <p className="mt-2 text-lg text-brand-dark">{translator.headline}</p>
          </div>
          <Badge tone="success">{translator.verificationStatus}</Badge>
        </div>
        <p className="mt-6 max-w-4xl text-sm leading-8 text-fog">{translator.bio}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-white/80 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-fog">Language pairs</p>
            <p className="mt-3 text-sm text-ink">{translator.languagePairs.join(" • ")}</p>
          </div>
          <div className="rounded-3xl bg-white/80 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-fog">Specialties</p>
            <p className="mt-3 text-sm text-ink">{translator.specialties.join(", ")}</p>
          </div>
          <div className="rounded-3xl bg-white/80 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-fog">Rates</p>
            <p className="mt-3 text-sm text-ink">{translator.rates}</p>
          </div>
          <div className="rounded-3xl bg-white/80 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-fog">CV privacy</p>
            <p className="mt-3 text-sm text-ink">
              {translator.cvVisibility.replaceAll("_", " ")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
