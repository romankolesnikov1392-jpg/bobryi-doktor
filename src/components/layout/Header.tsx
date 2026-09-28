import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { IconCalendar, IconPhone } from "@/components/icons"
import { MobileMenu } from "@/components/layout/MobileMenu"
import { nav } from "@/data/nav"
import { clinic } from "@/data/clinic"
import { useBooking } from "@/store/booking"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const openBooking = useBooking((s) => s.openBooking)
  const { pathname } = useLocation()
  const listRef = useRef<HTMLUListElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /*
   * Пилюля активного пункта — один элемент с CSS-переходом transform/width.
   * Не shared layout animation: та идёт по главному потоку и роняет кадры,
   * пока грузится и рендерится новая страница.
   */
  useLayoutEffect(() => {
    const list = listRef.current
    const pill = pillRef.current
    if (!list || !pill) return
    const place = () => {
      const active = list.querySelector<HTMLElement>("a[aria-current=page]")
      if (!active) {
        pill.style.opacity = "0"
        return
      }
      const li = active.parentElement as HTMLElement
      pill.style.opacity = "1"
      pill.style.width = `${active.offsetWidth}px`
      pill.style.transform = `translateX(${li.offsetLeft}px)`
      pill.style.backgroundColor = active.hasAttribute("data-kids") ? "var(--color-sun)" : "var(--color-mint-soft)"
    }
    place()
    const raf = requestAnimationFrame(() => pill.setAttribute("data-ready", ""))
    window.addEventListener("resize", place)
    document.fonts?.ready.then(place)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", place)
    }
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div
        data-scrolled={scrolled || undefined}
        className="header-bar relative mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full bg-paper/95 py-1.5 pr-1.5 pl-1.5 shadow-plush-sm backdrop-blur-md sm:gap-3 sm:py-2 sm:pr-2"
      >
        <Logo className="pr-2" />

        <nav aria-label="Основная навигация" className="hidden xl:block">
          <ul ref={listRef} className="relative flex items-center gap-0.5">
            <span
              ref={pillRef}
              aria-hidden="true"
              className="nav-indicator absolute inset-y-0 left-0 rounded-full opacity-0"
            />
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  data-kids={"kids" in item ? "" : undefined}
                  className="relative block rounded-full px-3.5 py-2.5 text-[15px] font-bold whitespace-nowrap transition-colors duration-150 hov:text-mint-ink"
                >
                  {"kids" in item && (
                    <span aria-hidden="true" className="mr-1 inline-block text-sun-deep">
                      ★
                    </span>
                  )}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={clinic.phoneHref}
            className="hidden size-11 place-items-center rounded-full bg-mint-soft text-mint-ink transition-[scale] duration-150 ease-out active:scale-[0.96] md:grid"
            aria-label={`Позвонить: ${clinic.phone}`}
            title={clinic.phone}
          >
            <IconPhone size={20} />
          </a>
          <Button size="sm" onClick={() => openBooking()} className="hidden sm:inline-flex">
            Записаться
          </Button>
          <Button size="icon-sm" onClick={() => openBooking()} className="sm:hidden" aria-label="Записаться на приём">
            <IconCalendar size={20} />
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
