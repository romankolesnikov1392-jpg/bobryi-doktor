import { useId } from "react"
import type { PortraitSpec } from "@/data/doctors"
import { toneVar } from "@/lib/tone"
import { cn } from "@/lib/utils"

/*
 * Стилизованные портреты врачей — подчёркнуто иллюстративные заглушки
 * (никаких фото). Заменить на настоящие фото/портреты: см. README.
 */
const INK = "var(--color-ink)"
const SOFT: Record<PortraitSpec["scrubs"], string> = {
  mint: "var(--color-mint-soft)",
  coral: "var(--color-coral-soft)",
  lav: "var(--color-lav-soft)",
  sky: "var(--color-sky-soft)",
  sun: "var(--color-sun-soft)",
}

export function DoctorPortrait({ spec, className, label }: { spec: PortraitSpec; className?: string; label?: string }) {
  const { skin, hair, hairStyle, glasses, beard, scrubs, pin } = spec
  const clipId = `portrait-${useId().replace(/:/g, "")}`
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("block w-full", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="100" cy="100" r="96" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="96" fill={SOFT[scrubs]} />
      <g clipPath={`url(#${clipId})`}>
        {/* волосы сзади */}
        {(hairStyle === "bob" || hairStyle === "long") && (
          <path
            d={
              hairStyle === "long"
                ? "M54 96 C 46 46 76 34 100 34 C 128 34 156 48 146 98 C 150 130 154 160 150 176 L 50 176 C 46 160 50 130 54 96 Z"
                : "M56 92 C 50 48 76 34 100 34 C 128 34 152 50 144 96 L 148 126 L 52 126 Z"
            }
            fill={hair}
            stroke={INK}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        )}
        {hairStyle === "bun" && <circle cx="100" cy="40" r="17" fill={hair} stroke={INK} strokeWidth="3.5" />}

        {/* плечи и форма */}
        <path
          d="M22 206 C 26 156 66 140 100 140 C 134 140 174 156 178 206 Z"
          fill={toneVar[scrubs]}
          stroke={INK}
          strokeWidth="3.5"
        />
        <path d="M84 141 L 100 164 L 116 141 Z" fill={skin} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <rect x="88" y="116" width="24" height="30" rx="10" fill={skin} stroke={INK} strokeWidth="3.5" />
        <path
          d="M120 176 h22 v14 h-22 Z"
          fill="none"
          stroke={INK}
          strokeWidth="2.6"
          strokeLinejoin="round"
          opacity=".55"
        />
        <Pin kind={pin} />

        {/* голова */}
        <circle cx="62" cy="94" r="9" fill={skin} stroke={INK} strokeWidth="3.2" />
        <circle cx="138" cy="94" r="9" fill={skin} stroke={INK} strokeWidth="3.2" />
        <ellipse cx="100" cy="88" rx="38" ry="42" fill={skin} stroke={INK} strokeWidth="3.5" />

        {beard && (
          <path
            d="M64 96 C 66 124 84 134 100 134 C 116 134 134 124 136 96 C 128 114 116 118 100 118 C 84 118 72 114 64 96 Z"
            fill={hair}
            stroke={INK}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        )}

        {/* волосы спереди */}
        <HairFront style={hairStyle} color={hair} />

        {/* лицо */}
        <ellipse cx="78" cy="104" rx="7" ry="4" fill="var(--color-coral)" opacity=".45" />
        <ellipse cx="122" cy="104" rx="7" ry="4" fill="var(--color-coral)" opacity=".45" />
        <path d="M78 80 q7 -5 14 0 M108 80 q7 -5 14 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <circle cx="86" cy="92" r="4.2" fill={INK} />
        <circle cx="114" cy="92" r="4.2" fill={INK} />
        <circle cx="87.6" cy="90.4" r="1.4" fill="#fff" />
        <circle cx="115.6" cy="90.4" r="1.4" fill="#fff" />
        {glasses && (
          <g fill="none" stroke={INK} strokeWidth="3">
            <circle cx="86" cy="92" r="11" />
            <circle cx="114" cy="92" r="11" />
            <path d="M97 91 q3 -2 6 0 M75 90 l-11 -3 M125 90 l11 -3" strokeLinecap="round" />
          </g>
        )}
        <path d="M100 96 q-3 7 1 9" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" opacity=".6" />
        <path
          d="M88 110 Q 100 121 112 110"
          fill={beard ? "#fff" : "none"}
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle cx="100" cy="100" r="96" fill="none" stroke={INK} strokeWidth="3.5" />
    </svg>
  )
}

function HairFront({ style, color }: { style: PortraitSpec["hairStyle"]; color: string }) {
  const common = { fill: color, stroke: INK, strokeWidth: 3.5, strokeLinejoin: "round" as const }
  switch (style) {
    case "bun":
      return (
        <path
          d="M62 86 C 58 54 78 44 100 44 C 124 44 142 54 138 86 C 128 66 112 60 100 62 C 88 60 72 66 62 86 Z"
          {...common}
        />
      )
    case "short":
      return (
        <path
          d="M62 84 C 56 50 80 40 104 42 C 128 42 146 56 138 86 C 132 68 118 60 98 62 C 86 64 72 72 62 84 Z"
          {...common}
        />
      )
    case "bob":
    case "long":
      return (
        <path
          d="M62 94 C 58 56 80 44 100 44 C 124 44 144 58 138 94 C 132 70 118 62 106 60 C 96 70 76 76 62 94 Z"
          {...common}
        />
      )
    case "curly":
      return (
        <g {...common}>
          {[
            [66, 70, 12],
            [76, 54, 13],
            [94, 46, 13],
            [112, 46, 13],
            [128, 54, 13],
            [136, 70, 12],
            [100, 58, 12],
          ].map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
          ))}
        </g>
      )
    case "buzz":
      return (
        <path
          d="M63 80 C 62 54 80 44 100 44 C 122 44 139 54 137 80 C 128 66 114 62 100 62 C 86 62 72 66 63 80 Z"
          fill={color}
          stroke={INK}
          strokeWidth="3.5"
          opacity="0.92"
        />
      )
  }
}

function Pin({ kind }: { kind: PortraitSpec["pin"] }) {
  return (
    <g transform="translate(66 170)">
      <circle r="13" fill="var(--color-paper)" stroke={INK} strokeWidth="2.8" />
      {kind === "dino" && (
        <path
          d="M-7 5 C -8 -2 -2 -6 3 -4 L 5 -9 L 8 -7 L 6 -2 C 8 2 6 6 2 6 Z"
          fill="var(--color-mint-deep)"
          stroke={INK}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}
      {kind === "star" && (
        <path
          d="M0 -8 L2.4 -2.6 L8 -2.4 L3.6 1.2 L5 7 L0 3.8 L-5 7 L-3.6 1.2 L-8 -2.4 L-2.4 -2.6 Z"
          fill="var(--color-sun)"
          stroke={INK}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}
      {kind === "heart" && (
        <path
          d="M0 7 C -9 1 -8 -7 -3 -7 C -1 -7 0 -5 0 -4 C 0 -5 1 -7 3 -7 C 8 -7 9 1 0 7 Z"
          fill="var(--color-coral)"
          stroke={INK}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}
      {kind === "rocket" && (
        <g stroke={INK} strokeWidth="1.8" strokeLinejoin="round">
          <path d="M0 -9 C 5 -5 5 2 3 6 H -3 C -5 2 -5 -5 0 -9 Z" fill="var(--color-sky)" />
          <path d="M-3 6 L -2 9 L 2 9 L 3 6" fill="var(--color-coral)" />
        </g>
      )}
      {kind === "fish" && (
        <g stroke={INK} strokeWidth="1.8" strokeLinejoin="round">
          <path d="M-7 0 C -4 -6 4 -6 6 0 C 4 6 -4 6 -7 0 Z" fill="var(--color-sun)" />
          <path d="M6 0 l4 -4 v8 Z" fill="var(--color-sun-deep)" />
        </g>
      )}
    </g>
  )
}
