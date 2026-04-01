export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatRole(role: string) {
  return role.replaceAll("_", " ");
}
