import type { Tone } from "@/data/services"

/* Полные имена классов — чтобы Tailwind их увидел при сборке */
export const toneBg: Record<Tone, string> = {
  mint: "bg-mint",
  coral: "bg-coral",
  lav: "bg-lav",
  sky: "bg-sky",
  sun: "bg-sun",
}
export const toneSoft: Record<Tone, string> = {
  mint: "bg-mint-soft",
  coral: "bg-coral-soft",
  lav: "bg-lav-soft",
  sky: "bg-sky-soft",
  sun: "bg-sun-soft",
}
export const toneInk: Record<Tone, string> = {
  mint: "text-mint-ink",
  coral: "text-coral-ink",
  lav: "text-lav-ink",
  sky: "text-sky-ink",
  sun: "text-sun-ink",
}
export const toneText: Record<Tone, string> = {
  mint: "text-mint",
  coral: "text-coral",
  lav: "text-lav",
  sky: "text-sky",
  sun: "text-sun",
}
export const toneSoftText: Record<Tone, string> = {
  mint: "text-mint-soft",
  coral: "text-coral-soft",
  lav: "text-lav-soft",
  sky: "text-sky-soft",
  sun: "text-sun-soft",
}
export const toneVar: Record<Tone, string> = {
  mint: "var(--color-mint)",
  coral: "var(--color-coral)",
  lav: "var(--color-lav)",
  sky: "var(--color-sky)",
  sun: "var(--color-sun)",
}
export const toneDeepVar: Record<Tone, string> = {
  mint: "var(--color-mint-deep)",
  coral: "var(--color-coral-deep)",
  lav: "var(--color-lav-deep)",
  sky: "var(--color-sky-deep)",
  sun: "var(--color-sun-deep)",
}
