import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

/* ──────────────────────────────────────────────────────────────
   Органика: волны-разделители, кляксы, подчёркивания, скотч
   ────────────────────────────────────────────────────────────── */

const WAVES = {
  soft: "M0 44 C 240 84 480 4 720 38 S 1200 80 1440 30 V90 H0Z",
  double: "M0 58 C 180 20 360 18 540 50 S 900 86 1080 46 S 1320 10 1440 42 V90 H0Z",
  cloud:
    "M0 62 Q 50 22 100 56 Q 150 20 210 54 Q 270 16 330 52 Q 400 18 460 54 Q 520 24 580 56 Q 650 14 720 52 Q 790 20 850 56 Q 910 22 980 52 Q 1040 18 1100 54 Q 1170 20 1230 56 Q 1290 24 1350 54 Q 1400 30 1440 50 V90 H0Z",
  lazy: "M0 30 C 320 30 420 78 760 70 S 1260 18 1440 52 V90 H0Z",
}

/**
 * Волнистый край секции. Кладите в начало (top) или в конец (bottom, flip) секции,
 * цвет — через text-* (fill = currentColor).
 */
export function Wave({
  shape = "soft",
  flip = false,
  className,
}: {
  shape?: keyof typeof WAVES
  flip?: boolean
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none block h-[44px] w-full sm:h-[70px]", flip && "rotate-180", className)}
    >
      <path d={WAVES[shape]} fill="currentColor" />
    </svg>
  )
}

const BLOBS = [
  "M312 70c46 38 70 104 50 160-20 58-80 106-146 112-70 6-140-30-164-94C28 184 50 108 108 68c56-40 158-38 204 2Z",
  "M300 48c52 30 80 92 70 150-10 62-52 124-118 142-68 18-150-12-190-70C22 212 30 130 78 82c48-48 170-66 222-34Z",
  "M322 98c38 54 40 128 4 184-36 58-110 96-176 80-66-16-120-76-128-144C14 150 54 78 118 50c64-28 166-6 204 48Z",
  "M290 40c60 20 100 80 100 140s-44 118-104 150c-60 32-134 20-180-26C60 258 30 190 44 132 58 72 116 30 180 24c40-4 76 4 110 16Z",
]

export function Blob({
  shape = 0,
  className,
  style,
}: {
  shape?: 0 | 1 | 2 | 3
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none", className)}
      style={style}
    >
      <path d={BLOBS[shape]} fill="currentColor" />
    </svg>
  )
}

/** Слово с рукописным подчёркиванием */
export function Squiggle({
  children,
  color = "var(--color-coral)",
  className,
}: {
  children: ReactNode
  color?: string
  className?: string
}) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute -bottom-[0.14em] left-[-2%] z-0 h-[0.34em] w-[104%]"
      >
        <path
          d="M4 16 C 60 5, 110 20, 160 11 S 250 7, 296 14"
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

/** Слово, обведённое «маркером» */
export function Circled({ children, color = "var(--color-sun-deep)" }: { children: ReactNode; color?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute -inset-x-[8%] -inset-y-[18%] z-0 h-[136%] w-[116%]"
      >
        <path
          d="M30 22 C 70 6 150 4 182 22 C 204 36 190 64 140 72 C 90 80 26 74 14 52 C 4 34 30 18 64 14"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

export function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="-12 -12 24 24" aria-hidden="true" className={cn("pointer-events-none", className)} style={style}>
      <path
        d="M0 -10 C 1.5 -2 2 -1.5 10 0 C 2 1.5 1.5 2 0 10 C -1.5 2 -2 1.5 -10 0 C -2 -1.5 -1.5 -2 0 -10 Z"
        fill="currentColor"
        stroke="var(--color-ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Рукописная стрелочка-указатель */
export function HandArrow({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 80"
      aria-hidden="true"
      className={cn("pointer-events-none", flip && "-scale-x-100", className)}
    >
      <path d="M6 10 C 40 4 86 20 100 62" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M84 54 L 101 66 L 110 46"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Полоска скотча для «приклеенных» заметок */
export function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-6 w-20 rounded-[3px] bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.35)_0_6px,transparent_6px_12px)] opacity-80",
        className,
      )}
    />
  )
}

/** Рассыпанные точки-конфетти */
export function Confetti({ className }: { className?: string }) {
  const dots = [
    [10, 20, "var(--color-coral)"],
    [60, 8, "var(--color-sun)"],
    [110, 30, "var(--color-mint-deep)"],
    [30, 60, "var(--color-lav-deep)"],
    [90, 70, "var(--color-sky-deep)"],
    [140, 52, "var(--color-coral)"],
  ] as const
  return (
    <svg viewBox="0 0 150 80" aria-hidden="true" className={cn("pointer-events-none", className)}>
      {dots.map(([x, y, c], i) =>
        i % 2 ? (
          <rect key={i} x={x} y={y} width="9" height="9" rx="2" fill={c} transform={`rotate(${i * 23} ${x} ${y})`} />
        ) : (
          <circle key={i} cx={x} cy={y} r="5" fill={c} />
        ),
      )}
    </svg>
  )
}
