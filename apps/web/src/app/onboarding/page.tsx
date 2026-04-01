import { onboardingAction } from "@/app/auth/actions";
import { PLAN_CONFIG, TRIAL_DAYS } from "@/lib/constants";
import { getCurrentSession } from "@/lib/server/auth";

export default async function OnboardingPage() {
  const session = await getCurrentSession();
  const selectedPlan =
    PLAN_CONFIG.find((plan) => plan.slug === session?.selectedPlan)?.slug ?? "starter";

  return (
    <main className="shell py-10">
      <div className="mx-auto max-w-3xl panel p-8 md:p-10">
        <span className="eyebrow">Onboarding</span>
        <h1 className="mt-4 text-4xl font-semibold text-ink">
          Choose your account type
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-fog">
          Your selected plan is <strong>{selectedPlan}</strong>. Completing
          onboarding activates a <strong>{TRIAL_DAYS}-day free trial</strong> with
          all features on that plan.
        </p>
        <form action={onboardingAction} className="mt-8 grid gap-4 md:grid-cols-2">
          <input name="selectedPlan" type="hidden" value={selectedPlan} />
          <button
            className="panel border border-line bg-white p-6 text-left transition hover:-translate-y-0.5"
            name="role"
            type="submit"
            value="translator"
          >
            <span className="text-lg font-semibold text-ink">Translator</span>
            <p className="mt-2 text-sm leading-7 text-fog">
              Create a public profile, upload a CV, manage applications,
              conversations, billing, and notifications.
            </p>
          </button>
          <button
            className="panel border border-line bg-white p-6 text-left transition hover:-translate-y-0.5"
            name="role"
            type="submit"
            value="company"
          >
            <span className="text-lg font-semibold text-ink">Company</span>
            <p className="mt-2 text-sm leading-7 text-fog">
              Create jobs, review applicants, choose communication methods, and
              manage subscription and billing from one dashboard.
            </p>
          </button>
        </form>
      </div>
    </main>
  );
}
