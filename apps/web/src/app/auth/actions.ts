"use server";

import { redirect } from "next/navigation";
import { TRIAL_DAYS } from "@/lib/constants";
import { clearSession, commitSession, getCurrentSession } from "@/lib/server/auth";
import { getString, isPlan, isRole, requireText } from "@/lib/validation";

export async function signupAction(formData: FormData) {
  const name = requireText(getString(formData, "name"), "Name");
  const email = requireText(getString(formData, "email"), "Email");
  const selectedPlan = getString(formData, "selectedPlan");

  await commitSession({
    id: email.toLowerCase(),
    name,
    email,
    role: "translator",
    selectedPlan: isPlan(selectedPlan) ? selectedPlan : "starter",
  });

  redirect("/onboarding");
}

export async function loginAction(formData: FormData) {
  const email = requireText(getString(formData, "email"), "Email");
  const role = getString(formData, "role");

  await commitSession({
    id: email.toLowerCase(),
    name: email.split("@")[0],
    email,
    role: isRole(role) ? role : "translator",
  });

  const redirectTo = getString(formData, "redirectTo");
  redirect(redirectTo || "/dashboard");
}

export async function onboardingAction(formData: FormData) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/auth/signup");
  }

  const selectedRole = getString(formData, "role");
  const selectedPlan = getString(formData, "selectedPlan");

  await commitSession({
    ...session,
    role: isRole(selectedRole) ? selectedRole : session.role,
    selectedPlan: isPlan(selectedPlan) ? selectedPlan : session.selectedPlan,
  });

  redirect(
    `/dashboard?trial=active&trialDays=${TRIAL_DAYS}&plan=${selectedPlan || session.selectedPlan || "starter"}`,
  );
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function createApplicationAction(formData: FormData) {
  const jobId = requireText(getString(formData, "jobId"), "Job id");
  redirect(`/dashboard/translator?applied=${jobId}`);
}

export async function createJobAction(formData: FormData) {
  const title = requireText(getString(formData, "title"), "Job title");
  redirect(`/dashboard/company?created=${encodeURIComponent(title)}`);
}

export async function publishCommunityPostAction(formData: FormData) {
  const content = requireText(getString(formData, "content"), "Post content");
  redirect(`/community?posted=${encodeURIComponent(content.slice(0, 30))}`);
}
