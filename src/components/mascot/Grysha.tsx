import { useId } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

/**
 * Грыша — бобёр-стоматолог, талисман клиники «Бобрый доктор».
 *
 * Один SVG-скелет, шесть поз. Позы отличаются углами лап, лицом, наклоном
 * головы и реквизитом — поэтому персонаж выглядит одинаково на всех страницах.
 * Чтобы заменить на финальную графику, достаточно сохранить API
 * `<Grysha pose="..." />` (см. README → «Как заменить маскота»).
 */

export type GryshaPose = "greet" | "explain" | "happy" | "cheer" | "bye" | "think"

type Eyes = "open" | "side" | "up" | "joy" | "wink"
type Mouth = "smile" | "open" | "talk" | "grin" | "hmm"
type Brows = "happy" | "raised" | "brave" | "think"

interface PoseDef {
  armL: number
  armR: number
  wave?: "L" | "R"
  eyes: Eyes
  mouth: Mouth
  brows: Brows
  tilt: number
  prop?: "brush" | "star"
  balloon?: boolean
  bubble?: boolean
  sparkles?: boolean
}

const POSES: Record<GryshaPose, PoseDef> = {
  greet: { armL: 14, armR: -128, wave: "R", eyes: "open", mouth: "smile", brows: "happy", tilt: -2 },
  explain: { armL: 14, armR: -116, eyes: "side", mouth: "talk", brows: "raised", tilt: 4, prop: "brush" },
  happy: { armL: 124, armR: -124, eyes: "joy", mouth: "open", brows: "happy", tilt: 0, sparkles: true },
  cheer: { armL: 20, armR: -136, eyes: "wink", mouth: "grin", brows: "brave", tilt: -5, prop: "star" },
  bye: { armL: 128, armR: -16, wave: "L", eyes: "joy", mouth: "smile", brows: "happy", tilt: -7, balloon: true },
  think: { armL: 14, armR: -136, eyes: "up", mouth: "hmm", brows: "think", tilt: 6, bubble: true },
}

export const GRYSHA_LABELS: Record<GryshaPose, string> = {
  greet: "Бобр Грыша в мятной шапочке машет лапой",
  explain: "Бобр Грыша объясняет, показывая зубной щёткой",
  happy: "Бобр Грыша радостно поднял лапы",
  cheer: "Бобр Грыша подмигивает и держит звезду",
  bye: "Бобр Грыша с воздушным шариком машет на прощание",
  think: "Бобр Грыша тянет лапу — у него вопрос",
}

interface Paint {
  fur: string
  furDark: string
  furLight: string
  line: string
  mint: string
  mintDeep: string
  coral: string
  sun: string
  white: string
  mouth: string
  blush: string
  shadow: string
}

const COLOR: Paint = {
  fur: "var(--color-fur)",
  furDark: "var(--color-fur-dark)",
  furLight: "var(--color-fur-light)",
  line: "var(--color-line)",
  mint: "var(--color-mint)",
  mintDeep: "var(--color-mint-deep)",
  coral: "var(--color-coral)",
  sun: "var(--color-sun)",
  white: "#fff",
  mouth: "#6b2c1f",
  blush: "var(--color-coral)",
  shadow: "rgb(170 92 46 / 0.16)",
}

/* Раскраска: всё белое, контуры чёрные — печатается на любом принтере */
const LINE: Paint = {
  fur: "#fff",
  furDark: "#fff",
  furLight: "#fff",
  line: "#1f1b18",
  mint: "#fff",
  mintDeep: "#fff",
  coral: "#fff",
  sun: "#fff",
  white: "#fff",
  mouth: "#fff",
  blush: "transparent",
  shadow: "transparent",
}

const L_SHOULDER = { x: 88, y: 180 }
const R_SHOULDER = { x: 152, y: 180 }

export interface GryshaProps {
  pose?: GryshaPose
  className?: string
  /** Покачивание, моргание, хвост и взмах лапой. Уважает prefers-reduced-motion. */
  animated?: boolean
  variant?: "color" | "line"
  /** Белая кайма-наклейка вокруг силуэта */
  sticker?: boolean
  /** Декоративный — скрыть от скринридеров */
  decorative?: boolean
  label?: string
  /** Для вложения в другой SVG (раскраски): без CSS-классов, с явной геометрией */
  bare?: { x: number; y: number; width: number; height: number }
}

export function Grysha({
  pose = "greet",
  className,
  animated = true,
  variant = "color",
  sticker = false,
  decorative = false,
  label,
  bare,
}: GryshaProps) {
  const p = POSES[pose]
  const c = variant === "line" ? LINE : COLOR
  const uid = useId().replace(/:/g, "")
  // петли стартуют, когда персонаж впервые попал в экран (иначе те, что ниже сгиба, «отыграют» невидимыми)
  const { ref, inView } = useInView<SVGSVGElement>({ rootMargin: "0px", threshold: 0.35 })
  const play = animated && inView
  const sw = 3.6
  const halo = sticker && variant === "color"

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 290"
      {...(bare ?? { className: cn("block h-auto w-full select-none", animated && "motion-loop", className) })}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : (label ?? GRYSHA_LABELS[pose])}
      data-pose={pose}
    >
      <defs>
        <clipPath id={`tail-${uid}`}>
          <path d="M0 -12 C 22 -28 66 -28 74 -4 C 80 16 42 28 0 12 Z" />
        </clipPath>
      </defs>

      {/* тень на полу — не качается вместе с персонажем */}
      <ellipse cx="120" cy="279" rx="62" ry="7" fill={c.shadow} />

      <g style={play ? { animation: "var(--animate-bob)", transformBox: "view-box" } : undefined}>
        {halo && <Silhouette p={p} />}

        {/* ── хвост ── */}
        <g transform="translate(158 238) rotate(-24)">
          <g
            style={
              play
                ? { animation: "var(--animate-wag)", transformOrigin: "0px 0px", transformBox: "view-box" }
                : undefined
            }
          >
            <path
              d="M0 -12 C 22 -28 66 -28 74 -4 C 80 16 42 28 0 12 Z"
              fill={c.furDark}
              stroke={c.line}
              strokeWidth={sw}
              strokeLinejoin="round"
            />
            <g
              clipPath={`url(#tail-${uid})`}
              stroke={variant === "line" ? c.line : "rgb(59 36 23 / 0.35)"}
              strokeWidth="1.6"
            >
              {[14, 26, 38, 50, 62].map((x) => (
                <path key={x} d={`M${x} -30 L${x + 14} 30`} />
              ))}
              {[-8, 2, 12].map((y) => (
                <path key={y} d={`M0 ${y} L80 ${y - 6}`} />
              ))}
            </g>
          </g>
        </g>

        {/* ── лапки-ступни ── */}
        {[96, 144].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="266" rx="22" ry="11" fill={c.furDark} stroke={c.line} strokeWidth={sw} />
            <path
              d={`M${x - 6} 260 v6 M${x + 6} 260 v6`}
              stroke={c.line}
              strokeWidth="2"
              strokeLinecap="round"
              opacity={0.6}
            />
          </g>
        ))}

        {/* ── тело + мятный костюмчик ── */}
        <path
          d="M84 160 C 64 192 64 250 98 260 L 142 260 C 176 250 176 192 156 160 Z"
          fill={c.fur}
          stroke={c.line}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
        <ellipse cx="120" cy="246" rx="27" ry="12" fill={c.furLight} />
        <path
          d="M86 162 C 73 188 72 214 76 232 Q 120 243 164 232 C 168 214 167 188 154 162 Q 120 152 86 162 Z"
          fill={c.mint}
          stroke={c.line}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
        <path d="M105 158 L120 182 L135 158" fill={c.fur} stroke={c.line} strokeWidth="2.6" strokeLinejoin="round" />
        {/* кармашек со щёткой */}
        <rect x="137" y="184" width="5" height="20" rx="2.5" fill={c.coral} stroke={c.line} strokeWidth="2" />
        <rect x="134.5" y="176" width="10" height="11" rx="3" fill={c.white} stroke={c.line} strokeWidth="2" />
        <path
          d="M144.5 178.5 h4 M144.5 181.5 h4.5 M144.5 184.5 h4"
          stroke={c.mintDeep}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="131" y="198" width="20" height="16" rx="5" fill={c.mint} stroke={c.line} strokeWidth="2.4" />
        <path
          d="M80 214 Q 120 224 160 214"
          fill="none"
          stroke={c.mintDeep}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="1 6"
        />

        {/* ── лапы ── */}
        <Arm shoulder={L_SHOULDER} angle={p.armL} waving={play && p.wave === "L"} c={c} sw={sw} />
        <Arm shoulder={R_SHOULDER} angle={p.armR} waving={play && p.wave === "R"} c={c} sw={sw} prop={p.prop} />

        {/* ── голова ── */}
        <g transform={`rotate(${p.tilt} 120 160)`}>
          <Head p={p} c={c} sw={sw} animated={play} variant={variant} />
        </g>

        {p.balloon && <Balloon c={c} sw={sw} animated={play} />}
        {p.bubble && <QuestionBubble c={c} sw={sw} />}
        {p.sparkles && <Sparkles c={c} />}
      </g>
    </svg>
  )
}

/** Только голова — для логотипа, аватарок и мелких мест */
export function GryshaFace({
  pose = "greet",
  className,
  animated = false,
}: {
  pose?: GryshaPose
  className?: string
  animated?: boolean
}) {
  return (
    <svg viewBox="40 18 160 150" className={cn("block h-auto w-full", className)} aria-hidden="true" focusable="false">
      <Head p={{ ...POSES[pose], tilt: 0 }} c={COLOR} sw={4.2} animated={animated} variant="color" />
    </svg>
  )
}

/* Белая подложка-наклейка по силуэту (без SVG-фильтров — дёшево при анимации) */
function Silhouette({ p }: { p: PoseDef }) {
  const s = { fill: "#fff", stroke: "#fff", strokeWidth: 16, strokeLinejoin: "round" as const }
  return (
    <g>
      <g transform="translate(158 238) rotate(-24)">
        <path d="M0 -12 C 22 -28 66 -28 74 -4 C 80 16 42 28 0 12 Z" {...s} />
      </g>
      <ellipse cx="96" cy="266" rx="22" ry="11" {...s} />
      <ellipse cx="144" cy="266" rx="22" ry="11" {...s} />
      <path d="M84 160 C 64 192 64 250 98 260 L 142 260 C 176 250 176 192 156 160 Z" {...s} />
      {[
        [L_SHOULDER, p.armL],
        [R_SHOULDER, p.armR],
      ].map(([sh, a], i) => {
        const { x, y } = sh as { x: number; y: number }
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${a as number})`}>
            <rect x="-11" y="-8" width="22" height="50" rx="11" {...s} />
            <circle cx="0" cy="45" r="12" {...s} />
          </g>
        )
      })}
      <g transform={`rotate(${p.tilt} 120 160)`}>
        <ellipse cx="120" cy="102" rx="68" ry="61" {...s} />
        <circle cx="58" cy="62" r="16" {...s} />
        <circle cx="182" cy="62" r="16" {...s} />
      </g>
    </g>
  )
}

function Arm({
  shoulder,
  angle,
  waving,
  c,
  sw,
  prop,
}: {
  shoulder: { x: number; y: number }
  angle: number
  waving: boolean
  c: Paint
  sw: number
  prop?: PoseDef["prop"]
}) {
  return (
    <g transform={`translate(${shoulder.x} ${shoulder.y}) rotate(${angle})`}>
      <g
        style={
          waving
            ? { animation: "var(--animate-wave)", transformOrigin: "0px 0px", transformBox: "view-box" }
            : undefined
        }
      >
        {prop === "brush" && (
          <g>
            <rect x="-3.5" y="34" width="7" height="50" rx="3.5" fill={c.coral} stroke={c.line} strokeWidth="2.4" />
            <rect x="-6" y="80" width="12" height="20" rx="4" fill={c.white} stroke={c.line} strokeWidth="2.4" />
            <path d="M6 83 h6 M6 88 h7 M6 93 h6" stroke={c.mintDeep} strokeWidth="3" strokeLinecap="round" />
          </g>
        )}
        <rect x="-9.5" y="0" width="19" height="42" rx="9.5" fill={c.fur} stroke={c.line} strokeWidth={sw} />
        <rect x="-12" y="-9" width="24" height="22" rx="11" fill={c.mint} stroke={c.line} strokeWidth={sw} />
        <circle cx="0" cy="44" r="11.5" fill={c.furLight} stroke={c.line} strokeWidth={sw} />
        <path d="M-5 50 q5 3 10 0" fill="none" stroke={c.line} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        {prop === "star" && (
          <g transform="translate(0 64) rotate(12)">
            <path
              d="M0 -19 L5.6 -6.4 L19 -5.8 L8.6 3 L12 16.4 L0 9 L-12 16.4 L-8.6 3 L-19 -5.8 L-5.6 -6.4 Z"
              fill={c.sun}
              stroke={c.line}
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          </g>
        )}
      </g>
    </g>
  )
}

function Head({
  p,
  c,
  sw,
  animated,
  variant,
}: {
  p: PoseDef
  c: Paint
  sw: number
  animated: boolean
  variant: "color" | "line"
}) {
  return (
    <g>
      {/* голова */}
      <ellipse cx="120" cy="102" rx="66" ry="59" fill={c.fur} stroke={c.line} strokeWidth={sw} />
      {/* шапочка в горошек */}
      <path
        d="M57 88 C 48 42 86 22 120 22 C 154 22 192 42 183 88 C 160 64 80 64 57 88 Z"
        fill={c.mint}
        stroke={c.line}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M63 80 C 90 66 150 66 177 80"
        fill="none"
        stroke={c.mintDeep}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={variant === "line" ? 0 : 1}
      />
      {[
        [96, 44, 4.5],
        [128, 38, 5],
        [150, 56, 4],
        [78, 64, 3.6],
        [112, 60, 3.4],
        [164, 72, 3],
      ].map(([x, y, r]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          fill={variant === "line" ? "none" : "#fff"}
          stroke={variant === "line" ? c.line : "none"}
          strokeWidth="1.6"
        />
      ))}
      {/* уши торчат сквозь шапочку */}
      {[58, 182].map((x) => (
        <g key={x}>
          <circle cx={x} cy="62" r="15" fill={c.fur} stroke={c.line} strokeWidth={sw} />
          <circle cx={x} cy="63" r="7" fill={c.furDark} stroke={variant === "line" ? c.line : "none"} strokeWidth="2" />
        </g>
      ))}

      {/* румянец */}
      <ellipse cx="80" cy="124" rx="10" ry="6" fill={c.blush} opacity="0.55" />
      <ellipse cx="160" cy="124" rx="10" ry="6" fill={c.blush} opacity="0.55" />

      <Brows kind={p.brows} c={c} />
      <EyesGroup kind={p.eyes} c={c} animated={animated} />

      {/* рот → зубы → мордочка (мордочка накрывает верх зубов) */}
      <MouthShape kind={p.mouth} c={c} />
      <g>
        <path
          d="M109 131 h22 v16 q0 6 -6 6 h-10 q-6 0 -6 -6 Z"
          fill={c.white}
          stroke={c.line}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M120 133 v19" stroke={c.line} strokeWidth="2.2" />
      </g>
      <path
        d="M89 124 C 89 104 117 102 120 114 C 123 102 151 104 151 124 C 151 142 128 144 120 134 C 112 144 89 142 89 124 Z"
        fill={c.furLight}
        stroke={c.line}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {[
        [101, 124],
        [106, 130],
        [99, 131],
        [139, 124],
        [134, 130],
        [141, 131],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" fill={variant === "line" ? c.line : c.furDark} />
      ))}
      {p.mouth === "smile" && (
        <path
          d="M90 128 q3 7 9 8 M150 128 q-3 7 -9 8"
          fill="none"
          stroke={c.line}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      )}
      {/* нос */}
      <path
        d="M109 109 Q 120 102 131 109 Q 129 120 120 121 Q 111 120 109 109 Z"
        fill={variant === "line" ? c.line : c.line}
      />
      <ellipse cx="116" cy="109" rx="3.6" ry="2" fill="#fff" opacity="0.55" />
    </g>
  )
}

function EyesGroup({ kind, c, animated }: { kind: Eyes; c: Paint; animated: boolean }) {
  const open = (cx: number, dx = 0, dy = 0) => (
    <g key={cx}>
      <ellipse cx={cx + dx} cy={96 + dy} rx="8" ry="10.5" fill={c.line} />
      <circle cx={cx + dx + 2.6} cy={92 + dy} r="3" fill="#fff" />
      <circle cx={cx + dx - 2.4} cy={100 + dy} r="1.3" fill="#fff" />
    </g>
  )
  const joy = (cx: number) => (
    <path
      key={cx}
      d={`M${cx - 9} 99 Q ${cx} 87 ${cx + 9} 99`}
      fill="none"
      stroke={c.line}
      strokeWidth="4"
      strokeLinecap="round"
    />
  )
  const blink = animated && kind !== "joy"
  let eyes
  switch (kind) {
    case "joy":
      eyes = [joy(96), joy(144)]
      break
    case "wink":
      eyes = [joy(96), open(144)]
      break
    case "side":
      eyes = [open(96, 3), open(144, 3)]
      break
    case "up":
      eyes = [open(96, 1, -3), open(144, 1, -3)]
      break
    default:
      eyes = [open(96), open(144)]
  }
  return (
    <g
      style={
        blink ? { animation: "var(--animate-blink)", transformBox: "fill-box", transformOrigin: "center" } : undefined
      }
    >
      {eyes}
    </g>
  )
}

function Brows({ kind, c }: { kind: Brows; c: Paint }) {
  const d = {
    happy: "M88 81 Q 96 76 104 81 M136 81 Q 144 76 152 81",
    raised: "M88 81 Q 96 77 104 81 M136 77 Q 144 71 152 76",
    brave: "M88 77 L 104 82 M136 82 L 152 77",
    think: "M88 79 Q 96 74 104 79 M136 82 L 152 80",
  }[kind]
  return <path d={d} fill="none" stroke={c.line} strokeWidth="3.6" strokeLinecap="round" />
}

function MouthShape({ kind, c }: { kind: Mouth; c: Paint }) {
  switch (kind) {
    case "open":
      return (
        <g>
          <path
            d="M102 132 Q 120 176 138 132 Z"
            fill={c.mouth}
            stroke={c.line}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <ellipse cx="120" cy="160" rx="9" ry="5.5" fill={c.coral} />
        </g>
      )
    case "grin":
      return (
        <g>
          <path d="M98 131 Q 120 168 142 131 Z" fill={c.mouth} stroke={c.line} strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="124" cy="155" rx="8" ry="4.5" fill={c.coral} />
        </g>
      )
    case "talk":
      return (
        <path d="M100 131 Q 120 188 140 131 Z" fill={c.mouth} stroke={c.line} strokeWidth="3" strokeLinejoin="round" />
      )
    case "hmm":
      return <path d="M132 140 q7 3 12 -3" fill="none" stroke={c.line} strokeWidth="2.8" strokeLinecap="round" />
    default:
      return null
  }
}

function Balloon({ c, sw, animated }: { c: Paint; sw: number; animated: boolean }) {
  return (
    <g>
      <path d="M169 224 C 192 190 184 140 212 96" fill="none" stroke={c.line} strokeWidth="2" strokeLinecap="round" />
      <g transform="translate(8 -12)">
        <g
          style={
            animated
              ? { animation: "var(--animate-float)", transformBox: "fill-box", transformOrigin: "50% 100%" }
              : undefined
          }
        >
          {/* шарик-сердечко */}
          <path
            d="M204 108 C 176 88 172 58 192 52 C 200 50 204 56 204 60 C 204 56 208 50 216 52 C 236 58 232 88 204 108 Z"
            fill={c.coral}
            stroke={c.line}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path d="M188 64 q-2 8 3 14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </g>
      </g>
    </g>
  )
}

function QuestionBubble({ c, sw }: { c: Paint; sw: number }) {
  return (
    <g>
      <path
        d="M196 20 h30 a12 12 0 0 1 12 12 v18 a12 12 0 0 1 -12 12 h-18 l-10 10 l1 -10 h-3 a12 12 0 0 1 -12 -12 v-18 a12 12 0 0 1 12 -12 Z"
        fill={c.white}
        stroke={c.line}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <text
        x="211"
        y="52"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="900"
        fontSize="30"
        fill={c.line}
      >
        ?
      </text>
    </g>
  )
}

function Sparkles({ c }: { c: Paint }) {
  const star = (x: number, y: number, s: number, fill: string) => (
    <path
      key={`${x}-${y}`}
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -10 C 1.5 -2 2 -1.5 10 0 C 2 1.5 1.5 2 0 10 C -1.5 2 -2 1.5 -10 0 C -2 -1.5 -1.5 -2 0 -10 Z"
      fill={fill}
      stroke={c.line}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  )
  return (
    <g>
      {[star(26, 70, 1.3, c.sun), star(214, 60, 1.1, c.mint), star(40, 150, 0.8, c.coral), star(206, 140, 0.9, c.sun)]}
    </g>
  )
}
