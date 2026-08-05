import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type SecDisclosureEvent = {
  id: string;
  cik: string;
  accessionNumber: string;
  symbol: string;
  companyName: string;
  issuerType: "large-cap" | "small-cap" | "unknown";
  eventType: string;
  formType: string;
  filedAt: string;
  originalUrl: string;
  detectedAt: string;
};

type SecRuntimeState = {
  seenAccessionsByCik: Record<string, string[]>;
  events: SecDisclosureEvent[];
};

const stateFilePath = path.join(process.cwd(), "data", "runtime", "market-board-sec-state.json");

let memoryState: SecRuntimeState | undefined;
let writeQueue = Promise.resolve();

function createEmptyState(): SecRuntimeState {
  return {
    seenAccessionsByCik: {},
    events: []
  };
}

function normalizeState(value: unknown): SecRuntimeState {
  if (!value || typeof value !== "object") {
    return createEmptyState();
  }

  const state = value as Partial<SecRuntimeState>;

  return {
    seenAccessionsByCik: state.seenAccessionsByCik && typeof state.seenAccessionsByCik === "object" ? state.seenAccessionsByCik : {},
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

async function saveState(state: SecRuntimeState) {
  memoryState = state;
  writeQueue = writeQueue.then(async () => {
    await mkdir(path.dirname(stateFilePath), { recursive: true });
    await writeFile(stateFilePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  }).catch(() => undefined);

  await writeQueue;
}

export async function recordSecAccessions(cik: string, accessionNumbers: string[]) {
  const state = await readState();
  const seenAccessions = new Set(state.seenAccessionsByCik[cik] ?? []);

  if (!state.seenAccessionsByCik[cik]) {
    state.seenAccessionsByCik[cik] = accessionNumbers;
    await saveState(state);

    return new Set<string>();
  }

  const newAccessions = new Set(accessionNumbers.filter((accessionNumber) => !seenAccessions.has(accessionNumber)));
  const nextAccessions = [...new Set([...state.seenAccessionsByCik[cik], ...accessionNumbers])].slice(-100);

  state.seenAccessionsByCik[cik] = nextAccessions;
  await saveState(state);

  return newAccessions;
}

export async function recordSecDisclosureEvents(events: SecDisclosureEvent[]) {
  if (events.length === 0) {
    return;
  }

  const state = await readState();
  const existingIds = new Set(state.events.map((event) => event.id));
  const nextEvents = [
    ...events.filter((event) => !existingIds.has(event.id)),
    ...state.events
  ].slice(0, 200);

  state.events = nextEvents;
  await saveState(state);
}

export async function readSecDisclosureEvents() {
  const state = await readState();

  return state.events;
}
