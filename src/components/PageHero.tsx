import type { ReactNode } from "react"
import { Link } from "react-router"
import { Grysha, type GryshaPose } from "@/components/mascot/Grysha"
import { Blob, Wave } from "@/components/decor"
import { SpeechBubble } from "@/components/SpeechBubble"
import type { Tone } from "@/data/services"
import { toneSoftText, toneText } from "@/lib/tone"
import { cn } from "@/lib/utils"

/**
 * Шапка внутренних страниц. Меняются цвет, поза Грыши, сторона и форма кляксы —
 * чтобы страницы не были копиями друг друга, но оставались одной системой.
 */
export function PageHero({
  crumb,
  eyebrow,
  title,
  lead,
  pose,
  kid,
  tone = "mint",
  side = "right",
  blob = 0,
  children,
  waveTo,
}: {
  crumb: string
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  pose: GryshaPose
  kid: ReactNode
  tone?: Tone
  side?: "left" | "right"
  blob?: 0 | 1 | 2 | 3
  children?: ReactNode
  /** Цвет следующей секции — волна переходит в него */
  waveTo?: string
}) {
  return (
    <section className="relative overflow-x-clip" aria-labelledby="page-title">
      <div className="mx-auto grid max-w-7xl items-center gap-x-8 gap-y-6 px-4 pt-6 pb-8 sm:px-6 sm:pt-10 lg:grid-cols-12 lg:pb-14">
        <div className={cn("relative z-10 lg:col-span-7", side === "left" && "lg:order-2")}>
          <nav aria-label="Хлебные крошки" className="enter-rise text-[14px] font-semibold text-ink-soft">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link
                  to="/"
                  className="underline decoration-ink/25 decoration-2 underline-offset-4 hov:decoration-coral"
                >
                  Главная
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{crumb}</li>
            </ol>
          </nav>
          {eyebrow && (
            <p
              className="enter-rise mt-5 font-hand text-2xl text-coral-ink"
              style={{ "--d": "40ms" } as React.CSSProperties}
            >
              {eyebrow}
            </p>
          )}
          <h1
            id="page-title"
            className="enter-rise mt-2 text-[clamp(2.4rem,5.6vw,4.3rem)] leading-[1.03] font-black tracking-[-0.025em]"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            {title}
          </h1>
          {lead && (
            <div
              className="enter-rise mt-5 max-w-[36rem] text-lg text-ink-soft sm:text-[19px]"
              style={{ "--d": "140ms" } as React.CSSProperties}
            >
              {lead}
            </div>
          )}
          {children && (
            <div className="enter-rise mt-7" style={{ "--d": "200ms" } as React.CSSProperties}>
              {children}
            </div>
          )}
        </div>

        <div className={cn("relative lg:col-span-5", side === "left" && "lg:order-1")}>
          <div className="relative mx-auto flex max-w-md items-end gap-3 lg:block lg:max-w-none">
            <Blob
              shape={blob}
              className={cn(
                "enter-pop absolute top-1/2 left-1/2 hidden w-[96%] -translate-x-1/2 -translate-y-[46%] lg:block",
                toneText[tone],
              )}
            />
            <Blob shape={blob} className={cn("absolute -bottom-4 -left-4 w-40 lg:hidden", toneSoftText[tone])} />
            <div
              className="enter-pop relative w-[38%] max-w-[180px] shrink-0 lg:mx-auto lg:w-[54%] lg:max-w-[290px] lg:pt-36"
              style={{ "--d": "160ms" } as React.CSSProperties}
            >
              <Grysha pose={pose} sticker />
            </div>
            <div
              className={cn(
                "enter-pop relative mb-8 flex-1 lg:absolute lg:top-0 lg:mb-0 lg:w-[62%]",
                side === "left" ? "lg:-right-2" : "lg:-left-4",
              )}
              style={{ "--d": "320ms" } as React.CSSProperties}
            >
              <SpeechBubble tone="paper" tail="bottom-left" className="lg:rotate-[-2deg]">
                {kid}
              </SpeechBubble>
            </div>
          </div>
        </div>
      </div>
      {waveTo && <Wave shape="double" className={waveTo} />}
    </section>
  )
}
