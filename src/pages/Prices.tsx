import { useDeferredValue, useId, useMemo } from "react"
import { useSearchParams } from "react-router"
import { PageMeta } from "@/components/PageMeta"
import { PageHero } from "@/components/PageHero"
import { Reveal } from "@/components/Reveal"
import { CategoryArt } from "@/components/illustrations/CategoryArt"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IconAlert, IconClose } from "@/components/icons"
import { categories, services } from "@/data/services"
import { formatPrice, plural } from "@/lib/format"
import { toneSoft } from "@/lib/tone"
import { useBooking } from "@/store/booking"
import { cn } from "@/lib/utils"

export default function Prices() {
  const [params, setParams] = useSearchParams()
  const query = params.get("q") ?? ""
  const setQuery = (v: string) => {
    const next = new URLSearchParams(params)
    if (v) next.set("q", v)
    else next.delete("q")
    setParams(next, { replace: true, preventScrollReset: true })
  }
  const q = useDeferredValue(query.trim().toLowerCase())
  const searchId = useId()
  const openBooking = useBooking((s) => s.openBooking)

  const filtered = useMemo(
    () => (q ? services.filter((s) => `${s.name} ${s.description}`.toLowerCase().includes(q)) : services),
    [q],
  )

  return (
    <>
      <PageMeta
        title="Цены"
        description="Полный прайс-лист детской стоматологии «Бобрый доктор»: профилактика, лечение кариеса, ортодонтия, хирургия, экстренная помощь."
      />
      <PageHero
        crumb="Цены"
        eyebrow="Прайс-лист"
        title="Цены без звёздочек мелким шрифтом"
        lead="Мы пишем цену «от» — это минимальная стоимость услуги. Итоговую сумму врач назовёт после осмотра и до начала лечения."
        pose="explain"
        kid="Я посчитал все зубы, а взрослые — все цены. Всё по-честному!"
        tone="mint"
        blob={2}
      />

      <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6" aria-label="Прайс-лист">
        <div className="flex items-start gap-3 rounded-[24px] bg-sun p-5 shadow-plush-sm sm:p-6">
          <IconAlert size={24} className="mt-0.5 shrink-0" />
          <p className="text-[16.5px]">
            <strong>Итоговая стоимость уточняется на очной консультации</strong> и зависит от клинической ситуации:
            количества зубов, глубины кариеса, выбранного материала и способа обезболивания. Цены не являются публичной
            офертой.
          </p>
        </div>

        {/* поиск + навигация по категориям */}
        <div className="sticky top-[68px] z-20 -mx-4 mt-8 bg-cream/95 px-4 py-3 backdrop-blur-sm sm:top-[72px] sm:-mx-6 sm:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative md:w-80">
              <label htmlFor={searchId} className="sr-only">
                Найти услугу
              </label>
              <Input
                id={searchId}
                type="search"
                name="q"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Найти услугу: «пломба», «пластинка»…"
                className="pr-11"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full hov:bg-ink/5"
                  aria-label="Очистить поиск"
                >
                  <IconClose size={16} />
                </button>
              )}
            </div>
            <nav
              aria-label="Категории прайса"
              className="-mx-4 [scrollbar-width:none] overflow-x-auto px-4 md:mx-0 md:px-0"
            >
              <ul className="flex gap-2 md:flex-wrap">
                {categories.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#price-${c.id}`}
                      className={cn(
                        "block rounded-full px-3.5 py-2 text-[14px] font-bold whitespace-nowrap",
                        toneSoft[c.tone],
                      )}
                    >
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p className="sr-only" aria-live="polite">
            {q ? `Найдено: ${filtered.length} ${plural(filtered.length, ["услуга", "услуги", "услуг"])}` : ""}
          </p>
        </div>

        <div className="mt-6 space-y-12">
          {categories.map((c) => {
            const rows = filtered.filter((s) => s.category === c.id)
            if (!rows.length) return null
            return (
              <Reveal key={c.id} variant="rise">
                <section id={`price-${c.id}`} className="scroll-mt-44" aria-labelledby={`price-${c.id}-title`}>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn("grid size-14 shrink-0 -rotate-3 place-items-center rounded-2xl", toneSoft[c.tone])}
                    >
                      <CategoryArt category={c.id} className="w-[80%]" />
                    </span>
                    <h2 id={`price-${c.id}-title`} className="text-[clamp(1.6rem,3vw,2.1rem)] font-black">
                      {c.title}
                    </h2>
                  </div>
                  <div className="mt-4 overflow-hidden rounded-[26px] bg-paper shadow-plush-sm">
                    <table className="w-full border-collapse text-left">
                      <caption className="sr-only">Цены: {c.title}</caption>
                      <thead className="sr-only">
                        <tr>
                          <th scope="col">Услуга</th>
                          <th scope="col">Стоимость</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((s) => (
                          <tr key={s.id} className="group border-b-2 border-dashed border-ink/8 last:border-0">
                            <th scope="row" className="py-4 pr-3 pl-5 align-top font-normal sm:pl-6">
                              <span className="block font-display text-[17px] leading-snug font-extrabold sm:text-lg">
                                {s.name}
                              </span>
                              <span className="mt-0.5 block text-[14px] text-ink-soft">
                                {s.ageRange} · {s.duration}
                              </span>
                            </th>
                            <td className="py-4 pr-5 pl-2 text-right align-top whitespace-nowrap tabular-nums sm:pr-6">
                              <span className="block font-display text-lg font-black">
                                <span className="text-[14px] font-bold text-ink-soft">от </span>
                                {formatPrice(s.priceFrom)}
                              </span>
                              <button
                                type="button"
                                onClick={() => openBooking({ serviceId: s.id })}
                                className="mt-1 scroll-mt-48 scroll-mb-8 text-[14px] font-bold text-mint-ink underline decoration-2 underline-offset-4 hov:decoration-coral"
                              >
                                Записаться<span className="sr-only">: {s.name}</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </Reveal>
            )
          })}
          {filtered.length === 0 && (
            <div className="rounded-[26px] bg-paper p-8 text-center shadow-plush-sm" role="status">
              <p className="font-display text-2xl font-black">Ничего не нашли</p>
              <p className="mt-2 text-ink-soft">Попробуйте другое слово — или просто позвоните, подскажем.</p>
              <Button className="mt-4" variant="paper" onClick={() => setQuery("")}>
                Показать все цены
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
