import type { ReactNode } from "react"
import { PageMeta } from "@/components/PageMeta"
import { PageHero } from "@/components/PageHero"
import { Wave } from "@/components/decor"
import { BrushGame } from "@/components/kids/BrushGame"
import { FoodQuiz } from "@/components/kids/FoodQuiz"
import { SmilePassport } from "@/components/kids/SmilePassport"
import { ColoringPages } from "@/components/kids/ColoringPages"
import { GryshaStory } from "@/components/kids/GryshaStory"
import { cn } from "@/lib/utils"

const jump = [
  { href: "#game", label: "Игра", tone: "bg-sky", rot: "-rotate-3" },
  { href: "#quiz", label: "Квиз", tone: "bg-coral", rot: "rotate-2" },
  { href: "#passport", label: "Паспорт", tone: "bg-lav", rot: "-rotate-1" },
  { href: "#coloring", label: "Раскраски", tone: "bg-mint", rot: "rotate-3" },
  { href: "#story", label: "История", tone: "bg-paper", rot: "-rotate-2" },
]

function KidsSection({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  id: string
  eyebrow: string
  title: string
  lead: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-hand text-2xl text-coral-ink">{eyebrow}</p>
        <h2 id={`${id}-title`} className="mt-1 text-[clamp(2.1rem,5vw,3.4rem)] font-black">
          {title}
        </h2>
        <div className="mt-2 max-w-2xl text-lg text-ink-soft">{lead}</div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

export default function KidsZone() {
  return (
    <>
      <PageMeta
        title="Детская зона"
        description="Игра «Почисти зубки», квиз «Полезно или вредно», раскраски с Грышей и «Паспорт улыбки» — детская зона клиники «Бобрый доктор»."
      />
      <PageHero
        crumb="Детская зона"
        eyebrow="Комната Грыши"
        title="Играем, раскрашиваем, собираем звёзды"
        lead="Здесь всё можно нажимать. Малышам лучше играть вместе с мамой или папой — а старшие справятся сами."
        pose="happy"
        kid="Это моя комната! Начни с игры — а звёзды я вклею тебе в паспорт."
        tone="sun"
        blob={0}
      >
        <nav aria-label="Разделы детской зоны">
          <ul className="flex flex-wrap gap-3">
            {jump.map((j) => (
              <li key={j.href}>
                <a
                  href={j.href}
                  className={cn(
                    "inline-flex h-12 items-center rounded-2xl px-5 font-display text-lg font-black shadow-plush-sm transition-[rotate,scale] duration-[240ms] ease-[var(--ease-spring)] active:scale-[0.95] hov:rotate-0",
                    j.tone,
                    j.rot,
                  )}
                >
                  {j.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <KidsSection
        id="game"
        eyebrow="Игра на 30 секунд"
        title="Почисти зубки!"
        lead="Микробы захватили зубы. Три щёткой по каждому зубу — или нажимай на него — пока он не заблестит. Успей за 30 секунд!"
        className="pt-4 pb-16 sm:pb-24"
      >
        <BrushGame />
      </KidsSection>

      <div>
        <Wave shape="cloud" className="text-sky-soft" />
        <KidsSection
          id="quiz"
          eyebrow="Квиз"
          title="Полезно или вредно?"
          lead="Десять угощений. Угадай, что любят зубы, а что — микробы."
          className="bg-sky-soft pt-6 pb-16 sm:pb-24"
        >
          <FoodQuiz />
        </KidsSection>
        <Wave shape="soft" flip className="text-sky-soft" />
      </div>

      <KidsSection
        id="passport"
        eyebrow="Для тех, кто приходит снова"
        title="Паспорт улыбки"
        lead="За каждый визит в клинику — штамп, за игры — звёзды, за успехи — значки. Соберёшь страницу — получишь приз от Грыши."
        className="py-16 sm:py-24"
      >
        <SmilePassport />
      </KidsSection>

      <div>
        <Wave shape="lazy" className="text-mint-soft" />
        <KidsSection
          id="coloring"
          eyebrow="Скачай и распечатай"
          title="Раскраски с Грышей"
          lead="Четыре листа A4. Можно скачать файл или сразу отправить на принтер."
          className="bg-mint-soft pt-6 pb-16 sm:pb-24"
        >
          <ColoringPages />
        </KidsSection>
        <Wave shape="double" flip className="text-mint-soft" />
      </div>

      <KidsSection
        id="story"
        eyebrow="Сказка на ночь"
        title="История Грыши"
        lead="Как бобрёнок с речки стал помощником детского стоматолога."
        className="pt-16 sm:pt-24"
      >
        <GryshaStory />
      </KidsSection>
    </>
  )
}
