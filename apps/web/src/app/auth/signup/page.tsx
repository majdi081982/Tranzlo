import Link from "next/link";
import { signupAction } from "@/app/auth/actions";
import { SiteHeader } from "@/components/layout/site-header";
import { PLAN_CONFIG } from "@/lib/constants";

interface SignupPageProps {
  searchParams?: Promise<{ plan?: string }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const selectedPlan = PLAN_CONFIG.find((plan) => plan.slug === params?.plan)?.slug ?? "starter";

  return (
    <div>
      <SiteHeader />
      <main className="shell py-8">
        <div className="mx-auto max-w-2xl panel p-8">
          <span className="eyebrow">Create account</span>
          <h1 className="mt-4 text-3xl font-semibold text-ink">
            Start your Tranzlo account
          </h1>
          <p className="mt-3 text-sm leading-7 text-fog">
            Selected plan: <strong>{selectedPlan}</strong>. After signup,
            onboarding will activate your 14-day free trial with all features.
          </p>
          <form action={signupAction} className="mt-8 space-y-4">
            <input name="selectedPlan" type="hidden" value={selectedPlan} />
            <input className="field" name="name" placeholder="Full name" required />
            <input
              className="field"
              name="email"
              placeholder="Work email"
              required
              type="email"
            />
            <input
              className="field"
              name="password"
              placeholder="Password"
              required
              type="password"
            />
            <button className="button-primary w-full" type="submit">
              Continue to onboarding
            </button>
          </form>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <Link className="button-secondary" href="/auth/login">
              I already have an account
            </Link>
            <Link
              className="button-secondary"
              href="/auth/login?provider=google"
            >
              Continue with Google
            </Link>
          </div>
          <Link
            className="mt-3 inline-flex text-sm font-medium text-brand-dark"
            href="/auth/login?provider=linkedin"
          >
            Continue with LinkedIn
          </Link>
        </div>
      </main>
    </div>
  );
}
