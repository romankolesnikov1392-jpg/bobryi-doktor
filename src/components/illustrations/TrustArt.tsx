import type { TrustArtId } from "@/data/trust"
import { cn } from "@/lib/utils"

const INK = "var(--color-ink)"
const SKIN = "#f6d2b8"

/* Поднятая ладошка: «поднял руку — доктор остановился» */
function NoTears() {
  return (
    <>
      <path
        d="M40 150 C 20 100 50 40 110 30 C 170 20 222 60 210 118 C 200 168 150 178 110 172 C 80 168 50 170 40 150 Z"
        fill="var(--color-coral-soft)"
      />
      <path
        d="M58 70 l-14 -8 M54 92 h-16 M184 64 l14 -9 M190 88 h16"
        stroke={INK}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* рукав */}
      <rect x="92" y="138" width="56" height="40" rx="12" fill="var(--color-coral)" stroke={INK} strokeWidth="4" />
      <path d="M96 150 h48" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 7" opacity=".8" />
      {/* большой палец */}
      <rect
        x="72"
        y="88"
        width="16"
        height="44"
        rx="8"
        transform="rotate(-38 80 110)"
        fill={SKIN}
        stroke={INK}
        strokeWidth="4"
      />
      {/* пальцы */}
      {[
        [96, 50],
        [110, 40],
        [124, 42],
        [138, 54],
      ].map(([x, top]) => (
        <rect key={x} x={x} y={top} width="14" height={112 - top} rx="7" fill={SKIN} stroke={INK} strokeWidth="4" />
      ))}
      {/* ладонь поверх оснований пальцев */}
      <path d="M92 96 H 154 V 128 C 154 138 146 144 136 144 H 110 C 100 144 92 138 92 128 Z" fill={SKIN} />
      <path
        d="M92 96 V 128 C 92 138 100 144 110 144 H 136 C 146 144 154 138 154 128 V 104"
        fill="none"
        stroke={INK}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M123 128 C 110 120 106 108 114 104 C 118 102 122 104 123 108 C 124 104 128 102 132 104 C 140 108 136 120 123 128 Z"
        fill="var(--color-coral)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M100 56 v10 M114 46 v10" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" />
    </>
  )
}

/* Горка + аквариум с рыбкой Булькой + кубики */
function Playroom() {
  return (
    <>
      <path
        d="M18 140 C 10 90 40 36 110 30 C 180 24 232 70 222 124 C 214 170 160 172 110 170 C 60 168 24 170 18 140 Z"
        fill="var(--color-sun-soft)"
      />
      <path d="M14 160 H 226" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      {/* лесенка */}
      <path d="M36 160 L 48 70 M62 160 L 72 70" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      {[86, 104, 122, 140].map((y) => (
        <path
          key={y}
          d={`M${46 - (y - 70) * 0.13} ${y} H ${70 - (y - 70) * 0.11}`}
          stroke={INK}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      ))}
      <rect x="42" y="62" width="36" height="12" rx="5" fill="var(--color-mint)" stroke={INK} strokeWidth="3.6" />
      {/* скат */}
      <path
        d="M74 66 C 100 70 104 118 150 150 L 164 150 L 160 160 L 142 160 C 94 130 92 88 72 78 Z"
        fill="var(--color-coral)"
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M84 76 C 100 86 104 120 140 148"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".6"
      />
      {/* аквариум */}
      <rect x="150" y="62" width="70" height="56" rx="12" fill="var(--color-sky-soft)" stroke={INK} strokeWidth="4" />
      <path d="M152 76 H 218" stroke="var(--color-sky-deep)" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M156 116 q4 -16 0 -30 M164 116 q-5 -12 2 -22"
        stroke="var(--color-mint-deep)"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <g transform="translate(188 96)">
        <path
          d="M-16 0 C -10 -12 8 -12 14 0 C 8 12 -10 12 -16 0 Z"
          fill="var(--color-sun)"
          stroke={INK}
          strokeWidth="3"
        />
        <path d="M14 0 l10 -8 v16 Z" fill="var(--color-sun-deep)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="-8" cy="-2" r="2.4" fill={INK} />
        <path d="M-13 4 q3 2 5 0" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      </g>
      {[
        [176, 84, 3],
        [170, 74, 2],
      ].map(([x, y, r]) => (
        <circle key={x} cx={x} cy={y} r={r} fill="#fff" stroke="var(--color-sky-deep)" strokeWidth="1.6" />
      ))}
      <path d="M160 118 v42 M210 118 v42" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      {/* кубики */}
      <rect
        x="176"
        y="136"
        width="22"
        height="22"
        rx="4"
        fill="var(--color-lav)"
        stroke={INK}
        strokeWidth="3.2"
        transform="rotate(-6 187 147)"
      />
      <text
        x="187"
        y="153"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="900"
        fontSize="15"
        fill={INK}
        transform="rotate(-6 187 147)"
      >
        Б
      </text>
    </>
  )
}

/* Карман врача: зеркальце и динозавр — детский врач */
function Doctors() {
  return (
    <>
      <path
        d="M26 128 C 12 76 60 30 118 30 C 178 30 226 74 212 130 C 202 170 150 174 116 172 C 70 170 36 164 26 128 Z"
        fill="var(--color-mint-soft)"
      />
      {/* бейдж */}
      <g transform="rotate(-6 76 62)">
        <rect x="46" y="44" width="62" height="38" rx="8" fill="var(--color-paper)" stroke={INK} strokeWidth="3.6" />
        <rect x="46" y="44" width="62" height="11" rx="5" fill="var(--color-coral)" stroke={INK} strokeWidth="3.6" />
        <circle cx="60" cy="68" r="6" fill="var(--color-fur)" stroke={INK} strokeWidth="2.4" />
        <path d="M72 64 h26 M72 72 h18" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* зеркальце */}
      <g transform="rotate(14 150 80)">
        <rect x="146" y="52" width="8" height="70" rx="4" fill="var(--color-lav)" stroke={INK} strokeWidth="3.2" />
        <circle cx="150" cy="44" r="15" fill="var(--color-sky-soft)" stroke={INK} strokeWidth="3.6" />
        <path d="M142 40 q4 -6 10 -6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* динозаврик выглядывает */}
      <g>
        <path
          d="M100 116 C 96 92 104 74 116 72 C 128 70 134 80 130 90 C 126 98 118 100 118 116 Z"
          fill="var(--color-mint)"
          stroke={INK}
          strokeWidth="3.6"
          strokeLinejoin="round"
        />
        <circle cx="120" cy="82" r="2.6" fill={INK} />
        <path d="M112 90 q5 3 10 0" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        <path
          d="M106 80 l-4 -6 l6 1 M104 90 l-6 -3 l5 -2"
          fill="var(--color-mint-deep)"
          stroke={INK}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </g>
      {/* карман */}
      <path
        d="M62 108 H 180 V 150 C 180 162 170 170 158 170 H 84 C 72 170 62 162 62 150 Z"
        fill="var(--color-mint)"
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M70 118 H 172 V 148 C 172 156 166 162 158 162 H 84 C 76 162 70 156 70 148 Z"
        fill="none"
        stroke="var(--color-mint-deep)"
        strokeWidth="2.6"
        strokeDasharray="5 6"
      />
      <path d="M62 108 H 180" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    </>
  )
}

/* Крафт-пакет со стерильными инструментами: вскрываем при вас */
function Sterile() {
  return (
    <>
      <path
        d="M30 130 C 12 84 54 34 112 30 C 176 26 226 66 214 122 C 204 168 156 176 116 172 C 76 168 42 160 30 130 Z"
        fill="var(--color-sky-soft)"
      />
      <g transform="rotate(-8 116 104)">
        <path
          d="M70 44 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 V 162 H 70 Z"
          fill="#d9b48a"
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <rect x="82" y="60" width="72" height="72" rx="10" fill="#eef8fd" stroke={INK} strokeWidth="3.2" />
        {/* инструменты в окошке */}
        <g stroke={INK} strokeWidth="3" strokeLinecap="round">
          <path d="M100 124 L 124 72" />
          <path d="M116 126 L 140 76" />
        </g>
        <circle cx="126" cy="68" r="7" fill="var(--color-sky)" stroke={INK} strokeWidth="2.6" />
        <path d="M140 76 q4 -6 0 -10" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
        {/* индикатор стерильности */}
        <rect x="82" y="140" width="72" height="12" rx="6" fill="var(--color-mint)" stroke={INK} strokeWidth="2.8" />
        <path
          d="M90 146 h34"
          stroke="var(--color-mint-ink)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="3 5"
        />
      </g>
      {/* галочка */}
      <circle cx="172" cy="142" r="20" fill="var(--color-mint-deep)" stroke={INK} strokeWidth="3.6" />
      <path
        d="M162 142 l7 7 l13 -14"
        fill="none"
        stroke="#fff"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [58, 58, 1],
        [186, 50, 0.8],
        [52, 150, 0.7],
      ].map(([x, y, s]) => (
        <path
          key={x}
          transform={`translate(${x} ${y}) scale(${s})`}
          d="M0 -12 C 2 -3 3 -2 12 0 C 3 2 2 3 0 12 C -2 3 -3 2 -12 0 C -3 -2 -2 -3 0 -12 Z"
          fill="var(--color-sun)"
          stroke={INK}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      ))}
    </>
  )
}

const ART: Record<TrustArtId, () => React.JSX.Element> = {
  noTears: NoTears,
  playroom: Playroom,
  doctors: Doctors,
  sterile: Sterile,
}

export function TrustArt({ art, className }: { art: TrustArtId; className?: string }) {
  const Art = ART[art]
  return (
    <svg viewBox="0 0 240 180" className={cn("block w-full", className)} aria-hidden="true" focusable="false">
      <Art />
    </svg>
  )
}
