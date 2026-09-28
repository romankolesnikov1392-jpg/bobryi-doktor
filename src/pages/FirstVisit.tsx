import { Link } from "react-router"
import { PageMeta } from "@/components/PageMeta"
import { PageHero } from "@/components/PageHero"
import { Reveal, type RevealVariant } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { ComicScene } from "@/components/illustrations/ComicScene"
import { Grysha } from "@/components/mascot/Grysha"
import { Button, buttonVariants } from "@/components/ui/button"
import { Wave } from "@/components/decor"
import { IconArrowRight, IconCheck, IconClose } from "@/components/icons"
import { phraseSwaps, prepTips, visitSteps } from "@/data/visit"
import { useBooking } from "@/store/booking"
import { toneSoft } from "@/lib/tone"
import { cn } from "@/lib/utils"

/* Ритм комиксной страницы: кадры разной ширины, как в настоящей раскадровке */
const spans = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4", "lg:col-span-3", "lg:col-span-3"]
const tilts = [
  "-rotate-[0.8deg]",
  "rotate-[1.2deg]",
  "-rotate-[1deg]",
  "rotate-[0.6deg]",
  "rotate-[-1.2deg]",
  "rotate-[1deg]",
]
const reveals: RevealVariant[] = ["tilt-l", "tilt-r", "pop", "swing", "slide-l", "slide-r"]

export default function FirstVisit() {
  const openBooking = useBooking((s) => s.openBooking)
  return (
    <>
      <PageMeta
        title="Первый визит"
        description="Как проходит первый визит к детскому стоматологу — комикс из шести шагов и советы родителям, как подготовить ребёнка."
      />
      <PageHero
        crumb="Первый визит"
        eyebrow="Комикс для чтения вслух"
        title="Первый визит: шесть шагов, ни одного сюрприза"
        lead="Посмотрите его с ребёнком накануне. Реплики Грыши — для него, пояснения под картинками — для вас."
        pose="greet"
        kid="Это я на всех картинках! Смотри по порядку — я покажу, что будет, шаг за шагом."
        tone="lav"
        side="left"
        blob={2}
      >
        <div className="flex flex-wrap gap-3 text-[15px]">
          <span className="rounded-full bg-paper px-4 py-2 font-hand text-lg shadow-plush-sm">так говорит Грыша</span>
          <span className="rounded-full bg-paper px-4 py-2 font-bold shadow-plush-sm">
            так — пояснения для взрослых
          </span>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6" aria-label="Комикс: шаги первого визита">
        <ol className="grid gap-7 sm:gap-8 lg:grid-cols-6">
          {visitSteps.map((step, i) => (
            <Reveal as="li" key={step.scene} variant={reveals[i]} delay={(i % 2) * 80} className={spans[i]}>
              <article
                className={cn(
                  "flex h-full flex-col overflow-hidden rounded-[22px] border-4 border-ink bg-paper shadow-plush",
                  tilts[i],
                )}
                aria-labelledby={`step-${i}`}
              >
                <div className="relative">
                  <ComicScene
                    scene={step.scene}
                    animated={false}
                    wide={i === 0 || i >= 3}
                    className={cn("border-b-4 border-ink", i >= 4 && "lg:aspect-[16/10]")}
                    mascotClassName={
                      i === 0 || i === 3 ? "lg:w-[24%] lg:right-[4%]" : i >= 4 ? "lg:w-[30%] lg:right-[2%]" : undefined
                    }
                  />
                  <span className="absolute top-3 left-3 grid size-10 place-items-center rounded-full bg-ink font-display text-lg font-black text-cream">
                    {i + 1}
                  </span>
                  <span className="absolute top-3 right-3 rounded-full bg-paper px-3 py-1 text-[13px] font-extrabold shadow-plush-sm">
                    {step.minutes}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 id={`step-${i}`} className="text-[22px] font-black sm:text-2xl">
                    {step.title}
                  </h2>
                  <p
                    className={cn(
                      "mt-3 rounded-[20px_22px_20px_4px] px-4 py-3 font-hand text-[19px] leading-snug",
                      toneSoft[step.tone],
                    )}
                  >
                    <span className="sr-only">Грыша: </span>
                    {step.kid}
                  </p>
                  <p className="mt-4 text-[15.5px] text-ink-soft">
                    <span className="font-bold text-ink">Для взрослых: </span>
                    {step.parent}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* советы родителям */}
      <section aria-labelledby="prep-title">
        <Wave shape="lazy" className="text-mint-soft" />
        <div className="bg-mint-soft pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
            <SectionHeading
              id="prep-title"
              eyebrow="Родителям"
              title="Как подготовить ребёнка — и себя"
              lead="Главное, что снижает страх, — предсказуемость и ощущение контроля. Вот что работает у наших пациентов."
            />

            <h3 className="mt-12 text-2xl font-black">Какие слова выбрать</h3>
            <ul className="mt-5 grid gap-5 md:grid-cols-2">
              {phraseSwaps.map((p, i) => (
                <Reveal as="li" key={p.say} variant={i % 2 ? "tilt-r" : "tilt-l"} delay={(i % 2) * 70}>
                  <div
                    className={cn(
                      "h-full rounded-[26px] bg-paper p-5 shadow-plush-sm sm:p-6",
                      i % 2 ? "r-blob-2" : "r-blob-1",
                    )}
                  >
                    <p className="flex items-start gap-2.5">
                      <span
                        className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-mint text-ink"
                        aria-hidden="true"
                      >
                        <IconCheck size={16} strokeWidth={3} />
                      </span>
                      <span>
                        <span className="sr-only">Скажите: </span>
                        <span className="font-display text-[18px] font-extrabold">«{p.say}»</span>
                      </span>
                    </p>
                    <p className="mt-3 flex items-start gap-2.5 text-ink-soft">
                      <span
                        className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-coral-soft text-coral-ink"
                        aria-hidden="true"
                      >
                        <IconClose size={15} strokeWidth={3} />
                      </span>
                      <span>
                        <span className="sr-only">Лучше не говорить: </span>
                        <s className="decoration-coral decoration-2">«{p.avoid}»</s>
                      </span>
                    </p>
                    <p className="mt-3 border-t-2 border-dashed border-ink/10 pt-3 text-[15px] text-ink-soft">
                      {p.why}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mt-14 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h3 className="text-2xl font-black">Пять вещей накануне</h3>
                <ol className="mt-5 space-y-3">
                  {prepTips.map((t, i) => (
                    <Reveal as="li" key={t.title} variant="rise" delay={i * 50}>
                      <div className="flex gap-4 rounded-[22px] bg-paper p-4 shadow-plush-sm sm:p-5">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sun font-display text-lg font-black">
                          {i + 1}
                        </span>
                        <p>
                          <span className="block font-display text-lg font-extrabold">{t.title}</span>
                          <span className="text-[16px] text-ink-soft">{t.text}</span>
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </div>
              <aside className="lg:col-span-4">
                <div className="sticky top-28 rotate-1 rounded-[30px] bg-coral p-6 shadow-plush">
                  <div className="mx-auto w-36">
                    <Grysha pose="cheer" />
                  </div>
                  <p className="mt-2 text-center font-display text-2xl leading-tight font-black">
                    Готовы познакомиться?
                  </p>
                  <p className="mt-2 text-center text-[16px]">
                    30–40 минут, без бормашины. Лечить будем, только если болит.
                  </p>
                  <Button
                    className="mt-5 w-full"
                    variant="paper"
                    size="lg"
                    onClick={() => openBooking({ serviceId: "first-visit" })}
                  >
                    Записаться на знакомство
                  </Button>
                  <Link
                    to="/roditelyam/trevozhnost-ras-sensornye-osobennosti"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "group mt-2 w-full")}
                  >
                    Если ребёнку очень тревожно
                    <IconArrowRight
                      size={18}
                      className="transition-transform duration-200 ease-out group-hov:translate-x-1"
                    />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
