import { Link } from "react-router"
import { PageMeta } from "@/components/PageMeta"
import { PageHero } from "@/components/PageHero"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Wave } from "@/components/decor"
import { Grysha, GryshaFace } from "@/components/mascot/Grysha"
import { IconArrowRight, IconClock, IconShield } from "@/components/icons"
import { articles } from "@/data/articles"
import { faq, insuranceSteps } from "@/data/faq"
import { toneSoft } from "@/lib/tone"
import { cn } from "@/lib/utils"

const layout = ["md:col-span-7 md:row-span-2", "md:col-span-5", "md:col-span-5", "md:col-span-12"]
const tilts = ["-rotate-[0.6deg]", "rotate-[1deg]", "-rotate-[1deg]", "rotate-[0.4deg]"]

export default function Parents() {
  return (
    <>
      <PageMeta
        title="Родителям"
        description="Статьи для родителей: первый визит к стоматологу, как приучить к чистке зубов, адаптация тревожных детей. Частые вопросы, ДМС и налоговый вычет."
      />
      <PageHero
        crumb="Родителям"
        eyebrow="Честно и по делу"
        title="Ответы на вопросы, которые вы ещё не задали"
        lead="Статьи, частые вопросы, ДМС и налоговый вычет. Простым языком и без запугивания — у вас и так хватает забот."
        pose="think"
        kid="Пока взрослые читают, я выбираю, какую раскраску тебе показать…"
        tone="coral"
        side="left"
        blob={1}
      />

      {/* статьи */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24" aria-labelledby="articles-title">
        <h2 id="articles-title" className="sr-only">
          Статьи
        </h2>
        <ul className="grid gap-6 md:grid-cols-12">
          {articles.map((a, i) => (
            <Reveal
              as="li"
              key={a.slug}
              variant={i % 2 ? "tilt-r" : "tilt-l"}
              delay={i * 60}
              className={layout[i % layout.length]}
            >
              <Link
                to={`/roditelyam/${a.slug}`}
                className={cn(
                  "group flex h-full flex-col justify-between gap-6 p-6 shadow-plush transition-[rotate,translate] duration-[240ms] ease-[var(--ease-spring)] sm:p-8 hov:-translate-y-1 hov:rotate-0",
                  toneSoft[a.tone],
                  i % 2 ? "r-blob-2" : "r-blob-1",
                  tilts[i % tilts.length],
                )}
              >
                <div>
                  <p className="flex items-center gap-1.5 text-[14px] font-bold text-ink-soft">
                    <IconClock size={16} /> {a.readMinutes} мин чтения
                  </p>
                  <h3
                    className={cn(
                      "mt-3 leading-tight font-black",
                      i === 0 ? "text-[clamp(1.8rem,3.6vw,2.6rem)]" : "text-[24px]",
                    )}
                  >
                    {a.title}
                  </h3>
                  <p className={cn("mt-3 text-ink-soft", i === 0 ? "text-lg" : "text-[16px]")}>{a.lead}</p>
                </div>
                {i === 0 && (
                  <div aria-hidden="true" className="pointer-events-none -my-4 ml-auto hidden w-44 md:block">
                    <Grysha pose="explain" />
                  </div>
                )}
                <span className="inline-flex items-center gap-2 font-display font-extrabold">
                  Читать
                  <IconArrowRight
                    size={20}
                    className="transition-transform duration-200 ease-out group-hov:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-cream-2" aria-labelledby="faq-title">
        <Wave shape="soft" className="bg-cream text-cream-2" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 pb-16 sm:px-6 sm:pb-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="faq-title"
                eyebrow="Спрашивают чаще всего"
                title="Частые вопросы"
                lead="Не нашли ответ? Позвоните — администратор соединит с врачом, если вопрос медицинский."
              />
              <div className="mt-6 hidden w-40 lg:block">
                <GryshaFace pose="think" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Accordion>
              {faq.map((f) => (
                <AccordionItem key={f.id} value={f.id}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ДМС и вычет */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24" aria-labelledby="dms-title">
        <SectionHeading
          id="dms-title"
          eyebrow="Деньги и документы"
          title="ДМС и налоговый вычет"
          lead="Лечим по полисам добровольного медицинского страхования. Список страховых, с которыми действуют договоры, уточняйте у администратора — он меняется."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {insuranceSteps.map((s, i) => (
            <Reveal as="li" key={s.title} variant="pop" delay={i * 80}>
              <div
                className={cn(
                  "relative h-full rounded-[28px] bg-paper p-6 pt-8 shadow-plush-sm",
                  i === 1 && "md:translate-y-6",
                )}
              >
                <span className="absolute -top-4 left-6 grid size-10 place-items-center rounded-full bg-sky font-display text-lg font-black shadow-plush-sm">
                  {i + 1}
                </span>
                <h3 className="text-xl font-black">{s.title}</h3>
                <p className="mt-2 text-[16px] text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal variant="tilt-l" className="mt-12">
          <div className="flex flex-col gap-4 rounded-[30px_26px_34px_24px] bg-mint p-6 shadow-plush sm:flex-row sm:items-center sm:p-8">
            <IconShield size={44} className="shrink-0" />
            <div>
              <h3 className="text-2xl font-black">Налоговый вычет за лечение ребёнка</h3>
              <p className="mt-1 text-[16.5px]">
                Можно вернуть 13% от стоимости лечения. Мы подготовим справку об оплате медицинских услуг для налоговой
                и копию лицензии — обычно в течение 5 рабочих дней после запроса.
              </p>
            </div>
          </div>
        </Reveal>
        <p className="mt-10 text-lg">
          Готовитесь к первому визиту?{" "}
          <Link
            to="/pervyj-vizit"
            className="font-bold text-mint-ink underline decoration-2 underline-offset-4 hov:decoration-coral"
          >
            Посмотрите комикс и советы, как подготовить ребёнка
          </Link>
          .
        </p>
      </section>
    </>
  )
}
