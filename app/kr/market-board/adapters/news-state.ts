import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type NewsHeadlineEvent = {
  id: string;
  source: string;
  label: string;
  text: string;
  publishedAt: string;
  originalUrl: string;
  detectedAt: string;
};

type NewsRuntimeState = {
  seenHeadlineIds: string[];
  events: NewsHeadlineEvent[];
};

const stateFilePath = path.join(process.cwd(), "data", "runtime", "market-board-news-state.json");

let memoryState: NewsRuntimeState | undefined;
let writeQueue = Promise.resolve();

function createEmptyState(): NewsRuntimeState {
  return {
    seenHeadlineIds: [],
    events: []
  };
}

function normalizeState(value: unknown): NewsRuntimeState {
  if (!value || typeof value !== "object") {
    return createEmptyState();
  }

  const state = value as Partial<NewsRuntimeState>;

  return {
    seenHeadlineIds: Array.isArray(state.seenHeadlineIds) ? state.seenHeadlineIds : [],
    events: Array.isArray(state.events) ? state.events : []
  };
}

async function readState() {
  if (memoryState) {
    return memoryState;
  }

  try {
    const raw = await readFile(stateFilePath, "utf8");
    memoryState = normalizeState(JSON.parse(raw));
  } catch {
    memoryState = createEmptyState();
  }

  return memoryState;
}

async function saveState(state: NewsRuntimeState) {
  memoryState = state;
  writeQueue = writeQueue.then(async () => {
    await mkdir(path.dirname(stateFilePath), { recursive: true });
    await writeFile(stateFilePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  }).catch(() => undefined);

  await writeQueue;
}

export async function recordNewsHeadlines(headlineIds: string[]) {
  const state = await readState();
  const seenHeadlineIds = new Set(state.seenHeadlineIds);

  if (state.seenHeadlineIds.length === 0) {
    state.seenHeadlineIds = headlineIds.slice(0, 500);
    await saveState(state);

    return new Set<string>();
  }

  const newHeadlineIds = new Set(headlineIds.filter((headlineId) => !seenHeadlineIds.has(headlineId)));
  state.seenHeadlineIds = [...new Set([...headlineIds, ...state.seenHeadlineIds])].slice(0, 500);
  await saveState(state);

  return newHeadlineIds;
}

export async function recordNewsHeadlineEvents(events: NewsHeadlineEvent[]) {
  if (events.length === 0) {
    return;
  }

  const state = await readState();
  const existingIds = new Set(state.events.map((event) => event.id));

  state.events = [
    ...events.filter((event) => !existingIds.has(event.id)),
    ...state.events
  ].slice(0, 300);
  await saveState(state);
}

export async function readNewsHeadlineEvents() {
  const state = await readState();

  return state.events;
}
