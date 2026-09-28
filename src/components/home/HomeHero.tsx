import { useState } from "react"
import { Link } from "react-router"
// мини-версия motion: только WAAPI (аппаратное ускорение), пружины через linear()
import { useAnimate } from "motion/react-mini"
import { Grysha } from "@/components/mascot/Grysha"
import { Button, buttonVariants } from "@/components/ui/button"
import { IconArrowRight } from "@/components/icons"
import { Blob, HandArrow, Sparkle, Squiggle, Wave } from "@/components/decor"
import { ToothChar } from "@/components/illustrations/CategoryArt"
import { useBooking } from "@/store/booking"
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

/* Голос Грыши — для детей: коротко, озорно, с фактами */
const phrases = [
  "Привет! Я Грыша. Спорим, ты не знаешь, сколько у тебя зубов? Приходи — посчитаем вместе!",
  "У бобров зубы оранжевые — в них есть железо. А у тебя белые. Их надо беречь!",
  "В нашем кресле можно покататься вверх-вниз, как на лифте. Вжух!",
  "Рыбку в аквариуме зовут Булька. Приходи — познакомлю!",
  "Две минуты щёткой утром и вечером — и микробам тут делать нечего.",
]

export function HomeHero() {
  const openBooking = useBooking((s) => s.openBooking)
  const [i, setI] = useState(0)
  const [mobileScope, animate] = useAnimate<HTMLSpanElement>()
  const [desktopScope] = useAnimate<HTMLSpanElement>()
  const reduce = usePrefersReducedMotion()

  const poke = () => {
    setI((n) => (n + 1) % phrases.length)
    if (reduce) return
    // прыжок: быстро вверх, пружиной вниз — прерываемо, с текущей точки
    for (const el of [mobileScope.current, desktopScope.current]) {
      if (!el || el.offsetParent === null) continue
      // полная строка transform — анимация уходит в WAAPI/компоновщик, а не в rAF на главном потоке
      animate(el, { transform: "translateY(-22px) rotate(-4deg)" }, { duration: 0.14, ease: [0.23, 1, 0.32, 1] }).then(
        () =>
          animate(el, { transform: "translateY(0px) rotate(0deg)" }, { type: "spring", duration: 0.55, bounce: 0.5 }),
      )
    }
  }

  const bubble = (
    <div className="relative">
      <p className="mb-1 text-[11px] font-extrabold tracking-[0.08em] text-sun-ink uppercase">Грыша говорит</p>
      <p
        key={i}
        aria-live="polite"
        className="animate-[bubble-in_260ms_var(--ease-out)] font-hand text-[19px] leading-snug sm:text-[21px]"
      >
        {phrases[i]}
      </p>
    </div>
  )

  return (
    <section className="relative overflow-x-clip" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 px-4 pt-8 pb-10 sm:px-6 sm:pt-12 lg:grid-cols-12 lg:pt-16 lg:pb-20">
        <div className="relative z-10 lg:col-span-7">
          <p className="enter-rise inline-block -rotate-2 rounded-full px-4 py-1.5 text-[14px] font-extrabold sticker sm:text-[15px]">
            Детская стоматология · от 1 года до 17 лет
          </p>
          <h1
            id="hero-title"
            className="enter-rise mt-5 text-[clamp(2.45rem,6.4vw,4.9rem)] leading-[1.02] font-black tracking-[-0.025em] sm:mt-7"
            style={{ "--d": "70ms" } as React.CSSProperties}
          >
            Сначала <Squiggle>знакомимся</Squiggle>. <span className="text-mint-ink">Лечим</span> — когда ребёнок готов.
          </h1>

          {/* мобильная версия: Грыша сразу под заголовком, в первом экране */}
          <div className="mt-5 flex items-end gap-2 lg:hidden">
            <button
              type="button"
              onClick={poke}
              className="enter-pop w-[34%] max-w-[150px] shrink-0 rounded-3xl"
              style={{ "--d": "180ms" } as React.CSSProperties}
              aria-label="Грыша: нажми, и он расскажет ещё что-нибудь"
            >
              <span ref={mobileScope} className="block">
                <Grysha pose="greet" sticker decorative />
              </span>
            </button>
            <div
              className="enter-pop relative mb-10 flex-1 rounded-[24px_26px_24px_6px] bg-sun px-4 py-3 shadow-plush"
              style={{ "--d": "260ms" } as React.CSSProperties}
            >
              {bubble}
            </div>
          </div>

          <p
            className="enter-rise mt-6 max-w-[34rem] text-lg text-ink-soft sm:mt-7 sm:text-[19px]"
            style={{ "--d": "140ms" } as React.CSSProperties}
          >
            Первый визит — 30 минут без бормашины: кресло-лифт, зеркальце, счёт зубов и понятный план для вас. Если
            сегодня страшно — перенесём. Это тоже часть нашей работы.
          </p>
          <div
            className="enter-rise mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ "--d": "210ms" } as React.CSSProperties}
          >
            <Button size="lg" onClick={() => openBooking({ serviceId: "first-visit" })}>
              Записаться на приём
            </Button>
            <Link to="/pervyj-vizit" className={cn(buttonVariants({ variant: "paper", size: "lg" }), "group")}>
              Как проходит первый визит
              <IconArrowRight
                size={20}
                className="transition-transform duration-200 ease-out group-hov:translate-x-1"
              />
            </Link>
          </div>
          <ul
            className="enter-rise mt-9 flex flex-wrap gap-2 text-[14px] font-bold sm:text-[15px]"
            style={{ "--d": "280ms" } as React.CSSProperties}
            aria-label="Коротко о клинике"
          >
            <li className="rotate-1 rounded-full bg-mint-soft px-3.5 py-1.5">Только детские врачи, стаж от 8 лет</li>
            <li className="-rotate-1 rounded-full bg-sun-soft px-3.5 py-1.5">Игровая с горкой и рыбкой</li>
            <li className="rotate-2 rounded-full bg-lav-soft px-3.5 py-1.5">Седация для тревожных детей</li>
            <li className="-rotate-2 rounded-full bg-sky-soft px-3.5 py-1.5">Без выходных</li>
          </ul>
        </div>

        {/* десктоп: Грыша на мятной кляксе, наклейки вокруг */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <Blob shape={0} className="enter-pop absolute top-[12%] left-1/2 w-[118%] -translate-x-1/2 text-mint" />
          {/* наклейка «счастливый зуб» вместо абстрактной кляксы */}
          <span
            aria-hidden="true"
            className="enter-pop absolute top-[4%] left-[2%] grid size-24 -rotate-12 place-items-center rounded-full bg-sky shadow-plush [box-shadow:0_0_0_5px_#fff,var(--shadow-plush)]"
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            <svg viewBox="0 0 40 42" className="w-12">
              <ToothChar mood="joy" />
            </svg>
          </span>
          <Sparkle className="motion-loop absolute top-[18%] right-[4%] w-9 animate-float text-sun [--r:12deg]" />
          <Sparkle className="motion-loop absolute bottom-[26%] -left-[2%] w-6 animate-float text-coral [animation-delay:-2s]" />

          <div className="relative mx-auto w-[74%] max-w-[380px] pt-[24%]">
            <button
              type="button"
              onClick={poke}
              className="enter-pop group block w-full rounded-[40px] outline-offset-8"
              style={{ "--d": "160ms" } as React.CSSProperties}
              aria-label="Грыша: нажми, и он расскажет ещё что-нибудь"
            >
              <span ref={desktopScope} className="block">
                <Grysha
                  pose="greet"
                  sticker
                  decorative
                  className="transition-transform duration-[240ms] ease-[var(--ease-spring)] group-hov:-rotate-3"
                />
              </span>
            </button>
          </div>

          <div
            className="enter-pop absolute top-[2%] -right-[2%] w-[270px] rotate-2 rounded-[26px_26px_26px_6px] bg-sun px-5 py-4 shadow-plush xl:-right-[6%]"
            style={{ "--d": "380ms", "--r": "0deg" } as React.CSSProperties}
          >
            {bubble}
          </div>
          <p
            className="enter-rise absolute top-[40%] right-[-2%] w-24 rotate-6 text-center font-hand text-lg leading-tight text-coral-ink xl:-right-[4%]"
            style={{ "--d": "600ms" } as React.CSSProperties}
          >
            нажми на меня!
            <HandArrow flip className="mx-auto mt-1 w-12 -rotate-12 text-coral-ink" />
          </p>

          <div
            className="enter-pop absolute bottom-[8%] left-[2%] grid size-32 -rotate-12 place-items-center rounded-full bg-lav text-center shadow-plush"
            style={{ "--d": "480ms" } as React.CSSProperties}
          >
            <span className="font-display leading-none font-black">
              <span className="block text-4xl">30</span>
              <span className="mt-1 block px-3 text-[12.5px] leading-tight font-extrabold">
                минут на знакомство без бормашины
              </span>
            </span>
          </div>
        </div>
      </div>
      <Wave shape="double" className="text-cream-2" />
    </section>
  )
}
