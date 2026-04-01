import type { SessionUser } from "@/lib/types";

function encodeBase64Url(value: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf8").toString("base64url");
  }

  return btoa(value).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function decodeBase64Url(value: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "base64url").toString("utf8");
  }

  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  return atob(base64);
}

export function encodeSession(session: SessionUser) {
  return encodeBase64Url(JSON.stringify(session));
}

export function decodeSession(value: string): SessionUser | null {
  try {
    return JSON.parse(decodeBase64Url(value)) as SessionUser;
  } catch {
    return null;
  }
}
