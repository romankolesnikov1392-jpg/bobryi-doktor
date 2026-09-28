import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button, buttonVariants } from "@/components/ui/button"
import { CategoryArt } from "@/components/illustrations/CategoryArt"
import { GryshaFace } from "@/components/mascot/Grysha"
import { categoryById, serviceById } from "@/data/services"
import { formatPrice } from "@/lib/format"
import { toneSoft } from "@/lib/tone"
import { useBooking } from "@/store/booking"
import { cn } from "@/lib/utils"

export function ServiceDialog({ serviceId, onClose }: { serviceId: string | null; onClose: () => void }) {
  // держим последнюю услугу, пока окно анимированно закрывается
  const [shownId, setShownId] = useState(serviceId)
  useEffect(() => {
    if (serviceId) setShownId(serviceId)
  }, [serviceId])
  const service = shownId ? serviceById(shownId) : undefined
  const openBooking = useBooking((s) => s.openBooking)
  const cat = service ? categoryById[service.category] : undefined

  return (
    <Dialog open={!!serviceId} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        {service && cat && (
          <>
            <div className="flex items-center gap-3 pr-12">
              <span className={cn("grid size-14 shrink-0 place-items-center rounded-2xl", toneSoft[cat.tone])}>
                <CategoryArt category={cat.id} className="w-[80%]" />
              </span>
              <p className="leading-tight">
                <span className="block text-[13px] font-extrabold tracking-[0.06em] text-ink-soft uppercase">
                  {cat.title}
                </span>
                <span className="font-hand text-lg text-coral-ink">{cat.kidTitle}</span>
              </p>
            </div>
            <DialogTitle className="mt-4">{service.name}</DialogTitle>
            <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                ["Возраст", service.ageRange],
                ["Длительность", service.duration],
                ["Стоимость", `от ${formatPrice(service.priceFrom)}`],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={cn(
                    "rounded-2xl px-2 py-3",
                    i === 2 ? "bg-sun" : "bg-paper shadow-plush-sm",
                    i === 0 ? "-rotate-1" : i === 2 ? "rotate-1" : "",
                  )}
                >
                  <dt className="text-[12.5px] font-bold text-ink-soft">{k}</dt>
                  <dd className="mt-0.5 font-display text-[15px] leading-tight font-black sm:text-[17px]">{v}</dd>
                </div>
              ))}
            </dl>
            <DialogDescription className="mt-5 text-[16.5px] leading-relaxed text-ink">
              {service.description}
            </DialogDescription>

            {service.details && (
              <ul className="mt-4 space-y-2">
                {service.details.map((d) => (
                  <li key={d} className="flex gap-2.5 text-[16px]">
                    <span aria-hidden="true" className="mt-2 size-2.5 shrink-0 rotate-45 rounded-[3px] bg-mint-deep" />
                    {d}
                  </li>
                ))}
              </ul>
            )}

            {service.faq && service.faq.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-black">Частые вопросы</h3>
                <Accordion className="mt-3">
                  {service.faq.map((f) => (
                    <AccordionItem key={f.q} value={f.q}>
                      <AccordionTrigger className="text-[16px] sm:text-[17px]">{f.q}</AccordionTrigger>
                      <AccordionContent>{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            <p className="mt-6 flex items-center gap-3 rounded-2xl bg-mint-soft px-4 py-3 text-[14.5px]">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-paper">
                <GryshaFace pose="explain" className="w-[88%]" />
              </span>
              Итоговую стоимость врач назовёт после очного осмотра — она зависит от ситуации во рту.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={() => {
                  onClose()
                  openBooking({ serviceId: service.id })
                }}
              >
                Записаться на эту услугу
              </Button>
              <Link to="/ceny" onClick={onClose} className={buttonVariants({ variant: "ghost" })}>
                Весь прайс-лист
              </Link>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
