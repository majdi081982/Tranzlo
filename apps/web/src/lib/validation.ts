import type { PlanSlug, UserRole } from "@/lib/types";

export function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function requireText(value: string, label: string) {
  if (!value) {
    throw new Error(`${label} is required.`);
  }

  return value;
}

export function isRole(value: string): value is UserRole {
  return ["translator", "company", "admin", "admin_employee"].includes(value);
}

export function isPlan(value: string): value is PlanSlug {
  return ["starter", "growth", "enterprise"].includes(value);
}
