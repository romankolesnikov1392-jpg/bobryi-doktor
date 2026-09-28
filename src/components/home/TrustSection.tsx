import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { TrustArt } from "@/components/illustrations/TrustArt"
import { Circled } from "@/components/decor"
import { GryshaFace } from "@/components/mascot/Grysha"
import { trustPoints } from "@/data/trust"
import { cn } from "@/lib/utils"

const tilt = ["-rotate-[1.5deg]", "rotate-[2deg]", "rotate-[1deg]", "-rotate-[2deg]"]
const radius = ["r-blob-1", "r-blob-2", "r-blob-3", "r-blob-2"]

export function TrustSection() {
  return (
    <section className="bg-cream-2 pb-16 sm:pb-24" aria-labelledby="trust-title">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 sm:px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="trust-title"
              eyebrow="Не обещаем «не больно»"
              title={
                <>
                  Почему здесь <Circled>не страшно</Circled>
                </>
              }
              lead="Страх у стоматолога почти всегда про неизвестность и потерю контроля. Поэтому мы меняем сам процесс — вот как."
            />
          </div>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-8 lg:col-span-8">
          {trustPoints.map((t, i) => (
            <Reveal
              as="li"
              key={t.art}
              variant={i % 2 ? "tilt-r" : "tilt-l"}
              delay={(i % 2) * 70}
              className={cn(i % 2 === 1 && "sm:translate-y-14")}
            >
              <article
                className={cn(
                  "group wiggle-on-hover relative h-full bg-paper p-5 shadow-plush transition-[rotate] duration-[240ms] ease-[var(--ease-spring)] sm:p-6 hov:rotate-0",
                  tilt[i],
                  radius[i],
                )}
              >
                <div className="-mx-1 -mt-1 overflow-hidden rounded-[24px]">
                  <TrustArt art={t.art} />
                </div>
                <h3 className="mt-4 text-[22px] font-black sm:text-2xl">{t.title}</h3>
                <p className="mt-2 text-[16.5px] text-ink-soft">{t.text}</p>
                <p className="mt-4 flex items-center gap-2.5 border-t-2 border-dashed border-ink/10 pt-3 font-hand text-[18px] leading-snug text-coral-ink">
                  <span className="wiggle-target grid size-10 shrink-0 place-items-center rounded-full bg-mint-soft ring-2 ring-white">
                    <GryshaFace pose="cheer" className="w-[90%]" />
                  </span>
                  <span>
                    <span className="sr-only">Грыша говорит: </span>
                    {t.kid}
                  </span>
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
