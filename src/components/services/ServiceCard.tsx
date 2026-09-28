import type { Service } from "@/data/services"
import { categoryById } from "@/data/services"
import { formatPrice } from "@/lib/format"
import { toneBg, toneSoft } from "@/lib/tone"
import { IconArrowRight, IconClock } from "@/components/icons"
import { cn } from "@/lib/utils"

const radii = ["r-blob-1", "r-blob-2", "r-blob-3"]
const tilts = ["rotate-[-0.6deg]", "rotate-[0.5deg]", "rotate-[-0.3deg]", "rotate-[0.7deg]"]

export function ServiceCard({
  service,
  index,
  onOpen,
}: {
  service: Service
  index: number
  onOpen: (id: string) => void
}) {
  const cat = categoryById[service.category]
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col bg-paper p-5 shadow-plush-sm transition-[rotate,translate] duration-[240ms] ease-[var(--ease-spring)] sm:p-6 hov:-translate-y-1 hov:rotate-0",
        radii[index % radii.length],
        tilts[index % tilts.length],
      )}
    >
      <div className="flex flex-wrap gap-1.5 text-[13px] font-extrabold">
        <span className={cn("rounded-full px-2.5 py-1", toneSoft[cat.tone])}>{service.ageRange}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-cream-2 px-2.5 py-1">
          <IconClock size={14} /> {service.duration}
        </span>
      </div>
      <h3 className="mt-3 text-[20px] leading-tight font-black sm:text-[21px]">{service.name}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[15.5px] text-ink-soft">{service.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="font-display text-xl font-black whitespace-nowrap">
          <span className="text-[14px] font-bold text-ink-soft">от </span>
          {formatPrice(service.priceFrom)}
        </p>
        <button
          type="button"
          onClick={() => onOpen(service.id)}
          className={cn(
            "inline-flex h-11 items-center gap-1.5 rounded-full px-4 font-display text-[15px] font-extrabold text-ink transition-[scale] duration-150 ease-out active:scale-[0.96]",
            "after:absolute after:inset-0 after:rounded-[inherit] after:content-['']",
            toneBg[cat.tone],
          )}
        >
          Подробнее<span className="sr-only"> об услуге «{service.name}»</span>
          <IconArrowRight size={18} className="transition-transform duration-200 ease-out group-hov:translate-x-0.5" />
        </button>
      </div>
    </article>
  )
}
