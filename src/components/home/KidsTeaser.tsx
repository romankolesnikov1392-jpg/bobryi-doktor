import { Link } from "react-router"
import { Reveal } from "@/components/Reveal"
import { Wave, Sparkle } from "@/components/decor"
import { Grysha } from "@/components/mascot/Grysha"
import { FoodArt } from "@/components/illustrations/FoodArt"
import { ToothChar } from "@/components/illustrations/CategoryArt"
import { IconArrowRight, IconStar } from "@/components/icons"
import { cn } from "@/lib/utils"

/* Блок для детей: билетики-«входы» в игры. Голос — Грыши. */
const tickets = [
  {
    to: "/detskaya-zona#game",
    title: "Почисти зубки",
    text: "30 секунд, 8 зубов, ни одного микроба",
    tone: "bg-sky",
    rot: "-rotate-3",
    art: (
      <svg viewBox="0 0 40 42" className="w-12" aria-hidden="true">
        <ToothChar mood="joy" />
      </svg>
    ),
  },
  {
    to: "/detskaya-zona#quiz",
    title: "Полезно или вредно?",
    text: "Угадай, что любят зубы",
    tone: "bg-coral",
    rot: "rotate-2",
    art: <FoodArt id="apple" className="w-12" />,
  },
  {
    to: "/detskaya-zona#passport",
    title: "Паспорт улыбки",
    text: "Собирай звёзды и значки",
    tone: "bg-lav",
    rot: "-rotate-1",
    art: <IconStar filled size={44} className="text-sun" />,
  },
  {
    to: "/detskaya-zona#coloring",
    title: "Раскраски",
    text: "Скачай и раскрась Грышу",
    tone: "bg-mint",
    rot: "rotate-3",
    art: (
      <svg viewBox="0 0 40 40" className="w-11" aria-hidden="true">
        <rect
          x="16"
          y="2"
          width="8"
          height="30"
          rx="2"
          fill="var(--color-sun)"
          stroke="var(--color-ink)"
          strokeWidth="3"
          transform="rotate(30 20 20)"
        />
        <path d="M13 31 l-3 7 l7 -3 Z" fill="var(--color-ink)" />
      </svg>
    ),
  },
]

export function KidsTeaser() {
  return (
    <section className="relative" aria-labelledby="kids-title">
      <Wave shape="cloud" className="text-sun" />
      <div className="relative overflow-hidden bg-sun pb-14 sm:pb-20">
        <Sparkle className="motion-loop absolute top-8 left-[6%] w-8 animate-float text-paper" />
        <Sparkle className="motion-loop absolute right-[8%] bottom-10 w-10 animate-float text-coral [animation-delay:-3s]" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-hand text-2xl text-sun-ink">Эй, это для тебя!</p>
            <h2 id="kids-title" className="mt-2 text-[clamp(2.4rem,5vw,3.8rem)] font-black">
              Детская зона Грыши
            </h2>
            <p className="mt-4 max-w-md text-lg">
              Пока взрослые читают про седацию и ДМС, тут можно поиграть, раскрасить Грышу и собрать звёзды в «Паспорт
              улыбки».
            </p>
            <div className="mt-2 flex items-end gap-3">
              <div className="w-40 shrink-0 sm:w-48">
                <Grysha pose="happy" />
              </div>
              <p className="mb-12 rounded-[22px_24px_22px_4px] bg-paper px-4 py-3 font-hand text-[19px] leading-snug shadow-plush">
                Спорим, ты почистишь все зубы быстрее меня?
              </p>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7">
            {tickets.map((t, i) => (
              <Reveal as="li" key={t.to} variant="pop" delay={i * 70}>
                <Link
                  to={t.to}
                  className={cn(
                    "group wiggle-on-hover relative flex items-center gap-4 overflow-hidden rounded-[24px] p-5 pr-6 text-ink shadow-plush transition-[rotate,scale] duration-[240ms] ease-[var(--ease-spring)] active:scale-[0.97] hov:rotate-0",
                    t.tone,
                    t.rot,
                  )}
                >
                  {/* «перфорация» билетика */}
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full bg-sun"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -right-3 size-6 -translate-y-1/2 rounded-full bg-sun"
                  />
                  <span className="wiggle-target grid size-16 shrink-0 place-items-center rounded-full bg-paper/80">
                    {t.art}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl leading-tight font-black">{t.title}</span>
                    <span className="mt-0.5 block text-[15px]">{t.text}</span>
                  </span>
                  <IconArrowRight
                    size={22}
                    className="shrink-0 transition-transform duration-200 ease-out group-hov:translate-x-1"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
      <Wave shape="soft" flip className="text-sun" />
    </section>
  )
}
