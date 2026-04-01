import { notFound } from "next/navigation";
import { createApplicationAction } from "@/app/auth/actions";
import { Badge } from "@/components/shared/badge";
import { featuredJobs } from "@/lib/mock-data";

interface JobDetailPageProps {
  params: Promise<{ jobId: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { jobId } = await params;
  const job = featuredJobs.find((item) => item.id === jobId);

  if (!job) {
    notFound();
  }

  return (
    <main className="shell py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="panel p-8">
          <span className="eyebrow">{job.company}</span>
          <h1 className="mt-4 text-4xl font-semibold text-ink">{job.title}</h1>
          <p className="mt-4 text-sm leading-7 text-fog">{job.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>{job.sourceLanguage}</Badge>
            <Badge>{job.targetLanguage}</Badge>
            <Badge>{job.specialization}</Badge>
            <Badge>{job.country}</Badge>
            <Badge>{job.workMode}</Badge>
            <Badge>{job.experienceLevel}</Badge>
          </div>
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-white/80 p-4">
              <dt className="text-xs uppercase tracking-[0.2em] text-fog">Budget</dt>
              <dd className="mt-2 text-lg font-semibold text-ink">{job.budget}</dd>
            </div>
            <div className="rounded-3xl bg-white/80 p-4">
              <dt className="text-xs uppercase tracking-[0.2em] text-fog">Communication</dt>
              <dd className="mt-2 text-lg font-semibold text-ink">
                {job.communicationPreference.replaceAll("_", " ")}
              </dd>
            </div>
          </dl>
        </section>
        <aside className="panel p-6">
          <h2 className="text-xl font-semibold text-ink">Apply to this job</h2>
          <p className="mt-2 text-sm leading-7 text-fog">
            Translators can submit a cover letter, quoted rate, and estimated
            delivery. Applications are visible to the owning company.
          </p>
          <form action={createApplicationAction} className="mt-6 space-y-4">
            <input name="jobId" type="hidden" value={job.id} />
            <textarea
              className="field min-h-32"
              name="coverLetter"
              placeholder="Cover letter"
              required
            />
            <input className="field" name="quotedRate" placeholder="Quoted rate" />
            <button className="button-primary w-full" type="submit">
              Submit application
            </button>
          </form>
        </aside>
      </div>
    </main>
  );
}
