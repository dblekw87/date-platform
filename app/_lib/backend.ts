import { currentUserAuthorId, getCurrentUser } from "../auth/session";

const backendUrl = process.env.DATE_BACKEND_URL ?? "http://localhost:4010";

export async function getBackendIdentityHeaders() {
  const user = await getCurrentUser();
  const headers = new Headers();

  if (user) {
    headers.set("X-Date-User-Provider", user.provider);
    headers.set("X-Date-User-Id", currentUserAuthorId(user));
    headers.set("X-Date-User-Name", user.name);
    if (user.email) headers.set("X-Date-User-Email", user.email);
  }

  return headers;
}

export async function fetchBackendJson<T>(path: string): Promise<T | null> {
  try {
    const headers = await getBackendIdentityHeaders();
    const response = await fetch(new URL(path, backendUrl), {
      headers,
      cache: "no-store"
    });

    if (!response.ok) return null;

    return await response.json() as T;
  } catch {
    return null;
  }
}
