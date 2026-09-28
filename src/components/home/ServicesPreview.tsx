import { Link } from "react-router"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { CategoryArt } from "@/components/illustrations/CategoryArt"
import { Wave } from "@/components/decor"
import { IconArrowRight } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { categories, minPrice, servicesByCategory } from "@/data/services"
import { formatPrice, plural } from "@/lib/format"
import { toneBg, toneInk, toneSoft } from "@/lib/tone"
import { cn } from "@/lib/utils"

/* Не сетка из одинаковых карточек, а «меню» зигзагом: разные отступы, разные цвета */
const offsets = ["lg:ml-0", "lg:ml-[14%]", "lg:ml-[5%]", "lg:ml-[19%]", "lg:ml-[9%]"]

export function ServicesPreview() {
  return (
    <section className="relative" aria-labelledby="services-title">
      <Wave shape="lazy" className="text-sky-soft" />
      <div className="bg-sky-soft pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="services-title"
              eyebrow="Что мы делаем"
              title="От первого зуба до пластинки — в одной клинике"
              lead="Пять направлений, одна команда детских врачей. Ребёнок привыкает к одним лицам, а вы — к одному администратору."
            />
            <Link
              to="/uslugi"
              className={cn(buttonVariants({ variant: "paper" }), "group shrink-0 self-start lg:self-auto")}
            >
              Все услуги и цены
              <IconArrowRight
                size={20}
                className="transition-transform duration-200 ease-out group-hov:translate-x-1"
              />
            </Link>
          </div>

          <ul className="mt-10 space-y-4 sm:mt-14 sm:space-y-5">
            {categories.map((c, i) => {
              const count = servicesByCategory(c.id).length
              return (
                <Reveal
                  as="li"
                  key={c.id}
                  variant={i % 2 ? "slide-r" : "slide-l"}
                  delay={i * 50}
                  className={cn("lg:max-w-[78%]", offsets[i])}
                >
                  <Link
                    to={`/uslugi?cat=${c.id}`}
                    className="group wiggle-on-hover flex items-center gap-4 rounded-[28px_22px_30px_26px] bg-paper p-3 pr-5 shadow-plush-sm transition-[translate] duration-[240ms] ease-[var(--ease-spring)] sm:gap-6 sm:p-4 sm:pr-7 hov:-translate-y-1"
                  >
                    <span
                      className={cn(
                        "grid size-20 shrink-0 place-items-center rounded-[22px] sm:size-24",
                        toneSoft[c.tone],
                      )}
                    >
                      <CategoryArt category={c.id} className="wiggle-target w-[78%]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block font-hand text-[18px] leading-none sm:text-xl", toneInk[c.tone])}>
                        {c.kidTitle}
                      </span>
                      <span className="mt-1 block font-display text-[21px] leading-tight font-black sm:text-[26px]">
                        {c.title}
                      </span>
                      <span className="mt-1 hidden text-[15.5px] text-ink-soft md:block">{c.blurb}</span>
                    </span>
                    <span className="hidden shrink-0 text-right sm:block">
                      <span className="block text-[13px] font-semibold text-ink-soft">
                        {count} {plural(count, ["услуга", "услуги", "услуг"])}
                      </span>
                      <span className="block font-display text-lg font-black whitespace-nowrap">
                        от {formatPrice(minPrice(c.id))}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-full text-ink transition-transform duration-[240ms] ease-[var(--ease-spring)] group-hov:translate-x-1 group-hov:-rotate-12",
                        toneBg[c.tone],
                      )}
                      aria-hidden="true"
                    >
                      <IconArrowRight size={20} />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
      <Wave shape="soft" flip className="text-sky-soft" />
    </section>
  )
}
