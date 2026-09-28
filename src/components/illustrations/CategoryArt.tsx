import type { ServiceCategory } from "@/data/services"
import { cn } from "@/lib/utils"

/*
 * Наклейки-иконки категорий услуг. Один приём на все: толстый контур цвета «чернил»,
 * плоские заливки из палитры, у зубов — лица. Никаких библиотечных иконок.
 */
const INK = "var(--color-ink)"
const SW = 3

/** Зуб-персонаж в квадрате 40×40 */
function ToothChar({
  x = 0,
  y = 0,
  s = 1,
  mood = "smile",
}: {
  x?: number
  y?: number
  s?: number
  mood?: "smile" | "joy" | "brave" | "ouch"
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M8 4 C 13 2 17 5 20 5 C 23 5 27 2 32 4 C 38 7 38 16 36 21 C 34 26 34 30 32 36 C 31 40 28 41 27 38 C 25 33 24 29 20 29 C 16 29 15 33 13 38 C 12 41 9 40 8 36 C 6 30 6 26 4 21 C 2 16 2 7 8 4 Z"
        fill="#fff"
        stroke={INK}
        strokeWidth={SW / s}
        strokeLinejoin="round"
      />
      {mood === "joy" ? (
        <path
          d="M11 15 q3 -4 6 0 M23 15 q3 -4 6 0"
          fill="none"
          stroke={INK}
          strokeWidth={2.4 / s}
          strokeLinecap="round"
        />
      ) : mood === "ouch" ? (
        <path
          d="M11 12 l5 3 l-5 3 M29 12 l-5 3 l5 3"
          fill="none"
          stroke={INK}
          strokeWidth={2.2 / s}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <circle cx="14" cy="15" r={2.2} fill={INK} />
          <circle cx="26" cy="15" r={2.2} fill={INK} />
        </>
      )}
      {mood === "brave" ? (
        <path d="M14 21 h12" stroke={INK} strokeWidth={2.4 / s} strokeLinecap="round" />
      ) : mood === "ouch" ? (
        <ellipse cx="20" cy="22" rx="3" ry="2.4" fill={INK} />
      ) : (
        <path d="M14 20 q6 5 12 0" fill="none" stroke={INK} strokeWidth={2.4 / s} strokeLinecap="round" />
      )}
      <ellipse cx="10" cy="19" rx="2.6" ry="1.6" fill="var(--color-coral)" opacity=".7" />
      <ellipse cx="30" cy="19" rx="2.6" ry="1.6" fill="var(--color-coral)" opacity=".7" />
    </g>
  )
}

function Prevention() {
  return (
    <>
      <path
        d="M40 6 C 52 13 61 15 70 15 C 70 45 60 63 40 74 C 20 63 10 45 10 15 C 19 15 28 13 40 6 Z"
        fill="var(--color-mint)"
        stroke={INK}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d="M40 14 C 49 19 56 21 62 21 C 61 44 54 57 40 66"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".6"
      />
      <ToothChar x={22} y={20} s={0.9} mood="joy" />
      <path
        d="M68 4 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z"
        fill="var(--color-sun)"
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </>
  )
}

function Caries() {
  return (
    <>
      {/* убегающий микроб */}
      <g transform="translate(52 50)">
        <path
          d="M2 10 C 0 2 10 -4 17 2 C 26 0 28 12 22 16 C 22 24 8 24 4 18 C -2 18 -2 12 2 10 Z"
          fill="var(--color-lav)"
          stroke={INK}
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="9" r="2" fill={INK} />
        <circle cx="17" cy="8" r="2" fill={INK} />
        <path d="M11 15 q3 -2 6 0" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <path d="M-6 6 h-6 M-5 13 h-8 M-4 20 h-5" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <ToothChar x={6} y={8} s={1.25} mood="brave" />
      {/* пластырь */}
      <g transform="rotate(-32 30 22)">
        <rect x="16" y="16" width="28" height="11" rx="5.5" fill="var(--color-coral)" stroke={INK} strokeWidth="2.6" />
        <rect x="25" y="16" width="10" height="11" fill="var(--color-coral-soft)" stroke={INK} strokeWidth="2" />
        <circle cx="28" cy="20" r="1" fill={INK} />
        <circle cx="32" cy="23" r="1" fill={INK} />
      </g>
    </>
  )
}

function Ortho() {
  return (
    <>
      <path
        d="M4 58 Q 40 74 76 58 L 76 70 Q 40 84 4 70 Z"
        fill="var(--color-coral-soft)"
        stroke={INK}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {[0, 1, 2].map((i) => (
        <ToothChar key={i} x={4 + i * 24} y={18 + (i === 1 ? 4 : 0)} s={0.8} mood={i === 1 ? "joy" : "smile"} />
      ))}
      {/* брекет-система */}
      <path d="M6 34 Q 40 44 74 34" fill="none" stroke="var(--color-lav-deep)" strokeWidth="3" strokeLinecap="round" />
      {[14, 38, 62].map((x, i) => (
        <rect
          key={x}
          x={x - 4}
          y={i === 1 ? 35 : 32}
          width="8"
          height="7"
          rx="2"
          fill="var(--color-lav)"
          stroke={INK}
          strokeWidth="2"
        />
      ))}
      <path
        d="M62 6 l1.6 4.6 l4.6 1.6 l-4.6 1.6 l-1.6 4.6 l-1.6 -4.6 l-4.6 -1.6 l4.6 -1.6 Z"
        fill="var(--color-sun)"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </>
  )
}

function Surgery() {
  return (
    <>
      <path d="M50 44 C 58 30 62 20 60 10" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <g>
        <ellipse cx="60" cy="10" rx="11" ry="12" fill="var(--color-sky)" stroke={INK} strokeWidth="2.6" />
        <path d="M55 5 q-2 4 0 8" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <g transform="rotate(-10 30 44)">
        <ToothChar x={10} y={22} s={1.05} mood="joy" />
      </g>
      {/* ручка-машет */}
      <path d="M46 42 q6 -2 8 2" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M4 70 q10 -6 20 0 q10 6 20 0 q10 -6 20 0"
        fill="none"
        stroke="var(--color-sky-deep)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M8 30 l-6 -4 M6 40 h-6" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
    </>
  )
}

function Emergency() {
  return (
    <>
      {/* мигалка */}
      <path d="M28 8 h24 v10 h-24 Z" fill="var(--color-sun)" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M31 8 q9 -10 18 0" fill="var(--color-coral)" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M18 4 l-6 -3 M62 4 l6 -3 M16 12 h-7 M64 12 h7" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <ToothChar x={14} y={22} s={1.3} mood="ouch" />
      {/* бинт */}
      <path
        d="M17 32 Q 40 26 64 34 L 62 42 Q 40 35 18 40 Z"
        fill="#fff"
        stroke={INK}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M60 36 l8 -4 l2 6 Z" fill="#fff" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      <path
        d="M28 33 v4 M38 31.5 v4 M48 32 v4"
        stroke="var(--color-sky-deep)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  )
}

const ART: Record<ServiceCategory, () => React.JSX.Element> = {
  prevention: Prevention,
  caries: Caries,
  ortho: Ortho,
  surgery: Surgery,
  emergency: Emergency,
}

export function CategoryArt({ category, className }: { category: ServiceCategory; className?: string }) {
  const Art = ART[category]
  return (
    <svg viewBox="0 0 80 80" className={cn("block", className)} aria-hidden="true" focusable="false">
      <Art />
    </svg>
  )
}

export { ToothChar }
