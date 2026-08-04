export const marketBoardCacheTtl = {
  market: 15_000,
  news: 30_000,
  disclosure: 60_000,
  calendar: 3_600_000
} as const;

type CacheEntry<T> = {
  expiresAt: number;
  value: T;
};

const memoryCache = new Map<string, CacheEntry<unknown>>();

export async function readThroughCache<T>(key: string, ttlMs: number, loader: () => Promise<T>): Promise<T> {
  const cached = memoryCache.get(key);
  const now = Date.now();

  if (cached && cached.expiresAt > now) {
    return cached.value as T;
  }

  const value = await loader();
  memoryCache.set(key, {
    expiresAt: now + ttlMs,
    value
  });

  return value;
}
