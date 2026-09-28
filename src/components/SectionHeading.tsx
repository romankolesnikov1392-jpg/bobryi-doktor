import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  id,
  as: H = "h2",
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  align?: "left" | "center"
  className?: string
  id?: string
  as?: "h1" | "h2" | "h3"
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 font-hand text-[22px] leading-none text-coral-ink sm:text-2xl">
          <span aria-hidden="true" className="mr-1.5 inline-block -rotate-12 text-sun-deep">
            ✦
          </span>
          {eyebrow}
        </p>
      )}
      <H id={id} className="text-[clamp(2rem,4.4vw,3.25rem)] font-black">
        {title}
      </H>
      {lead && <div className="mt-4 text-lg text-ink-soft sm:text-[19px]">{lead}</div>}
    </div>
  )
}
