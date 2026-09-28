import { Button } from "@/components/ui/button"

/* Вариант 2 — «Книжка-картинка»: ось — иммерсивная сцена во всю ширину, спокойная центрованная типографика.
   Маскот — бегемотик Муся («открой рот, как бегемотик»). */
export default function Storybook() {
  return (
    <div className="min-h-screen bg-sky-soft">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="font-display text-xl font-black">
          Бегемотик<span className="text-lav-ink">.</span>
          <span className="ml-2 text-sm font-bold text-ink-soft">детская стоматология</span>
        </div>
        <nav className="hidden gap-6 font-bold md:flex">
          {["Услуги", "Первый визит", "Врачи", "Детям", "Родителям"].map((l) => (
            <a key={l} href="#" className="hov:text-lav-ink">
              {l}
            </a>
          ))}
        </nav>
      </header>

      <section className="relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-3xl px-5 pt-8 text-center">
          <p className="font-hand text-2xl text-lav-ink">Глава первая, в которой никто не плачет</p>
          <h1 className="mt-3 text-[clamp(2.4rem,5.4vw,4.2rem)] font-black">
            Открой ротик, как бегемотик — остальное сделаем мы
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Лечим молочные и постоянные зубы детям с года. Начинаем со знакомства и сказки про кресло, а не с бормашины.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="lav">
              Записаться на приём
            </Button>
            <Button size="lg" variant="paper">
              Как проходит первый визит
            </Button>
          </div>
        </div>

        {/* сцена */}
        <svg viewBox="0 0 1440 520" className="relative -mt-10 block w-full" aria-hidden>
          <circle cx="1180" cy="120" r="64" fill="var(--color-sun)" />
          <g fill="#fff">
            <ellipse cx="220" cy="110" rx="90" ry="30" />
            <ellipse cx="270" cy="90" rx="60" ry="34" />
            <ellipse cx="1000" cy="70" rx="70" ry="24" />
          </g>
          <path d="M0 300 C 220 200 420 230 620 290 S 1100 210 1440 280 V520 H0Z" fill="var(--color-mint)" />
          <path
            d="M0 360 C 300 300 520 330 760 370 S 1200 320 1440 350 V520 H0Z"
            fill="var(--color-mint-deep)"
            opacity=".55"
          />
          {/* домик-клиника */}
          <g transform="translate(1080 210)">
            <rect
              x="0"
              y="40"
              width="150"
              height="110"
              rx="14"
              fill="var(--color-paper)"
              stroke="var(--color-ink)"
              strokeWidth="4"
            />
            <path
              d="M-14 50 L75 -10 L164 50 Z"
              fill="var(--color-coral)"
              stroke="var(--color-ink)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <rect
              x="55"
              y="90"
              width="40"
              height="60"
              rx="18"
              fill="var(--color-lav)"
              stroke="var(--color-ink)"
              strokeWidth="4"
            />
            <circle cx="30" cy="80" r="14" fill="var(--color-sky)" stroke="var(--color-ink)" strokeWidth="4" />
            <circle cx="120" cy="80" r="14" fill="var(--color-sky)" stroke="var(--color-ink)" strokeWidth="4" />
          </g>
          {/* река */}
          <path d="M0 430 C 360 400 700 450 1040 420 S 1300 410 1440 430 V520 H0Z" fill="var(--color-sky)" />
          {/* бегемотик Муся */}
          <g transform="translate(560 250)">
            <ellipse
              cx="160"
              cy="170"
              rx="150"
              ry="118"
              fill="var(--color-lav)"
              stroke="var(--color-ink)"
              strokeWidth="5"
            />
            <circle cx="70" cy="62" r="26" fill="var(--color-lav)" stroke="var(--color-ink)" strokeWidth="5" />
            <circle cx="250" cy="62" r="26" fill="var(--color-lav)" stroke="var(--color-ink)" strokeWidth="5" />
            <circle cx="70" cy="62" r="11" fill="var(--color-coral)" />
            <circle cx="250" cy="62" r="11" fill="var(--color-coral)" />
            <circle cx="112" cy="110" r="16" fill="var(--color-ink)" />
            <circle cx="208" cy="110" r="16" fill="var(--color-ink)" />
            <circle cx="117" cy="104" r="5" fill="#fff" />
            <circle cx="213" cy="104" r="5" fill="#fff" />
            <ellipse cx="160" cy="200" rx="118" ry="70" fill="#b8a0ea" stroke="var(--color-ink)" strokeWidth="5" />
            <ellipse cx="124" cy="176" rx="9" ry="13" fill="var(--color-ink)" />
            <ellipse cx="196" cy="176" rx="9" ry="13" fill="var(--color-ink)" />
            <path
              d="M92 222 Q 160 262 228 222"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect x="112" y="226" width="20" height="22" rx="6" fill="#fff" stroke="var(--color-ink)" strokeWidth="4" />
            <rect x="188" y="226" width="20" height="22" rx="6" fill="#fff" stroke="var(--color-ink)" strokeWidth="4" />
            <ellipse cx="62" cy="170" rx="18" ry="10" fill="var(--color-coral)" opacity=".6" />
            <ellipse cx="258" cy="170" rx="18" ry="10" fill="var(--color-coral)" opacity=".6" />
          </g>
          <path
            d="M0 470 C 360 440 700 490 1040 460 S 1300 450 1440 470 V520 H0Z"
            fill="var(--color-sky-deep)"
            opacity=".5"
          />
          <g stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none">
            <path d="M540 470 q20 -12 40 0 M780 480 q24 -12 48 0 M300 455 q18 -10 36 0" />
          </g>
        </svg>
        <div className="absolute bottom-[34%] left-[8%] hidden max-w-[260px] -rotate-2 rounded-3xl bg-paper px-5 py-4 shadow-plush md:block">
          <p className="font-hand text-xl leading-snug">
            Я Муся! Когда доктор просит открыть рот — открывай широко-широко, как я. Аааа!
          </p>
        </div>
      </section>
    </div>
  )
}
