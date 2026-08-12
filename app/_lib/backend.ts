const backendUrl = process.env.DATE_BACKEND_URL ?? "http://localhost:4010";

export async function fetchBackendJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(new URL(path, backendUrl), {
      cache: "no-store"
    });

    if (!response.ok) return null;

    return await response.json() as T;
  } catch {
    return null;
  }
}
