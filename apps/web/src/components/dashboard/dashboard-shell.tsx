import Link from "next/link";
import { logoutAction } from "@/app/auth/actions";
import { formatRole } from "@/lib/utils";
import type { SessionUser } from "@/lib/types";

interface DashboardShellProps {
  session: SessionUser;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function DashboardShell({
  session,
  title,
  description,
  children,
}: DashboardShellProps) {
  return (
    <div className="shell py-8">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="panel h-fit p-5">
          <p className="text-sm text-fog">Signed in as</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">{session.name}</h2>
          <p className="text-sm capitalize text-brand-dark">
            {formatRole(session.role)}
          </p>
          <nav className="mt-6 space-y-2 text-sm text-fog">
            <Link className="block rounded-2xl px-3 py-2 hover:bg-muted" href="/dashboard">
              Overview
            </Link>
            <Link
              className="block rounded-2xl px-3 py-2 hover:bg-muted"
              href="/dashboard/translator"
            >
              Translator
            </Link>
            <Link
              className="block rounded-2xl px-3 py-2 hover:bg-muted"
              href="/dashboard/company"
            >
              Company
            </Link>
            <Link
              className="block rounded-2xl px-3 py-2 hover:bg-muted"
              href="/dashboard/messages"
            >
              Messages
            </Link>
            <Link
              className="block rounded-2xl px-3 py-2 hover:bg-muted"
              href="/dashboard/admin"
            >
              Admin
            </Link>
          </nav>
          <form action={logoutAction} className="mt-6">
            <button className="button-secondary w-full" type="submit">
              Log out
            </button>
          </form>
        </aside>
        <section className="space-y-6">
          <div className="panel p-6">
            <h1 className="text-3xl font-semibold text-ink">{title}</h1>
            <p className="mt-2 text-sm leading-7 text-fog">{description}</p>
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
