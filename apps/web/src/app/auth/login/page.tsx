import { loginAction } from "@/app/auth/actions";
import { SiteHeader } from "@/components/layout/site-header";

interface LoginPageProps {
  searchParams?: Promise<{ redirectTo?: string; provider?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <div>
      <SiteHeader />
      <main className="shell py-8">
        <div className="mx-auto max-w-xl panel p-8">
          <span className="eyebrow">Welcome back</span>
          <h1 className="mt-4 text-3xl font-semibold text-ink">Log in</h1>
          <p className="mt-3 text-sm text-fog">
            OAuth callback wiring is prepared for Google and LinkedIn through
            Appwrite providers. Current provider hint: {params?.provider ?? "email"}.
          </p>
          <form action={loginAction} className="mt-8 space-y-4">
            <input name="redirectTo" type="hidden" value={params?.redirectTo ?? ""} />
            <input className="field" name="email" placeholder="Email" required type="email" />
            <input
              className="field"
              name="password"
              placeholder="Password"
              required
              type="password"
            />
            <select className="field" defaultValue="translator" name="role">
              <option value="translator">Translator</option>
              <option value="company">Company</option>
              <option value="admin">Admin</option>
              <option value="admin_employee">Admin employee</option>
            </select>
            <button className="button-primary w-full" type="submit">
              Continue
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
