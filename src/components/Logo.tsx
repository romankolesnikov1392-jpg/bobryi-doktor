import { Link } from "react-router"
import { GryshaFace } from "@/components/mascot/Grysha"
import { cn } from "@/lib/utils"

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-2.5 rounded-full outline-offset-4", className)}
      aria-label="Бобрый доктор — детская стоматология, на главную"
    >
      <span className="wiggle-target relative grid size-11 shrink-0 place-items-center rounded-full bg-mint-soft shadow-plush-sm ring-2 ring-white group-hov:animate-[wiggle_520ms_var(--ease-out)]">
        <GryshaFace className="w-[92%] translate-y-[1px]" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span translate="no" className="block font-display text-[19px] font-black tracking-[-0.02em]">
            Бобрый доктор
          </span>
          <span className="mt-0.5 block text-[12.5px] font-semibold text-ink-soft">детская стоматология</span>
        </span>
      )}
    </Link>
  )
}
