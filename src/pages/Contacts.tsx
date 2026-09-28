import { PageMeta } from "@/components/PageMeta"
import { PageHero } from "@/components/PageHero"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { ClinicMap } from "@/components/illustrations/ClinicMap"
import { FeedbackForm } from "@/components/contacts/FeedbackForm"
import { Wave } from "@/components/decor"
import { Button, buttonVariants } from "@/components/ui/button"
import { IconAlert, IconClock, IconPhone, IconPin, IconArrowRight } from "@/components/icons"
import { clinic } from "@/data/clinic"
import { emergencyCases, emergencyRedFlags } from "@/data/emergency"
import { useBooking } from "@/store/booking"
import { cn } from "@/lib/utils"

export default function Contacts() {
  const openBooking = useBooking((s) => s.openBooking)
  return (
    <>
      <PageMeta
        title="Контакты"
        description={`Детская стоматология «Бобрый доктор»: ${clinic.address}. Телефон ${clinic.phone}, экстренная линия при травме зуба ${clinic.emergencyPhone}.`}
      />
      <PageHero
        crumb="Контакты"
        eyebrow="Как нас найти"
        title="Приходите знакомиться"
        lead={
          <>
            {clinic.address} — {clinic.addressNote.toLowerCase()}.
          </>
        }
        pose="bye"
        kid="Я жду у входа! Ищи дверь с мятной табличкой и моим портретом."
        tone="sky"
        side="left"
        blob={3}
      >
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={() => openBooking()}>
            Записаться на приём
          </Button>
          <a href={clinic.phoneHref} className={cn(buttonVariants({ variant: "paper", size: "lg" }))}>
            <IconPhone size={20} /> {clinic.phone}
          </a>
        </div>
      </PageHero>

      <section
        className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-12"
        aria-label="Адрес, часы работы и схема проезда"
      >
        <div className="space-y-4 lg:col-span-5">
          {[
            {
              icon: <IconPin size={24} />,
              title: "Адрес",
              body: (
                <>
                  <p className="font-bold">{clinic.address}</p>
                  <p className="text-ink-soft">{clinic.addressNote}</p>
                  <p className="mt-1 text-ink-soft">{clinic.metro}</p>
                  <a
                    href={clinic.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 font-bold text-mint-ink underline decoration-2 underline-offset-4 hov:decoration-coral"
                  >
                    Открыть в Яндекс Картах<span className="sr-only"> (откроется в новой вкладке)</span>
                    <IconArrowRight size={18} />
                  </a>
                </>
              ),
              tone: "bg-paper",
            },
            {
              icon: <IconClock size={24} />,
              title: "Часы работы",
              body: (
                <>
                  {clinic.hours.map((h) => (
                    <p key={h.days}>
                      <span className="inline-block w-16 font-bold">{h.days}</span> {h.time}
                    </p>
                  ))}
                  <p className="mt-2 text-ink-soft">{clinic.quietHours}</p>
                </>
              ),
              tone: "bg-paper",
            },
            {
              icon: <IconPhone size={24} />,
              title: "Телефоны",
              body: (
                <>
                  <p>
                    <a href={clinic.phoneHref} className="font-display text-xl font-black hov:underline">
                      {clinic.phone}
                    </a>{" "}
                    <span className="text-ink-soft">— запись и вопросы</span>
                  </p>
                  <p className="mt-1">
                    <a href={clinic.emergencyHref} className="font-display text-xl font-black hov:underline">
                      {clinic.emergencyPhone}
                    </a>{" "}
                    <span className="text-ink-soft">— травма зуба, {clinic.emergencyHours}</span>
                  </p>
                  <p className="mt-1">
                    <a href={`mailto:${clinic.email}`} className="break-all hov:underline">
                      {clinic.email}
                    </a>
                  </p>
                </>
              ),
              tone: "bg-paper",
            },
          ].map((card, i) => (
            <Reveal key={card.title} variant="slide-l" delay={i * 70}>
              <div
                className={cn(
                  "flex gap-4 rounded-[26px] p-5 text-[16.5px] shadow-plush-sm sm:p-6",
                  card.tone,
                  i === 1 && "lg:ml-6",
                )}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky-soft text-sky-ink">
                  {card.icon}
                </span>
                <div>
                  <h2 className="mb-1 text-xl font-black">{card.title}</h2>
                  {card.body}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal variant="pop" className="lg:col-span-7">
          <ClinicMap className="rotate-1" />
          <p className="mt-3 text-center text-[14px] text-ink-soft">
            Схема нарисована от руки — точный маршрут откроется в Яндекс Картах.
          </p>
        </Reveal>
      </section>

      {/* экстренная помощь */}
      <section id="travma" className="scroll-mt-24" aria-labelledby="travma-title">
        <Wave shape="double" className="text-sun" />
        <div className="bg-sun pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                id="travma-title"
                eyebrow="Экстренная линия"
                title="Травма зуба — что делать до приезда к врачу"
                lead="Сохраняйте спокойствие: ребёнок ориентируется на вас. Позвоните нам — администратор продиктует, что делать, и подготовит кабинет к вашему приезду."
              />
              <a
                href={clinic.emergencyHref}
                className="inline-flex shrink-0 -rotate-2 flex-col rounded-[24px] bg-ink px-6 py-4 text-cream shadow-plush transition-[rotate,scale] duration-[240ms] ease-[var(--ease-spring)] active:scale-[0.97] hov:rotate-0"
              >
                <span className="text-[14px] font-bold text-sun">Экстренная линия · {clinic.emergencyHours}</span>
                <span className="font-display text-3xl font-black">{clinic.emergencyPhone}</span>
              </a>
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-[24px] bg-paper p-5 shadow-plush-sm sm:p-6" role="note">
              <IconAlert size={26} className="mt-0.5 shrink-0 text-destructive" />
              <div>
                <p className="font-display text-lg font-black">Сначала — скорая (103 или 112), если:</p>
                <ul className="mt-2 space-y-1 text-[16.5px]">
                  {emergencyRedFlags.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-destructive" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ol className="mt-8 grid gap-6 lg:grid-cols-3">
              {emergencyCases.map((c, i) => (
                <Reveal as="li" key={c.title} variant="rise" delay={i * 80}>
                  <article
                    className={cn(
                      "h-full rounded-[28px] bg-paper p-6 shadow-plush",
                      i === 1 ? "rotate-[0.6deg] lg:translate-y-6" : "-rotate-[0.6deg]",
                    )}
                  >
                    <h3 className="text-[22px] font-black">{c.title}</h3>
                    <ol className="mt-4 space-y-3">
                      {c.steps.map((s, si) => (
                        <li key={s} className="flex gap-3 text-[16px]">
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sun font-display text-[14px] font-black">
                            {si + 1}
                          </span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ol>
                  </article>
                </Reveal>
              ))}
            </ol>
            <p className="mt-10 text-[14.5px]">
              Рекомендации — общие правила первой помощи и не заменяют осмотр врача.
            </p>
          </div>
        </div>
        <Wave shape="soft" flip className="text-sun" />
      </section>

      {/* обратная связь */}
      <section
        className="mx-auto grid max-w-7xl gap-10 px-4 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-12"
        aria-labelledby="feedback-title"
      >
        <div className="lg:col-span-5">
          <SectionHeading
            id="feedback-title"
            eyebrow="Напишите нам"
            title="Вопрос, отзыв или пожелание"
            lead="Для записи на приём удобнее форма записи или звонок. А здесь — всё остальное: от вопроса про ДМС до благодарности врачу."
          />
        </div>
        <div className="lg:col-span-7">
          <FeedbackForm />
        </div>
      </section>
    </>
  )
}
