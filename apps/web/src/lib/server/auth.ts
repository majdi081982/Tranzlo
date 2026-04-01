import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeSession, encodeSession } from "@/lib/auth-session";
import type { SessionUser, UserRole } from "@/lib/types";

const COOKIE_NAME = "tranzlo_session";

export async function getCurrentSession() {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  return raw ? decodeSession(raw) : null;
}

export async function commitSession(session: SessionUser) {
  const store = await cookies();
  store.set(COOKIE_NAME, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function requireSession() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/auth/login");
  }

  return session;
}

export async function requireRole(roles: UserRole[]) {
  const session = await requireSession();
  if (!roles.includes(session.role)) {
    redirect("/dashboard");
  }
  return session;
}
