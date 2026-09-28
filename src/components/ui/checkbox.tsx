import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "@/lib/utils"
import { IconCheck } from "@/components/icons"

/* Галочка «вдавливается» с лёгкой пружиной — редкое, осознанное действие */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative grid size-7 shrink-0 place-items-center rounded-[9px] border-2 border-ink bg-paper text-ink transition-[background-color,scale] duration-150 ease-out outline-none after:absolute after:-inset-2 active:scale-[0.95]",
        "focus-visible:shadow-[0_0_0_4px_var(--color-sun)] aria-invalid:border-destructive aria-invalid:bg-coral-soft data-checked:bg-mint",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center transition-[scale,opacity] duration-200 ease-[var(--ease-spring)] data-ending-style:scale-[0.85] data-ending-style:opacity-0 data-starting-style:scale-[0.85] data-starting-style:opacity-0"
      >
        <IconCheck size={18} strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
