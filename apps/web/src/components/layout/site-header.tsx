import Link from "next/link";
import { getCurrentSession } from "@/lib/server/auth";

export async function SiteHeader() {
  const session = await getCurrentSession();

  return (
    <header className="shell py-5">
      <div className="panel flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <Link className="text-xl font-semibold tracking-tight text-ink" href="/">
          Tranzlo
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-fog">
          <Link href="/jobs">Jobs</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/community">Community</Link>
          {session ? (
            <Link className="button-primary" href="/dashboard">
              Dashboard
            </Link>
          ) : (
            <div className="flex gap-3">
              <Link className="button-secondary" href="/auth/login">
                Log in
              </Link>
              <Link className="button-primary" href="/auth/signup">
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
