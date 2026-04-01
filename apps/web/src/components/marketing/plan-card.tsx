import Link from "next/link";
import { getCurrentSession } from "@/lib/server/auth";
import type { Plan } from "@/lib/types";

interface PlanCardProps {
  plan: Plan;
}

export async function PlanCard({ plan }: PlanCardProps) {
  const session = await getCurrentSession();
  const href = session
    ? `/dashboard?checkout=${plan.slug}`
    : `/auth/signup?plan=${plan.slug}`;

  return (
    <article className="panel flex h-full flex-col p-6">
      <div className="space-y-3">
        <span className="eyebrow">{plan.audience}</span>
        <div>
          <h3 className="text-2xl font-semibold text-ink">{plan.name}</h3>
          <p className="mt-1 text-sm text-fog">{plan.description}</p>
        </div>
        <p className="text-3xl font-semibold text-brand-dark">{plan.price}</p>
      </div>
      <ul className="mt-6 flex-1 space-y-3 text-sm text-fog">
        {plan.features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <Link className="button-primary mt-6" href={href}>
        {session ? "Continue to checkout" : "Choose plan"}
      </Link>
    </article>
  );
}
