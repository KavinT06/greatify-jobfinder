import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const AVATAR_PALETTE = [
  "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400",
  "bg-violet-500/15 text-violet-600 dark:text-violet-400",
] as const

// Deterministic hash so a given company always gets the same avatar color.
export function avatarPalette(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length]
}
