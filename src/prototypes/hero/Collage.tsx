import { Grysha } from "@/components/mascot/Grysha"
import { Button } from "@/components/ui/button"
import { IconArrowRight, IconPhone } from "@/components/icons"

/* Вариант 1 — «Стикерборд»: ось — игривый коллаж, асимметрия, наклейки, два голоса рядом */
export default function Collage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pt-4">
        <div className="flex items-center gap-3 rounded-full bg-paper py-2 pr-6 pl-2 shadow-plush-sm">
          <div className="size-11 rounded-full bg-mint-soft p-0.5">
            <Grysha pose="greet" animated={false} decorative />
          </div>
          <div className="leading-none">
            <div className="font-display text-lg font-black">Бобрый доктор</div>
            <div className="text-xs font-semibold text-ink-soft">детская стоматология</div>
          </div>
        </div>
        <nav className="hidden items-center gap-1 rounded-full bg-paper px-3 py-2 text-[15px] font-bold shadow-plush-sm lg:flex">
          {["Услуги", "Первый визит", "Врачи", "Детская зона", "Родителям", "Цены"].map((l) => (
            <a key={l} href="#" className="rounded-full px-3 py-2 hov:bg-mint-soft">
              {l}
            </a>
          ))}
        </nav>
        <Button size="sm" className="hidden sm:inline-flex">
          <IconPhone size={18} /> Записаться
        </Button>
      </header>

      <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pt-10 pb-28 lg:grid-cols-12 lg:pt-16">
        <div className="relative z-10 lg:col-span-7">
          <p className="inline-block -rotate-2 rounded-full px-4 py-1.5 text-sm font-extrabold sticker">
            Детская стоматология · с 1 года до 17 лет
          </p>
          <h1 className="mt-6 text-[clamp(2.5rem,6.2vw,4.75rem)] font-black">
            Сначала{" "}
            <span className="relative inline-block">
              знакомимся
              <svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-full" aria-hidden>
                <path
                  d="M4 14 C 60 4, 110 18, 160 9 S 250 6, 296 12"
                  fill="none"
                  stroke="var(--color-coral)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .<br />
            Лечим — когда ребёнок готов.
          </h1>
          <p className="mt-7 max-w-xl text-lg text-ink-soft">
            Первый визит — 30 минут без бормашины: кресло-лифт, зеркальце, счёт зубов и понятный план для вас. Если
            сегодня страшно — перенесём. Это тоже часть работы.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button size="lg">Записаться на приём</Button>
            <Button size="lg" variant="paper">
              Как проходит первый визит <IconArrowRight size={20} />
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2 text-sm font-bold">
            <li className="rotate-1 rounded-full bg-mint-soft px-3 py-1.5">Врачи со стажем от 8 лет</li>
            <li className="-rotate-1 rounded-full bg-sun-soft px-3 py-1.5">Игровая с горкой</li>
            <li className="rotate-2 rounded-full bg-lav-soft px-3 py-1.5">Пн–Вс, 8:00–21:00</li>
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 -z-0 m-auto w-[112%] max-w-none -translate-x-[6%]"
            aria-hidden
          >
            <path
              d="M312 70c46 38 70 104 50 160-20 58-80 106-146 112-70 6-140-30-164-94C28 184 50 108 108 68c56-40 158-38 204 2Z"
              fill="var(--color-mint)"
            />
          </svg>
          <div className="relative mx-auto w-[78%] max-w-[380px] pt-16">
            <Grysha pose="greet" sticker />
          </div>
          <div className="absolute top-0 right-0 max-w-[260px] rotate-2 rounded-[26px_26px_26px_6px] bg-sun px-5 py-4 shadow-plush lg:-right-6">
            <p className="text-xs font-extrabold tracking-wide text-sun-ink uppercase">Грыша говорит</p>
            <p className="font-hand text-[21px] leading-snug">
              Привет! Спорим, ты не знаешь, сколько у тебя зубов? Приходи — посчитаем вместе!
            </p>
          </div>
          <div className="absolute bottom-10 left-0 grid size-28 -rotate-12 place-items-center rounded-full bg-lav text-center shadow-plush">
            <span className="font-display text-3xl leading-none font-black">
              0
              <span className="block text-xs font-extrabold">
                насильных
                <br />
                фиксаций
              </span>
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
