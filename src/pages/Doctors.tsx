import { PageMeta } from "@/components/PageMeta"
import { PageHero } from "@/components/PageHero"
import { Reveal } from "@/components/Reveal"
import { DoctorPortrait } from "@/components/illustrations/DoctorPortrait"
import { GryshaFace } from "@/components/mascot/Grysha"
import { Button } from "@/components/ui/button"
import { Blob } from "@/components/decor"
import { IconBook, IconAlert } from "@/components/icons"
import { doctors } from "@/data/doctors"
import { yearsLabel } from "@/lib/format"
import { toneSoft, toneSoftText } from "@/lib/tone"
import { useBooking } from "@/store/booking"
import { cn } from "@/lib/utils"

export default function Doctors() {
  const openBooking = useBooking((s) => s.openBooking)
  return (
    <>
      <PageMeta
        title="Врачи"
        description="Детские стоматологи, ортодонт, хирург, гигиенист и анестезиолог клиники «Бобрый доктор»: стаж, образование и подход к детям."
      />
      <PageHero
        crumb="Врачи"
        eyebrow="Команда"
        title="Детские врачи — и только детские"
        lead="Мы подбираем врача не только по услуге, но и по характеру ребёнка. Если есть пожелания — напишите в комментарии к записи."
        pose="cheer"
        kid="Я знаю их всех! Кто-то любит динозавров, кто-то — пазлы. Выбирай!"
        tone="mint"
        blob={3}
      >
        <p className="flex max-w-md items-start gap-2 text-[14.5px] text-ink-soft">
          <IconAlert size={18} className="mt-0.5 shrink-0 text-coral-ink" />
          Демо-версия: врачи вымышлены, вместо фотографий — иллюстрированные портреты.
        </p>
      </PageHero>

      <section className="mx-auto max-w-6xl space-y-14 px-4 pb-8 sm:space-y-20 sm:px-6" aria-label="Врачи клиники">
        {doctors.map((d, i) => {
          const flip = i % 2 === 1
          return (
            <Reveal key={d.id} variant={flip ? "slide-r" : "slide-l"}>
              <article
                id={d.id}
                aria-labelledby={`${d.id}-name`}
                className="grid scroll-mt-28 items-center gap-6 md:grid-cols-12 md:gap-10"
              >
                <div
                  className={cn("relative mx-auto w-[72%] max-w-[320px] md:col-span-4 md:w-full", flip && "md:order-2")}
                >
                  <Blob
                    shape={((i + 1) % 4) as 0 | 1 | 2 | 3}
                    className={cn("absolute -inset-[10%] -z-0", toneSoftText[d.portrait.scrubs])}
                  />
                  <div className={cn("relative", flip ? "rotate-3" : "-rotate-3")}>
                    <DoctorPortrait spec={d.portrait} label={`Иллюстрированный портрет: ${d.name}`} />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 -rotate-2 rounded-full bg-ink px-4 py-1.5 text-[14px] font-extrabold whitespace-nowrap text-cream shadow-plush-sm">
                    Стаж {yearsLabel(d.experienceYears)}
                  </span>
                </div>

                <div className={cn("md:col-span-8", flip && "md:order-1")}>
                  <p className="text-[15px] font-bold text-mint-ink">{d.role}</p>
                  <h2 id={`${d.id}-name`} className="mt-1 text-[clamp(1.8rem,3.6vw,2.6rem)] font-black">
                    {d.name}
                  </h2>
                  <blockquote className="mt-4 border-l-4 border-coral pl-4 font-display text-[19px] leading-snug font-bold sm:text-[21px]">
                    {d.caption}
                  </blockquote>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Чем занимается">
                    {d.skills.map((s) => (
                      <li
                        key={s}
                        className={cn("rounded-full px-3 py-1 text-[14px] font-bold", toneSoft[d.portrait.scrubs])}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                      <h3 className="flex items-center gap-2 text-[15px] font-extrabold">
                        <IconBook size={18} /> Образование
                      </h3>
                      <ul className="mt-2 space-y-1 text-[15.5px] text-ink-soft">
                        {d.education.map((e) => (
                          <li key={e} className="flex gap-2">
                            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink/40" />
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="flex max-w-[260px] items-center gap-2.5 rounded-[18px_20px_18px_4px] bg-sun-soft px-3.5 py-2.5 font-hand text-[17px] leading-snug">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-paper">
                        <GryshaFace className="w-[88%]" />
                      </span>
                      <span>
                        <span className="sr-only">Грыша говорит: </span>
                        {d.kidNote}
                      </span>
                    </p>
                  </div>
                  <Button
                    variant="mint"
                    className="mt-6"
                    onClick={() => openBooking({ comment: `Хотим к врачу: ${d.name}` })}
                  >
                    Записаться к {d.dative}
                  </Button>
                </div>
              </article>
            </Reveal>
          )
        })}
      </section>
    </>
  )
}
