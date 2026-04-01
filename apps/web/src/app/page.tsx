import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PlanCard } from "@/components/marketing/plan-card";
import { StatCard } from "@/components/shared/stat-card";
import { featuredJobs, plans, translators } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="pb-16">
      <SiteHeader />
      <main className="shell flex flex-col gap-8 py-8 md:py-12">
        <section className="panel overflow-hidden bg-hero-glow p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-6">
              <span className="eyebrow">Language Hiring That Ships</span>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Hire translators, win multilingual projects, and manage
                  quality from one marketplace.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-fog">
                  Tranzlo helps companies source vetted translators while giving
                  linguists a professional home for profiles, applications,
                  messaging, and billing.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link className="button-primary" href="/pricing">
                  Start your 14-day free trial
                </Link>
                <Link className="button-secondary" href="/jobs">
                  Browse open jobs
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <StatCard label="Translator profiles" value="2.4k+" />
                <StatCard label="Enterprise-ready workflows" value="8 core" />
                <StatCard label="Admin moderation queues" value="Live" />
              </div>
            </div>
            <div className="panel border-white/50 bg-white/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fog">
                What ships in this MVP
              </p>
              <div className="mt-4 space-y-4 text-sm text-fog">
                <div>
                  <p className="font-semibold text-ink">Marketplace</p>
                  <p>Jobs, public translator profiles, applications, filters.</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Operations</p>
                  <p>Admin verification, disputes, moderation, audit visibility.</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Automation</p>
                  <p>n8n hooks for alerts, reminders, payments, and AI triggers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="panel p-6 md:p-8">
            <span className="eyebrow">Featured Translators</span>
            <div className="mt-6 space-y-5">
              {translators.map((translator) => (
                <Link
                  className="block rounded-3xl border border-line bg-white/80 p-5 transition hover:-translate-y-0.5 hover:bg-white"
                  href={`/translators/${translator.slug}`}
                  key={translator.slug}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-ink">
                        {translator.name}
                      </h2>
                      <p className="mt-1 text-sm text-brand-dark">
                        {translator.headline}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-fog">
                      {translator.verificationStatus}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-fog">
                    {translator.languagePairs.join(" • ")}
                  </p>
                  <p className="mt-2 text-sm text-fog">
                    {translator.specialties.join(", ")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="panel p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="eyebrow">Marketplace</span>
                <h2 className="mt-4 text-3xl font-semibold text-ink">
                  Fresh opportunities for specialized translators
                </h2>
              </div>
              <Link className="button-secondary hidden md:inline-flex" href="/jobs">
                See all jobs
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {featuredJobs.map((job) => (
                <Link
                  className="block rounded-3xl border border-line bg-white p-5 transition hover:-translate-y-0.5"
                  href={`/jobs/${job.id}`}
                  key={job.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{job.title}</h3>
                      <p className="mt-1 text-sm text-fog">
                        {job.sourceLanguage} to {job.targetLanguage} •{" "}
                        {job.specialization}
                      </p>
                    </div>
                    <div className="text-right text-sm text-fog">
                      <p className="font-semibold text-brand-dark">{job.budget}</p>
                      <p>{job.workMode}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
