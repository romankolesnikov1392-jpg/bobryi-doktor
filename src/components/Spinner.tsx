import { cn } from "@/lib/utils"

/** Маленький спиннер для кнопок: крутится быстро — ожидание ощущается короче */
export function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block size-4 animate-spin rounded-full border-[2.5px] border-current border-r-transparent [animation-duration:600ms]",
        className,
      )}
    />
  )
}
