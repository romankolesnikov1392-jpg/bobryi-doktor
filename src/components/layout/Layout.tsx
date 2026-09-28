import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { Outlet, ScrollRestoration, useLocation } from "react-router"
import { Toaster } from "sonner"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useBooking } from "@/store/booking"
import { Grysha } from "@/components/mascot/Grysha"

// Модалка записи (формы, zod, select) грузится отдельно — главная страница легче;
// чанк подтягивается заранее, когда браузер простаивает
const loadBooking = () => import("@/components/booking/BookingDialog")
const BookingDialog = lazy(() => loadBooking().then((m) => ({ default: m.BookingDialog })))

export function Layout() {
  const { pathname, hash } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const first = useRef(true)
  const bookingOpen = useBooking((s) => s.open)
  const [bookingMounted, setBookingMounted] = useState(false)

  useEffect(() => {
    if (bookingOpen) setBookingMounted(true)
  }, [bookingOpen])

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500))
    idle(() => void loadBooking())
  }, [])

  // После перехода переносим фокус на <main>: скринридер начнёт с новой страницы, а не с меню
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (!hash) mainRef.current?.focus({ preventScroll: true })
  }, [pathname, hash])

  // Якоря вида /kontakty#travma после ленивой загрузки страницы
  useEffect(() => {
    if (!hash) return
    const t = window.setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      el?.scrollIntoView({ block: "start" })
    }, 60)
    return () => window.clearTimeout(t)
  }, [pathname, hash])

  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержанию
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="overflow-x-clip outline-none">
        <Suspense fallback={<PageFallback />}>
          <div key={pathname} className="page-enter">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
      {bookingMounted && (
        <Suspense fallback={null}>
          <BookingDialog />
        </Suspense>
      )}
      <Toaster
        position="bottom-center"
        offset={20}
        toastOptions={{
          classNames: {
            toast: "!rounded-[22px] !border-0 !bg-ink !text-cream !shadow-plush-lg !font-sans !px-5 !py-4 !gap-1",
            title: "!font-display !text-[17px] !font-black",
            description: "!text-cream/80 !text-[14.5px]",
            actionButton: "!h-9 !rounded-full !bg-sun !px-4 !font-display !text-[14px] !font-extrabold !text-ink",
          },
        }}
      />
      <ScrollRestoration />
    </>
  )
}

function PageFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-live="polite">
      <div className="w-28 opacity-80">
        <Grysha pose="think" decorative />
      </div>
      <span className="sr-only">Загружаем страницу…</span>
    </div>
  )
}
