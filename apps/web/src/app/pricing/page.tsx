import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PlanCard } from "@/components/marketing/plan-card";
import { plans } from "@/lib/mock-data";

export default function PricingPage() {
  return (
    <div className="pb-16">
      <SiteHeader />
      <main className="shell py-8">
        <section className="panel p-8 md:p-10">
          <span className="eyebrow">Pricing</span>
          <h1 className="mt-4 text-4xl font-semibold text-ink">
            Start with a 14-day free trial on any plan
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-fog">
            Guests are sent to signup with their plan preserved. Signed-in users
            go straight into the billing path.
          </p>
        </section>
        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
