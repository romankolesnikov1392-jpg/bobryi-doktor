import { Button } from "@/components/ui/button"

/* Вариант 3 — «Плакат»: ось — крупная типографика и цветные блоки-бенто, громкий характер.
   Маскот — Клык, зуб-супергерой в плаще. */
function Klyk() {
  return (
    <svg viewBox="0 0 220 240" className="w-full" role="img" aria-label="Зуб-супергерой Клык в плаще">
      <path
        d="M48 70 C 20 120 10 190 30 230 L 190 230 C 210 190 200 120 172 70 Z"
        fill="var(--color-coral)"
        stroke="var(--color-ink)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M60 40 C 80 30 96 40 110 40 C 124 40 140 30 160 40 C 188 54 190 94 180 120 C 172 142 170 160 164 190 C 160 212 150 222 142 214 C 132 204 132 176 110 176 C 88 176 88 204 78 214 C 70 222 60 212 56 190 C 50 160 48 142 40 120 C 30 94 32 54 60 40 Z"
        fill="#fff"
        stroke="var(--color-ink)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M58 86 C 80 74 140 74 162 86 C 162 106 140 110 110 104 C 80 110 58 106 58 86 Z"
        fill="var(--color-mint-deep)"
        stroke="var(--color-ink)"
        strokeWidth="4"
      />
      <ellipse cx="86" cy="92" rx="9" ry="10" fill="#fff" />
      <ellipse cx="134" cy="92" rx="9" ry="10" fill="#fff" />
      <circle cx="88" cy="93" r="5" fill="var(--color-ink)" />
      <circle cx="136" cy="93" r="5" fill="var(--color-ink)" />
      <path d="M90 130 Q 110 148 130 130" fill="none" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="70" cy="124" rx="10" ry="6" fill="var(--color-coral)" opacity=".6" />
      <ellipse cx="150" cy="124" rx="10" ry="6" fill="var(--color-coral)" opacity=".6" />
      <circle cx="110" cy="160" r="12" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="3.5" />
      <text
        x="110"
        y="166"
        textAnchor="middle"
        fontSize="15"
        fontWeight="900"
        fontFamily="var(--font-display)"
        fill="var(--color-ink)"
      >
        К
      </text>
    </svg>
  )
}

export default function Poster() {
  return (
    <div className="min-h-screen bg-cream p-3 sm:p-5">
      <header className="flex items-center justify-between px-2 py-3">
        <div className="font-display text-2xl font-black tracking-tight">КЛЫК&nbsp;/&nbsp;детская стоматология</div>
        <Button size="sm" variant="sun" className="hidden sm:inline-flex">
          Записаться
        </Button>
      </header>
      <section className="grid gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-[auto_auto]">
        <div className="rounded-[36px] bg-coral p-7 sm:p-10 lg:col-span-2 lg:row-span-2">
          <p className="font-bold">Для родителей</p>
          <h1 className="mt-4 text-[clamp(3rem,7.5vw,6.4rem)] leading-[0.92] font-black tracking-[-0.03em]">
            Храбрым быть не обязательно.
          </h1>
          <p className="mt-6 max-w-md text-lg">
            Детские врачи, игровая и время на знакомство. Лечим, когда ребёнок готов, — и объясняем вам каждый шаг.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" variant="paper">
              Записаться на приём
            </Button>
            <Button size="lg" variant="ghost" className="underline decoration-2 underline-offset-4">
              Как проходит первый визит
            </Button>
          </div>
        </div>
        <div className="relative grid place-items-center overflow-hidden rounded-[36px] bg-mint p-6 lg:row-span-2">
          <div className="absolute size-[120%] animate-spin-slow rounded-full bg-[repeating-conic-gradient(var(--color-mint-deep)_0_10deg,transparent_10deg_20deg)] opacity-40" />
          <div className="relative w-[80%] max-w-[260px]">
            <Klyk />
          </div>
        </div>
        <div className="rounded-[36px] bg-sun p-7">
          <div className="font-display text-7xl font-black">0</div>
          <p className="mt-1 font-bold">насильных фиксаций — не держим и не уговариваем силой</p>
        </div>
        <div className="rounded-[36px] bg-lav p-7">
          <p className="text-sm font-extrabold uppercase">Клык говорит</p>
          <p className="mt-2 font-hand text-2xl leading-snug">
            Я Клык, защитник эмали! Со мной даже пломба — это просто приключение.
          </p>
        </div>
      </section>
    </div>
  )
}
