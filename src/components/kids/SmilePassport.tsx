import { useId, useState } from "react"
import NumberFlow from "@number-flow/react"
import { GryshaFace } from "@/components/mascot/Grysha"
import { Button } from "@/components/ui/button"
import { IconRefresh, IconStar, IconAlert } from "@/components/icons"
import { badges, STAMPS_PER_PAGE, stampLabels } from "@/data/passport"
import { usePassport } from "@/store/passport"
import { toneBg } from "@/lib/tone"
import { cn } from "@/lib/utils"

const stampTilt = ["-9deg", "6deg", "-4deg", "10deg", "-7deg", "3deg"]
const stampTone = [
  "var(--color-coral-deep)",
  "var(--color-mint-deep)",
  "var(--color-lav-deep)",
  "var(--color-sky-deep)",
  "var(--color-coral-deep)",
  "var(--color-mint-deep)",
]

/**
 * «Паспорт улыбки» — демо геймификации повторных визитов.
 * Состояние в zustand: живёт, пока открыта вкладка, и переживает переходы по страницам.
 */
export function SmilePassport() {
  const { visits, stars, earned, addVisit, reset } = usePassport()
  const [hero, setHero] = useState("")
  const nameId = useId()
  const full = visits >= STAMPS_PER_PAGE

  return (
    <div className="relative">
      <div className="grid overflow-hidden rounded-[34px] border-4 border-ink bg-lav shadow-plush-lg md:grid-cols-2">
        {/* левая страница */}
        <div className="relative border-b-4 border-dashed border-ink/25 bg-paper p-6 sm:p-8 md:border-r-4 md:border-b-0">
          <div className="flex items-center gap-3">
            <span className="grid size-14 place-items-center rounded-full bg-lav-soft ring-4 ring-lav">
              <GryshaFace className="w-[88%]" />
            </span>
            <div>
              <p className="text-[12px] font-extrabold tracking-[0.1em] text-lav-ink uppercase">Паспорт улыбки</p>
              <p className="font-display text-2xl leading-tight font-black">
                {hero.trim() ? hero.trim() : "Герой без имени"}
              </p>
            </div>
          </div>
          <label htmlFor={nameId} className="mt-5 block text-[14px] font-bold">
            Как зовут героя?
          </label>
          <input
            id={nameId}
            name="hero-name"
            value={hero}
            onChange={(e) => setHero(e.target.value.slice(0, 24))}
            placeholder="Впиши своё имя…"
            autoComplete="off"
            className="mt-1.5 h-11 w-full rounded-2xl border-2 border-ink/15 bg-cream px-4 font-hand text-xl outline-none focus-visible:border-ink focus-visible:shadow-[0_0_0_4px_var(--color-sun)]"
          />

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-2xl bg-sun px-4 py-3 shadow-plush-sm">
              <IconStar filled size={30} className="text-sun-deep" />
              <span className="font-display text-3xl leading-none font-black" aria-label={`Звёзд: ${stars}`}>
                <NumberFlow value={stars} />
              </span>
            </div>
            <p className="text-[15px] text-ink-soft">Звёзды — за игры в Детской зоне. Штампы — за визиты к врачу.</p>
          </div>

          <h3 className="mt-6 text-[15px] font-extrabold">Значки</h3>
          <ul className="mt-2 grid grid-cols-3 gap-2.5">
            {badges.map((b) => {
              const got = earned.includes(b.id)
              return (
                <li
                  key={b.id}
                  className={cn(
                    "flex flex-col items-center rounded-2xl px-1.5 py-2.5 text-center transition-[background-color,scale] duration-300 ease-[var(--ease-spring)]",
                    got
                      ? cn(toneBg[b.tone], "scale-100 shadow-plush-sm")
                      : "scale-[0.97] border-2 border-dashed border-ink/20",
                  )}
                >
                  <span
                    className={cn("grid size-9 place-items-center rounded-full", got ? "bg-paper" : "bg-ink/5")}
                    aria-hidden="true"
                  >
                    <IconStar filled={got} size={20} className={got ? "text-sun-deep" : "text-ink/25"} />
                  </span>
                  <span className={cn("mt-1 text-[13px] leading-tight font-extrabold", !got && "text-ink-soft")}>
                    {b.title}
                  </span>
                  <span className="mt-0.5 text-[11.5px] leading-tight text-ink-soft">{got ? "получен!" : b.how}</span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* правая страница — штампы */}
        <div className="bg-lav-soft p-6 sm:p-8">
          <p className="font-display text-xl font-black">Визиты к Грыше</p>
          <p className="text-[15px] text-ink-soft">
            {visits} из {STAMPS_PER_PAGE} — {full ? "страница заполнена!" : "за каждый визит — штамп"}
          </p>
          <ol className="mt-5 grid grid-cols-3 gap-3" aria-label="Штампы визитов">
            {Array.from({ length: STAMPS_PER_PAGE }, (_, i) => {
              const filled = i < visits
              return (
                <li
                  key={i}
                  className="relative grid aspect-square place-items-center rounded-full border-2 border-dashed border-lav-deep/60 bg-paper/60"
                  aria-label={filled ? `Штамп ${i + 1}: ${stampLabels[i]}` : `Пустое место для штампа ${i + 1}`}
                >
                  {filled ? (
                    <span
                      className="grid size-[92%] animate-[stamp-in_420ms_var(--ease-out)_both] place-items-center rounded-full border-[3px] bg-paper motion-reduce:animate-none"
                      style={
                        {
                          "--r": stampTilt[i],
                          borderColor: stampTone[i],
                          color: stampTone[i],
                          transform: `rotate(${stampTilt[i]})`,
                        } as React.CSSProperties
                      }
                    >
                      <span className="flex flex-col items-center leading-none">
                        <span className="w-9 sm:w-11">
                          <GryshaFace pose={i % 2 ? "happy" : "greet"} />
                        </span>
                        <span className="mt-0.5 px-1 text-center text-[10px] font-black tracking-[0.04em] uppercase sm:text-[11px]">
                          {stampLabels[i]}
                        </span>
                      </span>
                    </span>
                  ) : (
                    <span className="font-display text-xl font-black text-lav-ink">{i + 1}</span>
                  )}
                </li>
              )
            })}
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="lav" onClick={addVisit} disabled={full} data-testid="passport-stamp">
              {full ? "Страница заполнена" : "Поставить штамп за визит"}
            </Button>
            <Button variant="ghost" onClick={reset}>
              <IconRefresh size={18} /> Начать заново
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-4 flex items-start gap-2 text-[14.5px] text-ink-soft">
        <IconAlert size={18} className="mt-0.5 shrink-0 text-coral-ink" />
        Демо: штампы и звёзды живут, пока открыта вкладка, и ничего не сохраняют. В клинике паспорт настоящий —
        бумажный, с резиновыми штампами.
      </p>
    </div>
  )
}
