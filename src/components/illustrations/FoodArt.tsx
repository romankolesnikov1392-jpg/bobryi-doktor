import type { FoodId } from "@/data/quiz"
import { cn } from "@/lib/utils"

/* Еда для квиза «Полезно / вредно» — в стиле наклеек клиники */
const INK = "var(--color-ink)"
const S = { stroke: INK, strokeWidth: 3.4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const }
const GREEN = "#6cc070"
const ORANGE = "#f7954a"

function Face({ x, y, sad }: { x: number; y: number; sad?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="-6" cy="0" r="2.4" fill={INK} />
      <circle cx="6" cy="0" r="2.4" fill={INK} />
      <path
        d={sad ? "M-5 8 q5 -4 10 0" : "M-5 5 q5 5 10 0"}
        fill="none"
        stroke={INK}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </g>
  )
}

const FOOD: Record<FoodId, () => React.JSX.Element> = {
  apple: () => (
    <>
      <path d="M50 22 C 52 14 56 10 62 8" fill="none" {...S} />
      <path d="M54 18 C 62 8 76 10 78 16 C 70 22 60 22 54 18 Z" fill={GREEN} {...S} />
      <path
        d="M50 28 C 40 20 18 22 16 46 C 14 70 32 90 44 88 C 48 87 52 87 56 88 C 68 90 86 70 84 46 C 82 22 60 20 50 28 Z"
        fill="var(--color-coral)"
        {...S}
      />
      <path d="M28 44 q2 -10 10 -12" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".7" />
      <Face x={50} y={56} />
    </>
  ),
  lollipop: () => (
    <>
      <rect x="46" y="54" width="8" height="42" rx="4" fill="var(--color-paper)" {...S} />
      <circle cx="50" cy="38" r="28" fill="var(--color-lav)" {...S} />
      <path
        d="M48 38 a2 2 0 1 1 4 0 a6 6 0 1 1 -12 0 a10 10 0 1 1 20 0 a14 14 0 1 1 -28 0 a18 18 0 1 1 36 0"
        fill="none"
        stroke="var(--color-coral)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  ),
  cheese: () => (
    <>
      <path d="M12 70 L 88 70 L 88 42 L 12 56 Z" fill="var(--color-sun)" {...S} />
      <path d="M12 56 L 60 22 L 88 42" fill="#ffe7a3" {...S} />
      <circle cx="30" cy="62" r="4" fill="var(--color-sun-deep)" />
      <circle cx="70" cy="56" r="5" fill="var(--color-sun-deep)" />
      <circle cx="56" cy="64" r="3" fill="var(--color-sun-deep)" />
      <Face x={46} y={52} />
    </>
  ),
  soda: () => (
    <>
      <path d="M58 14 l10 -8" fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
      <rect x="30" y="18" width="40" height="72" rx="10" fill="var(--color-coral)" {...S} />
      <rect x="30" y="18" width="40" height="10" rx="5" fill="#dfe6ea" {...S} />
      <path d="M30 50 q10 -8 20 0 q10 8 20 0 v16 q-10 -8 -20 0 q-10 8 -20 0 Z" fill="var(--color-paper)" />
      <circle cx="80" cy="30" r="3.4" fill="none" stroke="var(--color-sky-deep)" strokeWidth="2.4" />
      <circle cx="84" cy="44" r="2.4" fill="none" stroke="var(--color-sky-deep)" strokeWidth="2.4" />
      <Face x={50} y={74} sad />
    </>
  ),
  carrot: () => (
    <>
      <path
        d="M46 24 C 40 12 44 6 48 6 C 50 12 50 16 50 22 M52 22 C 56 12 64 10 68 14 C 62 18 58 22 54 26 M44 26 C 34 20 26 22 26 28 C 34 28 40 28 44 30"
        fill={GREEN}
        {...S}
      />
      <path d="M36 30 C 44 22 62 24 66 34 C 64 54 56 74 46 94 C 40 74 34 54 36 30 Z" fill={ORANGE} {...S} />
      <path d="M40 46 h8 M44 60 h7 M42 76 h5" stroke={INK} strokeWidth="2.6" strokeLinecap="round" opacity=".5" />
      <Face x={51} y={40} />
    </>
  ),
  toffee: () => (
    <>
      <path d="M26 50 L 8 36 L 12 50 L 8 64 Z M74 50 L 92 36 L 88 50 L 92 64 Z" fill="var(--color-sun)" {...S} />
      <rect x="24" y="34" width="52" height="32" rx="14" fill="var(--color-sun)" {...S} />
      <path d="M36 34 v32 M52 34 v32 M68 38 v24" stroke="var(--color-coral)" strokeWidth="4" />
      <rect x="24" y="34" width="52" height="32" rx="14" fill="none" {...S} />
    </>
  ),
  water: () => (
    <>
      <path d="M26 14 H 74 L 68 90 H 32 Z" fill="var(--color-paper)" {...S} />
      <path d="M30 40 H 70 L 68 88 H 32 Z" fill="var(--color-sky)" />
      <path d="M30 40 q10 -5 20 0 q10 5 20 0" fill="none" stroke="var(--color-sky-deep)" strokeWidth="3" />
      <path d="M26 14 H 74 L 68 90 H 32 Z" fill="none" {...S} />
      <circle cx="44" cy="70" r="3" fill="#fff" />
      <circle cx="56" cy="58" r="2.4" fill="#fff" />
      <path d="M36 22 l3 50" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".7" />
      <Face x={52} y={70} />
    </>
  ),
  chips: () => (
    <>
      <path
        d="M22 14 L 30 10 L 38 14 L 46 10 L 54 14 L 62 10 L 70 14 L 78 10 C 84 36 84 64 78 90 L 70 86 L 62 90 L 54 86 L 46 90 L 38 86 L 30 90 L 22 86 C 16 62 16 36 22 14 Z"
        fill="var(--color-lav)"
        {...S}
      />
      <ellipse cx="50" cy="52" rx="18" ry="13" fill="var(--color-sun)" {...S} transform="rotate(-12 50 52)" />
      <path d="M40 50 l6 -3 M52 56 l6 -3" stroke="var(--color-sun-deep)" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 24 h44" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".6" />
    </>
  ),
  milk: () => (
    <>
      <path d="M30 30 L 50 12 L 70 30 Z" fill="var(--color-sky)" {...S} />
      <rect x="44" y="6" width="12" height="8" rx="2" fill="var(--color-sky-deep)" {...S} />
      <rect x="30" y="30" width="40" height="62" rx="6" fill="var(--color-paper)" {...S} />
      <path d="M30 70 q10 -6 20 0 q10 6 20 0 v16 a6 6 0 0 1 -6 6 h-28 a6 6 0 0 1 -6 -6 Z" fill="var(--color-sky)" />
      <rect x="30" y="30" width="40" height="62" rx="6" fill="none" {...S} />
      <path
        d="M50 38 C 44 46 42 50 42 54 a8 8 0 0 0 16 0 C 58 50 56 46 50 38 Z"
        fill="var(--color-sky-soft)"
        stroke={INK}
        strokeWidth="2.4"
      />
    </>
  ),
  cucumber: () => (
    <>
      <path
        d="M16 68 C 12 52 40 24 70 18 C 86 16 90 26 84 36 C 72 56 44 78 28 80 C 22 80 18 76 16 68 Z"
        fill={GREEN}
        {...S}
      />
      <path d="M26 64 C 40 50 60 34 78 26" fill="none" stroke="#9adf9c" strokeWidth="5" strokeLinecap="round" />
      {[
        [34, 70],
        [50, 58],
        [64, 44],
        [74, 34],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="2" fill={INK} opacity=".45" />
      ))}
      <Face x={50} y={48} />
    </>
  ),
}

export function FoodArt({ id, className }: { id: FoodId; className?: string }) {
  const Art = FOOD[id]
  return (
    <svg viewBox="0 0 100 100" className={cn("block", className)} aria-hidden="true" focusable="false">
      <Art />
    </svg>
  )
}
