import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { Tape } from "@/components/decor"
import { IconAlert } from "@/components/icons"
import { reviews } from "@/data/reviews"
import { toneSoft } from "@/lib/tone"
import { cn } from "@/lib/utils"

/* Отзывы — как записки на пробковой доске: цветная бумага, скотч, лёгкий наклон */
const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-[1.5deg]", "-rotate-[1.5deg]"]
const tapes = [
  "bg-sun/80 -top-3 left-8 -rotate-6",
  "bg-lav/80 -top-3 right-10 rotate-3",
  "bg-mint/80 -top-3 left-1/3 -rotate-2",
]

export function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24" aria-labelledby="reviews-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="reviews-title"
          eyebrow="Родители пишут"
          title="Не «всё понравилось», а что именно"
          lead="Мы просим родителей рассказывать подробно — так другим проще понять, подойдёт ли им клиника."
        />
        <p className="flex max-w-sm shrink-0 items-start gap-2 rounded-2xl bg-paper px-4 py-3 text-[14px] text-ink-soft shadow-plush-sm">
          <IconAlert size={18} className="mt-0.5 shrink-0 text-coral-ink" />
          Отзывы иллюстративные: это демо-версия сайта, истории и имена вымышлены.
        </p>
      </div>

      <ul className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-8">
        {reviews.map((r, i) => (
          <Reveal
            as="li"
            key={r.id}
            variant={i % 3 === 1 ? "drop" : "rise"}
            delay={(i % 3) * 80}
            className="break-inside-avoid"
          >
            <figure
              className={cn("relative r-note px-6 pt-8 pb-6 shadow-plush", toneSoft[r.tone], tilts[i % tilts.length])}
            >
              <Tape className={tapes[i % tapes.length]} />
              <blockquote className="text-[16.5px] leading-relaxed">
                <p>«{r.text}»</p>
              </blockquote>
              <figcaption className="mt-4 font-hand text-xl text-ink-soft">— {r.author}</figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
