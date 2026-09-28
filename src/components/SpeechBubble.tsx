import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { Tone } from "@/data/services"

type BubbleTone = Tone | "paper"
const BG: Record<BubbleTone, string> = {
  paper: "var(--color-paper)",
  mint: "var(--color-mint)",
  coral: "var(--color-coral)",
  lav: "var(--color-lav)",
  sky: "var(--color-sky)",
  sun: "var(--color-sun)",
}

type Tail = "left" | "right" | "bottom-left" | "bottom-right" | "top-left" | "top-right" | "none"

/**
 * Реплика Грыши. Голос для детей — рукописным шрифтом.
 * Хвостик — отдельный SVG, чтобы форма была «нарисованной», а не треугольником из border.
 */
export function SpeechBubble({
  children,
  tone = "sun",
  tail = "bottom-left",
  label = "Грыша говорит",
  className,
  size = "md",
}: {
  children: ReactNode
  tone?: BubbleTone
  tail?: Tail
  label?: string | null
  className?: string
  size?: "sm" | "md" | "lg"
}) {
  const bg = BG[tone]
  return (
    <div
      className={cn(
        "relative rounded-[26px_28px_24px_30px] px-5 py-4 text-ink shadow-plush",
        size === "sm" && "px-4 py-3",
        className,
      )}
      style={{ background: bg }}
    >
      {label && <p className="mb-0.5 text-[11px] font-extrabold tracking-[0.08em] uppercase opacity-70">{label}</p>}
      <p
        className={cn(
          "font-hand leading-snug",
          size === "sm" && "text-[17px]",
          size === "md" && "text-[19px] sm:text-[21px]",
          size === "lg" && "text-[22px] sm:text-[25px]",
        )}
      >
        {children}
      </p>
      {tail !== "none" && <BubbleTail tail={tail} color={bg} />}
    </div>
  )
}

function BubbleTail({ tail, color }: { tail: Exclude<Tail, "none">; color: string }) {
  const pos: Record<Exclude<Tail, "none">, string> = {
    "bottom-left": "-bottom-[15px] left-8",
    "bottom-right": "-bottom-[15px] right-8 -scale-x-100",
    left: "top-1/2 -left-[15px] -translate-y-1/2 rotate-90",
    right: "top-1/2 -right-[15px] -translate-y-1/2 -rotate-90",
    "top-left": "-top-[15px] left-8 rotate-180 -scale-x-100",
    "top-right": "-top-[15px] right-8 rotate-180",
  }
  return (
    <svg viewBox="0 0 30 18" aria-hidden="true" className={cn("absolute h-[18px] w-[30px]", pos[tail])}>
      <path d="M0 0 H26 C 22 6 18 12 4 18 C 8 12 8 6 0 0 Z" fill={color} />
    </svg>
  )
}
