import { Reveal } from "@/components/Reveal"
import { Grysha } from "@/components/mascot/Grysha"
import { Button } from "@/components/ui/button"
import { IconPhone } from "@/components/icons"
import { clinic } from "@/data/clinic"
import { serviceById } from "@/data/services"
import { formatPrice } from "@/lib/format"
import { useBooking } from "@/store/booking"

export function FinalCta() {
  const openBooking = useBooking((s) => s.openBooking)
  const first = serviceById("first-visit")
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24" aria-labelledby="cta-title">
      <Reveal variant="tilt-l">
        <div className="relative -rotate-1 rounded-[40px_34px_44px_30px] bg-coral px-6 pt-8 pb-8 shadow-plush-lg sm:px-10 sm:py-12 lg:pr-[36%]">
          <p className="font-hand text-2xl text-coral-ink">Начнём со знакомства?</p>
          <h2 id="cta-title" className="mt-2 text-[clamp(2rem,4.6vw,3.4rem)] font-black">
            Первый визит — {first?.duration}, {first ? formatPrice(first.priceFrom) : ""}. Без бормашины.
          </h2>
          <p className="mt-4 max-w-xl text-lg">
            Посмотрим зубы, покажем кабинет и дадим письменный план — а решение примете вы, дома и без спешки.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button size="lg" variant="paper" onClick={() => openBooking({ serviceId: "first-visit" })}>
              Записаться на знакомство
            </Button>
            <a
              href={clinic.phoneHref}
              className="inline-flex items-center gap-2 font-display text-lg font-black hov:underline"
            >
              <IconPhone size={20} /> {clinic.phone}
            </a>
          </div>
          <div className="pointer-events-none absolute right-2 -bottom-4 hidden w-[30%] max-w-[300px] lg:block">
            <Grysha pose="cheer" sticker decorative />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
