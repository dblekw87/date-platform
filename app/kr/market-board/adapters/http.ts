export type JsonRequestOptions = {
  headers?: HeadersInit;
  method?: "GET" | "POST";
  body?: BodyInit;
  timeoutMs?: number;
};

export async function fetchJson<T>(url: string, options?: JsonRequestOptions): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options?.timeoutMs ?? 1800);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      method: options?.method ?? "GET",
      headers: options?.headers,
      body: options?.body,
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Request failed ${response.status}`);
    }

    return await response.json() as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchText(url: string, options?: JsonRequestOptions): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options?.timeoutMs ?? 1800);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      method: options?.method ?? "GET",
      headers: options?.headers,
      body: options?.body,
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Request failed ${response.status}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}
