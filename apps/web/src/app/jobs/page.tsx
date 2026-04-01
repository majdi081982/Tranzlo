import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/shared/badge";
import { featuredJobs } from "@/lib/mock-data";

export default function JobsPage() {
  return (
    <div className="pb-16">
      <SiteHeader />
      <main className="shell space-y-6 py-8">
        <section className="panel p-8">
          <span className="eyebrow">Jobs Marketplace</span>
          <h1 className="mt-4 text-4xl font-semibold text-ink">
            Search multilingual jobs with business-ready filters
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-fog">
            MVP filters represented here: source language, target language,
            specialization, budget, deadline, work mode, country, experience
            level, CAT tools, and verified-only requirements.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <input className="field" defaultValue="English" placeholder="Source language" />
            <input className="field" defaultValue="Arabic" placeholder="Target language" />
            <input className="field" defaultValue="Legal" placeholder="Specialization" />
            <input className="field" defaultValue="Remote" placeholder="Remote or onsite" />
          </div>
        </section>
        <section className="space-y-4">
          {featuredJobs.map((job) => (
            <Link className="panel block p-6" href={`/jobs/${job.id}`} key={job.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-ink">{job.title}</h2>
                    <p className="mt-1 text-sm text-fog">
                      {job.company} • {job.country} • {job.deadlineLabel}
                    </p>
                  </div>
                  <p className="max-w-3xl text-sm leading-7 text-fog">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{job.sourceLanguage}</Badge>
                    <Badge>{job.targetLanguage}</Badge>
                    <Badge>{job.specialization}</Badge>
                    <Badge>{job.experienceLevel}</Badge>
                    {job.verifiedOnly ? <Badge tone="success">Verified only</Badge> : null}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-brand-dark">{job.budget}</p>
                  <p className="mt-1 text-sm text-fog">{job.workMode}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
