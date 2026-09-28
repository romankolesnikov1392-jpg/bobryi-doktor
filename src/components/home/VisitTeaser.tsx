import { Link } from "react-router"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { ComicScene } from "@/components/illustrations/ComicScene"
import { IconArrowRight } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { visitSteps } from "@/data/visit"
import { cn } from "@/lib/utils"

/* Три кадра комикса веером; при наведении веер раскрывается */
const picks = [0, 2, 5]
const fan = [
  "-rotate-[7deg] lg:translate-x-[-8%] group-hov:-rotate-[10deg] group-hov:-translate-x-[14%]",
  "rotate-[2deg] z-10 group-hov:-translate-y-2",
  "rotate-[8deg] lg:translate-x-[8%] group-hov:rotate-[12deg] group-hov:translate-x-[14%]",
]

export function VisitTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24" aria-labelledby="visit-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:order-2 lg:col-span-5 lg:pl-6">
          <SectionHeading
            id="visit-title"
            eyebrow="Первый визит"
            title="Шесть шагов от «привет» до диплома героя"
            lead={
              <>
                Мы нарисовали первый визит комиксом: его удобно посмотреть с ребёнком вечером накануне. Когда знаешь,
                что будет дальше, — не страшно.
              </>
            }
          />
          <Link to="/pervyj-vizit" className={cn(buttonVariants({ variant: "lav", size: "lg" }), "group mt-8")}>
            Смотреть весь комикс
            <IconArrowRight size={20} className="transition-transform duration-200 ease-out group-hov:translate-x-1" />
          </Link>
        </div>

        <Reveal variant="swing" className="lg:order-1 lg:col-span-7">
          <Link
            to="/pervyj-vizit"
            className="group relative mx-auto grid max-w-2xl grid-cols-3 items-start gap-0 rounded-[40px] px-2 pt-6 pb-10 outline-offset-8"
            aria-label="Открыть комикс «Первый визит» целиком"
          >
            {picks.map((idx, i) => {
              const step = visitSteps[idx]
              return (
                <figure
                  key={step.scene}
                  className={cn(
                    "relative -mx-[6%] rounded-[22px] border-[3px] border-ink bg-paper p-1.5 shadow-plush transition-[rotate,translate] duration-300 ease-[var(--ease-spring)] sm:p-2",
                    fan[i],
                    i === 1 && "mt-8",
                  )}
                >
                  <ComicScene scene={step.scene} className="rounded-[16px]" />
                  <figcaption className="px-1 pt-2 pb-1 text-center">
                    <span className="mr-1.5 inline-grid size-6 place-items-center rounded-full bg-ink align-[1px] font-display text-[13px] font-black text-cream">
                      {idx + 1}
                    </span>
                    <span className="font-display text-[13px] font-extrabold sm:text-[15px]">{step.title}</span>
                  </figcaption>
                </figure>
              )
            })}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
