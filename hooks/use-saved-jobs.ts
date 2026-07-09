"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "greatify-saved-jobs";
const EMPTY_SET: Set<string> = new Set();

type Listener = () => void;
const listeners = new Set<Listener>();

function emitChange() {
  for (const listener of listeners) listener();
}

// The native "storage" event only fires in *other* tabs; our own writes
// notify subscribers directly via emitChange so this tab updates too.
function subscribe(listener: Listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

// Cache the parsed Set so getSnapshot returns a stable reference when the
// underlying raw string hasn't changed, as useSyncExternalStore requires.
let cachedRaw: string | null | undefined;
let cachedIds: Set<string> = EMPTY_SET;

function getSnapshot(): Set<string> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedIds = readStorage();
  }
  return cachedIds;
}

function getServerSnapshot() {
  return EMPTY_SET;
}

function writeStorage(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  cachedRaw = undefined;
  emitChange();
}

export function useSavedJobs() {
  const savedIds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isSaved = useCallback((id: string) => savedIds.has(id), [savedIds]);

  const toggleSave = useCallback((id: string) => {
    const next = new Set(readStorage());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    writeStorage(next);
  }, []);

  return { savedIds, isSaved, toggleSave };
}
