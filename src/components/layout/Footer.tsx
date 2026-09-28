import { Link } from "react-router"
import { Logo } from "@/components/Logo"
import { Wave } from "@/components/decor"
import { Grysha } from "@/components/mascot/Grysha"
import { SpeechBubble } from "@/components/SpeechBubble"
import { IconAlert, IconArrowRight, IconClock, IconMessage, IconPhone, IconPin } from "@/components/icons"
import { clinic } from "@/data/clinic"
import { nav } from "@/data/nav"

export function Footer() {
  return (
    <footer className="relative mt-20 sm:mt-28">
      <Wave shape="cloud" className="text-mint-soft" />
      <div className="bg-mint-soft">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 pb-10 sm:px-6 lg:grid-cols-12 lg:gap-8">
          {/* бренд + Грыша прощается */}
          <div className="relative lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-ink-soft">
              Детская стоматология, где сначала знакомятся, а потом лечат. Для детей от 1 года до 17 лет.
            </p>
            <div className="mt-4 flex items-end gap-1">
              <div className="w-28 shrink-0">
                <Grysha pose="bye" />
              </div>
              <SpeechBubble tone="paper" tail="left" label={null} size="sm" className="mb-14 max-w-[210px]">
                Пока-пока! Вечером — две минуты щёткой, договорились?
              </SpeechBubble>
            </div>
          </div>

          {/* контакты */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-xl font-black">Контакты</h2>
            <ul className="mt-4 space-y-3.5">
              <li className="flex gap-3">
                <IconPin className="mt-0.5 text-mint-ink" />
                <span>
                  {clinic.address}
                  <span className="block text-[15px] text-ink-soft">{clinic.addressNote}</span>
                  <a
                    href={clinic.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[15px] font-bold text-mint-ink underline decoration-2 underline-offset-4 hov:decoration-coral"
                  >
                    Открыть на карте<span className="sr-only"> (откроется в новой вкладке)</span>
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <IconClock className="mt-0.5 text-mint-ink" />
                <span>
                  {clinic.hours.map((h) => (
                    <span key={h.days} className="block">
                      <span className="inline-block w-16 font-bold">{h.days}</span> {h.time}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <IconPhone className="mt-0.5 text-mint-ink" />
                <a href={clinic.phoneHref} className="font-bold hov:underline">
                  {clinic.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <IconMessage className="mt-0.5 text-mint-ink" />
                <a href={`mailto:${clinic.email}`} className="break-all hov:underline">
                  {clinic.email}
                </a>
              </li>
            </ul>
          </div>

          {/* экстренная линия + навигация */}
          <div className="lg:col-span-4">
            <div className="-rotate-1 rounded-[28px_22px_30px_24px] bg-sun p-5 shadow-plush">
              <p className="flex items-center gap-2 font-display text-lg font-black">
                <IconAlert size={22} /> Травма зуба?
              </p>
              <a href={clinic.emergencyHref} className="mt-1 block font-display text-2xl font-black hov:underline">
                {clinic.emergencyPhone}
              </a>
              <p className="text-[15px]">Экстренная линия, {clinic.emergencyHours}</p>
              <Link
                to="/kontakty#travma"
                className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-bold underline decoration-2 underline-offset-4"
              >
                Что делать до приезда к врачу <IconArrowRight size={18} />
              </Link>
            </div>
            <nav aria-label="Разделы сайта" className="mt-7">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] font-bold">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="hov:text-mint-ink hov:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* обязательная плашка */}
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
          <div className="flex gap-3 rounded-[22px] bg-paper px-5 py-4 text-[14.5px] leading-relaxed text-ink-soft shadow-plush-sm">
            <IconAlert className="mt-0.5 shrink-0 text-coral-ink" />
            <div>
              <p className="font-bold text-ink">
                Информация на сайте носит справочный характер и не заменяет консультацию врача. Имеются
                противопоказания, необходима консультация специалиста.
              </p>
              <p className="mt-1">
                Цены на сайте не являются публичной офертой. Демо-проект: клиника, врачи, цены и отзывы вымышлены.
              </p>
            </div>
          </div>
          <p className="mt-5 flex flex-wrap justify-between gap-2 text-[13.5px] text-ink-soft">
            <span>© {new Date().getFullYear()} «Бобрый доктор»</span>
            <span>{clinic.license}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
