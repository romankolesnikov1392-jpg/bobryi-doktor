import type { SceneId } from "@/data/visit"
import type { GryshaPose } from "@/components/mascot/Grysha"
import { Grysha } from "@/components/mascot/Grysha"
import { cn } from "@/lib/utils"

/*
 * Кадры комикса «Первый визит»: фон-сцена (SVG) + Грыша поверх (тот же компонент,
 * что и везде на сайте — поэтому персонаж выглядит одинаково).
 */
const INK = "var(--color-ink)"
const S = { stroke: INK, strokeWidth: 3.6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const }

export const scenePose: Record<SceneId, GryshaPose> = {
  playroom: "greet",
  chair: "explain",
  mirror: "think",
  tickle: "happy",
  talk: "cheer",
  diploma: "bye",
}

const WALL: Record<SceneId, string> = {
  playroom: "var(--color-sun-soft)",
  chair: "var(--color-sky-soft)",
  mirror: "var(--color-mint-soft)",
  tickle: "var(--color-lav-soft)",
  talk: "var(--color-coral-soft)",
  diploma: "var(--color-sun-soft)",
}

function Playroom() {
  return (
    <>
      <path d="M40 178 L 54 74 M68 178 L 80 74" {...S} />
      {[96, 118, 140, 162].map((y) => (
        <path key={y} d={`M${52 - (y - 74) * 0.13} ${y} H ${78 - (y - 74) * 0.11}`} {...S} strokeWidth={3} />
      ))}
      <rect x="46" y="64" width="40" height="13" rx="6" fill="var(--color-mint)" {...S} />
      <path
        d="M82 70 C 110 74 116 130 168 170 L 182 170 L 178 180 L 158 180 C 104 146 100 96 80 84 Z"
        fill="var(--color-coral)"
        {...S}
      />
      <rect x="186" y="30" width="62" height="48" rx="10" fill="var(--color-sky)" {...S} />
      <g transform="translate(218 56)">
        <path d="M-14 0 C -8 -10 6 -10 12 0 C 6 10 -8 10 -14 0 Z" fill="var(--color-sun)" {...S} strokeWidth={2.8} />
        <path d="M12 0 l8 -7 v14 Z" fill="var(--color-sun-deep)" {...S} strokeWidth={2.6} />
        <circle cx="-7" cy="-2" r="2" fill={INK} />
      </g>
      <rect
        x="20"
        y="150"
        width="22"
        height="22"
        rx="4"
        fill="var(--color-lav)"
        {...S}
        strokeWidth={3}
        transform="rotate(-8 31 161)"
      />
      <rect
        x="112"
        y="156"
        width="20"
        height="20"
        rx="4"
        fill="var(--color-mint)"
        {...S}
        strokeWidth={3}
        transform="rotate(10 122 166)"
      />
    </>
  )
}

function Chair() {
  return (
    <>
      {/* лампа-солнышко */}
      <path d="M40 20 C 80 18 110 26 128 46" fill="none" {...S} />
      <g transform="translate(136 56)">
        <ellipse rx="22" ry="14" fill="var(--color-sun)" {...S} />
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => (
          <path key={a} d="M0 -22 v-8" transform={`rotate(${a})`} stroke={INK} strokeWidth="3" strokeLinecap="round" />
        ))}
        <circle cx="-7" cy="-2" r="2" fill={INK} />
        <circle cx="7" cy="-2" r="2" fill={INK} />
        <path d="M-5 4 q5 4 10 0" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      </g>
      {/* кресло */}
      <path
        d="M40 140 C 40 118 56 110 76 110 L 150 110 C 168 110 176 120 176 134 L 176 142 L 40 142 Z"
        fill="var(--color-lav)"
        {...S}
      />
      <path d="M40 142 C 30 110 34 80 46 74 C 58 70 64 84 60 110" fill="var(--color-lav)" {...S} />
      <rect x="92" y="142" width="24" height="30" rx="4" fill="#dfe6ea" {...S} />
      <rect x="62" y="170" width="84" height="12" rx="6" fill="var(--color-ink)" />
      {/* стрелки «вжух» */}
      <g stroke="var(--color-coral-deep)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M86 102 v-34 M76 78 l10 -10 l10 10" />
        <path d="M106 96 v-24 M98 80 l8 -8 l8 8" />
      </g>
      <text
        x="18"
        y="56"
        fontFamily="var(--font-hand)"
        fontSize="22"
        fill="var(--color-coral-ink)"
        transform="rotate(-8 18 56)"
      >
        вжух!
      </text>
    </>
  )
}

function Mirror() {
  return (
    <>
      <g transform="rotate(-18 110 110)">
        <rect x="104" y="112" width="14" height="80" rx="7" fill="var(--color-coral)" {...S} />
        <circle cx="111" cy="78" r="44" fill="#fff" {...S} />
        <circle cx="111" cy="78" r="34" fill="var(--color-sky-soft)" stroke="var(--color-sky-deep)" strokeWidth="3" />
        {/* отражение: ряд зубов */}
        <path
          d="M84 70 q27 -14 54 0 v10 q-27 12 -54 0 Z"
          fill="var(--color-coral-soft)"
          stroke={INK}
          strokeWidth="2.6"
        />
        {[88, 98, 108, 118, 128].map((x) => (
          <rect key={x} x={x} y={70} width="9" height="11" rx="3" fill="#fff" stroke={INK} strokeWidth="2" />
        ))}
        <path d="M86 52 q10 -12 24 -12" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* счёт */}
      {[
        ["1", 74, 30],
        ["2", 30, 172],
        ["5", 158, 30],
        ["12", 196, 58],
        ["20!", 12, 112],
      ].map(([t, x, y]) => (
        <text
          key={t as string}
          x={x as number}
          y={y as number}
          fontFamily="var(--font-display)"
          fontWeight="900"
          fontSize={t === "20!" ? 30 : 22}
          fill="var(--color-mint-ink)"
          transform={`rotate(${((x as number) % 3) * 6 - 6} ${x} ${y})`}
        >
          {t}
        </text>
      ))}
    </>
  )
}

function Tickle() {
  return (
    <>
      <g transform="rotate(-28 120 110)">
        <rect x="30" y="100" width="150" height="20" rx="10" fill="var(--color-mint)" {...S} />
        <rect x="170" y="92" width="50" height="36" rx="10" fill="#fff" {...S} />
        {[178, 190, 202, 214].map((x) => (
          <path key={x} d={`M${x} 92 v-16`} stroke="var(--color-sky-deep)" strokeWidth="6" strokeLinecap="round" />
        ))}
        <path d="M44 106 h90" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".6" />
      </g>
      {[
        [196, 40, 14],
        [222, 70, 9],
        [172, 26, 8],
        [150, 58, 6],
        [60, 44, 10],
      ].map(([x, y, r]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={r} fill="#fff" stroke="var(--color-lav-deep)" strokeWidth="3" />
          <path
            d={`M${x - r * 0.4} ${y - r * 0.3} q${r * 0.2} ${-r * 0.3} ${r * 0.5} ${-r * 0.2}`}
            stroke="var(--color-lav-deep)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      ))}
      <text
        x="40"
        y="180"
        fontFamily="var(--font-hand)"
        fontSize="26"
        fill="var(--color-lav-ink)"
        transform="rotate(-6 40 180)"
      >
        хи-хи!
      </text>
    </>
  )
}

function Talk() {
  return (
    <>
      {/* план лечения */}
      <g transform="translate(-18 0) rotate(-5 90 100)">
        <rect x="40" y="40" width="100" height="126" rx="10" fill="var(--color-paper)" {...S} />
        <path d="M58 64 h62" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        {[88, 112, 136].map((y, i) => (
          <g key={y}>
            <rect
              x="56"
              y={y - 9}
              width="16"
              height="16"
              rx="4"
              fill={i < 2 ? "var(--color-mint)" : "#fff"}
              stroke={INK}
              strokeWidth="2.6"
            />
            {i < 2 && (
              <path
                d={`M59 ${y} l4 4 l7 -8`}
                fill="none"
                stroke={INK}
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <path d={`M80 ${y} h${40 - i * 8}`} stroke={INK} strokeWidth="3" strokeLinecap="round" opacity=".5" />
          </g>
        ))}
      </g>
      {/* чашки */}
      <g transform="translate(-30 0)">
        <path d="M156 150 h34 v16 a14 14 0 0 1 -14 14 h-6 a14 14 0 0 1 -14 -14 Z" fill="var(--color-coral)" {...S} />
        <path d="M190 154 a8 8 0 0 1 0 16" fill="none" {...S} />
        <path
          d="M166 142 q4 -8 0 -16 M178 142 q4 -8 0 -16"
          fill="none"
          stroke={INK}
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity=".5"
        />
      </g>
      <g transform="translate(150 22)">
        <path
          d="M0 0 h40 a10 10 0 0 1 10 10 v14 a10 10 0 0 1 -10 10 h-24 l-10 10 l2 -10 h-8 a10 10 0 0 1 -10 -10 v-14 a10 10 0 0 1 10 -10 Z"
          fill="#fff"
          {...S}
          strokeWidth={3}
        />
        <text
          x="20"
          y="25"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="900"
          fontSize="20"
          fill={INK}
        >
          ₽?
        </text>
      </g>
    </>
  )
}

function Diploma() {
  return (
    <>
      <g transform="translate(-18 -6) rotate(-6 110 100)">
        <rect x="34" y="44" width="150" height="104" rx="8" fill="var(--color-paper)" {...S} />
        <rect
          x="44"
          y="54"
          width="130"
          height="84"
          rx="4"
          fill="none"
          stroke="var(--color-sun-deep)"
          strokeWidth="3"
          strokeDasharray="6 5"
        />
        <text
          x="109"
          y="86"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight="900"
          fontSize="20"
          fill={INK}
        >
          ДИПЛОМ
        </text>
        <text
          x="109"
          y="106"
          textAnchor="middle"
          fontFamily="var(--font-hand)"
          fontSize="15"
          fill="var(--color-coral-ink)"
        >
          героя улыбки
        </text>
        <path d="M70 122 h78" stroke={INK} strokeWidth="2.6" strokeLinecap="round" opacity=".4" />
      </g>
      <g transform="translate(140 150)">
        <path d="M-10 6 L -16 36 L -4 28 L 4 38 L 6 8 Z" fill="var(--color-coral)" {...S} strokeWidth={3} />
        <circle r="20" fill="var(--color-sun)" {...S} />
        <path
          d="M0 -11 L3.2 -3.6 L11 -3.2 L5 1.8 L6.8 9.6 L0 5.4 L-6.8 9.6 L-5 1.8 L-11 -3.2 L-3.2 -3.6 Z"
          fill="#fff"
          stroke={INK}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      {[
        [20, 30, "var(--color-coral)"],
        [210, 24, "var(--color-mint-deep)"],
        [230, 110, "var(--color-lav-deep)"],
        [24, 170, "var(--color-sky-deep)"],
        [100, 186, "var(--color-coral)"],
      ].map(([x, y, c], i) => (
        <rect
          key={i}
          x={x as number}
          y={y as number}
          width="10"
          height="10"
          rx="2"
          fill={c as string}
          transform={`rotate(${i * 27} ${x} ${y})`}
        />
      ))}
    </>
  )
}

const SCENES: Record<SceneId, () => React.JSX.Element> = {
  playroom: Playroom,
  chair: Chair,
  mirror: Mirror,
  tickle: Tickle,
  talk: Talk,
  diploma: Diploma,
}

export function ComicScene({
  scene,
  className,
  mascotClassName,
  animated = false,
  wide = false,
}: {
  scene: SceneId
  className?: string
  mascotClassName?: string
  animated?: boolean
  /** На больших экранах — широкий кадр: сцена слева, стена тянется вправо */
  wide?: boolean
}) {
  const Scene = SCENES[scene]
  return (
    <div
      className={cn("relative overflow-hidden", wide && "lg:aspect-[16/8]", className)}
      style={{ background: WALL[scene] }}
    >
      {wide && <span aria-hidden="true" className="absolute inset-x-0 bottom-[7%] hidden h-[3px] bg-ink/25 lg:block" />}
      <svg
        viewBox="0 0 260 200"
        preserveAspectRatio="xMinYMax meet"
        className={cn("block w-full", wide && "lg:h-full")}
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 186 H 260" stroke={INK} strokeWidth="3" opacity=".25" />
        <Scene />
      </svg>
      <div className={cn("absolute right-[-2%] bottom-[-4%] w-[38%]", mascotClassName)}>
        <Grysha pose={scenePose[scene]} animated={animated} decorative />
      </div>
    </div>
  )
}
