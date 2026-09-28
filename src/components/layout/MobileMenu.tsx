import { useState } from "react"
import { NavLink } from "react-router"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { IconMenu, IconPhone, IconAlert } from "@/components/icons"
import { Grysha } from "@/components/mascot/Grysha"
import { SpeechBubble } from "@/components/SpeechBubble"
import { nav } from "@/data/nav"
import { clinic } from "@/data/clinic"
import { useBooking } from "@/store/booking"
import { cn } from "@/lib/utils"

const dots = ["bg-mint", "bg-coral", "bg-sky", "bg-sun", "bg-lav", "bg-mint-deep", "bg-coral-deep"]

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const openBooking = useBooking((s) => s.openBooking)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="grid size-11 place-items-center rounded-full bg-ink text-cream transition-[scale] duration-150 ease-out active:scale-[0.96] xl:hidden"
        aria-label="Открыть меню"
      >
        <IconMenu size={22} />
      </SheetTrigger>
      <SheetContent side="right">
        <div className="px-6 pt-6 pb-2">
          <SheetTitle className="font-hand text-2xl font-normal text-coral-ink">Куда пойдём?</SheetTitle>
          <SheetDescription className="sr-only">Разделы сайта, запись и телефоны клиники</SheetDescription>
        </div>
        <nav aria-label="Мобильная навигация" className="px-3">
          <ul>
            {nav.map((item, i) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-2.5 font-display text-[23px] font-extrabold tracking-[-0.01em] transition-colors",
                      isActive ? "bg-mint-soft" : "active:bg-ink/5",
                    )
                  }
                >
                  <span aria-hidden="true" className={cn("size-3.5 rounded-full", dots[i % dots.length])} />
                  {item.label}
                  {"kids" in item && (
                    <span className="ml-auto rounded-full bg-sun px-2.5 py-0.5 font-sans text-xs font-extrabold">
                      игры
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 space-y-3 px-6">
          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              setOpen(false)
              openBooking()
            }}
          >
            Записаться на приём
          </Button>
          <a
            href={clinic.phoneHref}
            className="flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 font-bold shadow-plush-sm"
          >
            <IconPhone size={20} className="text-mint-ink" /> {clinic.phone}
          </a>
          <a
            href={clinic.emergencyHref}
            className="flex items-center gap-3 rounded-2xl bg-sun-soft px-4 py-3 text-[15px] shadow-plush-sm"
          >
            <IconAlert size={20} className="text-sun-ink" />
            <span>
              <span className="block font-bold">Травма зуба: {clinic.emergencyPhone}</span>
              <span className="text-ink-soft">{clinic.emergencyHours}</span>
            </span>
          </a>
        </div>
        <div className="relative mt-auto flex items-end justify-end gap-2 overflow-hidden px-4 pt-8">
          <SpeechBubble tone="paper" tail="right" label={null} size="sm" className="mb-16 max-w-[190px]">
            Я подожду тебя в Детской зоне!
          </SpeechBubble>
          <div className="w-32 shrink-0 translate-y-3">
            <Grysha pose="explain" decorative />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
