import { useCallback, useEffect, useRef, useState } from "react"
import NumberFlow from "@number-flow/react"
import { Grysha, type GryshaPose } from "@/components/mascot/Grysha"
import { Button } from "@/components/ui/button"
import { IconPlay, IconRefresh, IconStar } from "@/components/icons"
import { brushGame } from "@/data/game"
import { usePassport } from "@/store/passport"
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion"
import { plural } from "@/lib/format"
import { cn } from "@/lib/utils"

type Phase = "idle" | "playing" | "won" | "lost"
interface ToothState {
  id: string
  row: "top" | "bottom"
  dirt: number
  hits: number
}

const fresh = (): ToothState[] =>
  brushGame.teeth.map((t) => ({ id: t.id, row: t.row, dirt: t.germ ? brushGame.scrubsPerTooth : 0, hits: 0 }))

const INK = "var(--color-ink)"
const TOOTH_PATH =
  "M8 4 C 13 2 17 5 20 5 C 23 5 27 2 32 4 C 38 7 38 16 36 21 C 34 26 34 30 32 36 C 31 40 28 41 27 38 C 25 33 24 29 20 29 C 16 29 15 33 13 38 C 12 41 9 40 8 36 C 6 30 6 26 4 21 C 2 16 2 7 8 4 Z"

/**
 * «Почисти зубки»: тапы, свайпы щёткой или Enter/Пробел по зубу.
 * Состояние — только в памяти; звёзды за победу уходят в «Паспорт улыбки».
 */
export function BrushGame() {
  const [phase, setPhase] = useState<Phase>("idle")
  const [teeth, setTeeth] = useState<ToothState[]>(fresh)
  const [left, setLeft] = useState(brushGame.duration)
  const [earnedStars, setEarnedStars] = useState(0)
  const [cheer, setCheer] = useState<string>(brushGame.phrases.idle)
  const [announce, setAnnounce] = useState("")
  const endsAt = useRef(0)
  const areaRef = useRef<HTMLDivElement>(null)
  const brushRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ active: boolean; lastX: number; lastY: number; acc: number; tooth: string | null }>({
    active: false,
    lastX: 0,
    lastY: 0,
    acc: 0,
    tooth: null,
  })
  const reduce = usePrefersReducedMotion()
  const { addStars, earn } = usePassport()

  const clean = teeth.filter((t) => t.dirt === 0).length
  const total = teeth.length

  const start = useCallback(() => {
    setTeeth(fresh())
    setLeft(brushGame.duration)
    setEarnedStars(0)
    endsAt.current = Date.now() + brushGame.duration * 1000
    setPhase("playing")
    setCheer(brushGame.phrases.playing[0])
    setAnnounce("Игра началась! 30 секунд.")
  }, [])

  // таймер: считаем от времени окончания, а не тиками — не «уплывает» при лагах
  useEffect(() => {
    if (phase !== "playing") return
    const id = window.setInterval(() => {
      const s = Math.max(0, Math.ceil((endsAt.current - Date.now()) / 1000))
      setLeft(s)
      if (s === 0) {
        setPhase("lost")
        setCheer(brushGame.phrases.lost)
        setAnnounce("Время вышло!")
      }
    }, 200)
    return () => window.clearInterval(id)
  }, [phase])

  // победа
  useEffect(() => {
    if (phase === "playing" && clean === total) {
      const secondsLeft = Math.max(0, Math.ceil((endsAt.current - Date.now()) / 1000))
      const stars = brushGame.stars.find((s) => secondsLeft >= s.minSecondsLeft)?.stars ?? 1
      setEarnedStars(stars)
      setPhase("won")
      setCheer(brushGame.phrases.won)
      setAnnounce(`Победа! Все зубы чистые. ${stars} ${plural(stars, ["звезда", "звезды", "звёзд"])} в паспорт.`)
      addStars(stars)
      earn("clean")
    }
  }, [clean, total, phase, addStars, earn])

  const scrub = useCallback(
    (id: string) => {
      if (phase === "won") return
      if (phase !== "playing") {
        start()
        return
      }
      setTeeth((prev) =>
        prev.map((t) => {
          if (t.id !== id || t.dirt === 0) return t
          const dirt = t.dirt - 1
          if (dirt === 0) setAnnounce(`Зуб ${prev.indexOf(t) + 1} чистый!`)
          return { ...t, dirt, hits: t.hits + 1 }
        }),
      )
      if (Math.random() < 0.25) {
        const list = brushGame.phrases.playing
        setCheer(list[Math.floor(Math.random() * list.length)])
      }
    },
    [phase, start],
  )

  // щётка-курсор + «чистка свайпом»
  const moveBrush = (x: number, y: number) => {
    const area = areaRef.current
    const brush = brushRef.current
    if (!area || !brush) return
    const r = area.getBoundingClientRect()
    brush.style.transform = `translate(${x - r.left - 12}px, ${y - r.top - 60}px) rotate(${drag.current.active ? -28 : -18}deg)`
  }

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { active: true, lastX: e.clientX, lastY: e.clientY, acc: 0, tooth: null }
    moveBrush(e.clientX, e.clientY)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    moveBrush(e.clientX, e.clientY)
    const d = drag.current
    if (!d.active || phase !== "playing") return
    d.acc += Math.hypot(e.clientX - d.lastX, e.clientY - d.lastY)
    d.lastX = e.clientX
    d.lastY = e.clientY
    const el = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-tooth]")
    const id = el?.dataset.tooth ?? null
    if (id !== d.tooth) {
      d.tooth = id
      d.acc = 0
    }
    if (id && d.acc > 34) {
      d.acc = 0
      scrub(id)
    }
  }
  const onPointerUp = () => {
    drag.current.active = false
  }

  const pose: GryshaPose =
    phase === "won" ? "happy" : phase === "lost" ? "think" : phase === "playing" ? "cheer" : "explain"
  const timePct = (left / brushGame.duration) * 100

  return (
    <div className="grid items-start gap-6 lg:grid-cols-12">
      {/* поле */}
      <div className="lg:col-span-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-paper py-1.5 pr-4 pl-1.5 shadow-plush-sm">
            <span
              className="grid size-10 place-items-center rounded-full font-display text-lg font-black tabular-nums"
              style={{
                background: `conic-gradient(${left <= 5 && phase === "playing" ? "var(--color-coral)" : "var(--color-mint-deep)"} ${timePct}%, var(--color-cream-2) 0)`,
              }}
            >
              <span className="grid size-8 place-items-center rounded-full bg-paper">
                <NumberFlow value={left} />
              </span>
            </span>
            <span className="text-[15px] font-bold">{plural(left, ["секунда", "секунды", "секунд"])}</span>
          </div>
          <div className="rounded-full bg-paper px-4 py-2.5 text-[15px] font-bold shadow-plush-sm">
            Чистых зубов: <NumberFlow value={clean} /> / {total}
          </div>
          {phase === "playing" && (
            <Button size="sm" variant="ghost" onClick={start}>
              <IconRefresh size={18} /> Заново
            </Button>
          )}
        </div>

        <div
          ref={areaRef}
          style={{ maxWidth: 720 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerCancel={onPointerUp}
          className={cn(
            "relative overflow-hidden rounded-[44px_40px_48px_42px] border-4 border-ink bg-[#7a3526] p-3 shadow-plush select-none sm:p-5",
            phase === "playing" && "touch-none [@media(pointer:fine)]:cursor-none",
          )}
          role="group"
          aria-label="Рот с зубами. Нажимайте на зубы или водите по ним щёткой, чтобы почистить."
        >
          {/* дёсны и язык */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[22%] rounded-b-[50%] bg-[#f59aa0]" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[22%] rounded-t-[50%] bg-[#f59aa0]" />
          <div
            aria-hidden="true"
            className="absolute bottom-[14%] left-1/2 h-[26%] w-[46%] -translate-x-1/2 rounded-t-full bg-[#e0707a]"
          />

          <div className="relative grid grid-cols-4 gap-2 sm:gap-4">
            {teeth.map((t, i) => (
              <Tooth
                key={t.id}
                index={i}
                tooth={t}
                phase={phase}
                reduce={reduce}
                name={brushGame.germNames[i % brushGame.germNames.length]}
                onScrub={() => scrub(t.id)}
                className={t.row === "top" ? "pb-3 sm:pb-6" : "pt-3 sm:pt-6"}
              />
            ))}
          </div>

          {/* оверлеи старта/финала */}
          {phase !== "playing" && (
            <div className="absolute inset-0 z-20 grid place-items-center bg-[rgb(46_42_38/0.45)] p-4 backdrop-blur-[2px]">
              <div className="animate-[success-pop_420ms_var(--ease-spring)_both] rounded-[28px] bg-paper px-6 py-5 text-center shadow-plush-lg motion-reduce:animate-none">
                {phase === "idle" && (
                  <>
                    <p className="font-display text-2xl font-black">Готов к чистке?</p>
                    <p className="mt-1 text-[15px] text-ink-soft">Три щёткой или нажимай на зубы</p>
                  </>
                )}
                {phase === "won" && (
                  <>
                    <p className="font-display text-3xl font-black">Все зубы блестят!</p>
                    <p className="mt-2 flex justify-center gap-1" aria-label={`${earnedStars} из 3 звёзд`}>
                      {[0, 1, 2].map((s) => (
                        <IconStar
                          key={s}
                          filled={s < earnedStars}
                          size={36}
                          className={cn(
                            s < earnedStars ? "text-sun-deep" : "text-ink/20",
                            "animate-[success-pop_500ms_var(--ease-spring)_both]",
                          )}
                          style={{ animationDelay: `${200 + s * 120}ms` }}
                        />
                      ))}
                    </p>
                    <p className="mt-1 text-[15px] text-ink-soft">Звёзды уже в «Паспорте улыбки»</p>
                  </>
                )}
                {phase === "lost" && (
                  <>
                    <p className="font-display text-2xl font-black">Время вышло!</p>
                    <p className="mt-1 text-[15px] text-ink-soft">
                      Почищено {clean} из {total}. Ещё разок?
                    </p>
                  </>
                )}
                <Button className="mt-4" size="lg" variant="sun" onClick={start} data-testid="game-start">
                  {phase === "idle" ? (
                    <>
                      <IconPlay size={18} /> Начать!
                    </>
                  ) : (
                    <>
                      <IconRefresh size={18} /> Сыграть ещё
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* щётка-курсор */}
          {!reduce && (
            <div
              ref={brushRef}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-0 left-0 z-10 w-28 transition-opacity duration-150",
                phase === "playing" ? "opacity-100" : "opacity-0",
              )}
              style={{ transform: "translate(60%, 40%) rotate(-18deg)" }}
            >
              <svg viewBox="0 0 120 40" className="w-full drop-shadow-[0_6px_6px_rgb(0_0_0/0.25)]">
                <rect
                  x="30"
                  y="16"
                  width="86"
                  height="12"
                  rx="6"
                  fill="var(--color-coral)"
                  stroke={INK}
                  strokeWidth="3"
                />
                <rect x="4" y="12" width="32" height="18" rx="6" fill="#fff" stroke={INK} strokeWidth="3" />
                {[8, 15, 22, 29].map((x) => (
                  <path
                    key={x}
                    d={`M${x} 12 v-10`}
                    stroke="var(--color-sky-deep)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Грыша комментирует */}
      <div className="flex items-end gap-3 lg:col-span-4 lg:flex-col lg:items-center">
        <div className="relative order-2 flex-1 rounded-[24px_26px_24px_6px] bg-paper px-5 py-4 shadow-plush lg:order-1 lg:w-full lg:rounded-[26px_26px_26px_26px]">
          <p className="text-[11px] font-extrabold tracking-[0.08em] text-ink-soft uppercase">Грыша говорит</p>
          <p key={cheer} className="animate-[bubble-in_240ms_var(--ease-out)] font-hand text-[20px] leading-snug">
            {cheer}
          </p>
        </div>
        <div className="order-1 w-32 shrink-0 sm:w-40 lg:order-2 lg:w-56">
          <Grysha pose={pose} />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  )
}

function Tooth({
  tooth,
  index,
  phase,
  reduce,
  name,
  onScrub,
  className,
}: {
  tooth: ToothState
  index: number
  phase: Phase
  reduce: boolean
  name: string
  onScrub: () => void
  className?: string
}) {
  const dirty = tooth.dirt > 0
  const dirtLevel = tooth.dirt / brushGame.scrubsPerTooth
  const top = tooth.row === "top"
  const label = `${top ? "Верхний" : "Нижний"} зуб ${(index % 4) + 1}: ${
    dirty
      ? `на нём микроб ${name}, осталось ${tooth.dirt} ${plural(tooth.dirt, ["движение", "движения", "движений"])}`
      : "чистый"
  }`

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        data-tooth={tooth.id}
        onClick={onScrub}
        aria-label={label}
        disabled={phase === "won"}
        className={cn(
          "group relative block w-full rounded-[18px] outline-none focus-visible:shadow-[0_0_0_4px_var(--color-sun)]",
          "transition-[scale] duration-150 ease-out active:scale-[0.96]",
        )}
      >
        <svg viewBox="0 0 40 44" className="block w-full" aria-hidden="true">
          <g transform={top ? "translate(0 44) scale(1 -1)" : undefined}>
            <path
              d={TOOTH_PATH}
              transform="translate(0 2)"
              fill="#fff"
              stroke={INK}
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* налёт */}
            <g opacity={dirtLevel} className="transition-opacity duration-200">
              <ellipse cx="13" cy="14" rx="6" ry="4" fill="#d6c24a" />
              <ellipse cx="27" cy="19" rx="5" ry="3.4" fill="#c9b43a" />
              <circle cx="20" cy="10" r="3" fill="#b8c95a" />
            </g>
          </g>
          {/* лицо — всегда «вверх головой» */}
          <g transform={top ? "translate(0 14)" : "translate(0 2)"}>
            {dirty ? (
              <>
                <path d="M13 12 l4 1.5 M27 12 l-4 1.5" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="15" cy="15" r="1.6" fill={INK} />
                <circle cx="25" cy="15" r="1.6" fill={INK} />
                <path d="M16 21 q4 -3 8 0" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path
                  d="M12 15 q3 -4 6 0 M22 15 q3 -4 6 0"
                  fill="none"
                  stroke={INK}
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
                <path d="M15 19 q5 5 10 0" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
                <ellipse cx="11" cy="19" rx="2.4" ry="1.4" fill="var(--color-coral)" opacity=".7" />
                <ellipse cx="29" cy="19" rx="2.4" ry="1.4" fill="var(--color-coral)" opacity=".7" />
              </>
            )}
          </g>
        </svg>

        {/* микроб: трясётся от каждого движения, улетает, когда зуб чистый */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute -top-1 -right-1 w-[46%] transition-[translate,scale,opacity] duration-300 ease-out",
            top ? "top-auto -bottom-1" : "",
            dirty ? "opacity-100" : "-translate-y-6 scale-50 opacity-0",
          )}
        >
          <span
            key={tooth.hits}
            className={cn("block", !reduce && tooth.hits > 0 && "animate-[wiggle_320ms_var(--ease-out)]")}
          >
            <svg viewBox="0 0 30 26" className="block w-full">
              <path
                d="M3 12 C 1 4 11 -1 17 3 C 26 1 29 12 24 16 C 24 24 9 25 5 19 C -1 19 -1 13 3 12 Z"
                fill="var(--color-lav)"
                stroke={INK}
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="11" cy="11" r="1.8" fill={INK} />
              <circle cx="18" cy="10" r="1.8" fill={INK} />
              <path d="M11 16 q4 3 8 0" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
              <path d="M8 3 l-2 -3 M22 3 l2 -3" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        </span>

        {/* пена от щётки */}
        {!reduce && tooth.hits > 0 && (
          <span key={`foam-${tooth.hits}`} aria-hidden="true" className="pointer-events-none absolute inset-0">
            {[0, 1, 2].map((b) => (
              <span
                key={b}
                className="absolute size-3 rounded-full border-2 border-sky-deep bg-white/90"
                style={{
                  left: `${22 + b * 22}%`,
                  top: "40%",
                  animation: `foam 560ms var(--ease-out) ${b * 40}ms both`,
                }}
              />
            ))}
          </span>
        )}

        {/* блеск чистого зуба */}
        {!dirty && (
          <span
            aria-hidden="true"
            className="absolute top-[18%] left-[18%] w-[28%] animate-[success-pop_420ms_var(--ease-spring)_both] motion-reduce:animate-none"
          >
            <svg viewBox="-12 -12 24 24" className="w-full">
              <path
                d="M0 -10 C 1.5 -2 2 -1.5 10 0 C 2 1.5 1.5 2 0 10 C -1.5 2 -2 1.5 -10 0 C -2 -1.5 -1.5 -2 0 -10 Z"
                fill="var(--color-sun)"
                stroke={INK}
                strokeWidth="1.6"
              />
            </svg>
          </span>
        )}
      </button>
    </div>
  )
}
