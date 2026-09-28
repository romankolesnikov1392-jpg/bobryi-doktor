import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

/* Поле: пухлое, с толстой рамкой; фокус — чернильная рамка + солнечное свечение */
const fieldBase =
  "w-full min-w-0 rounded-2xl border-2 border-ink/15 bg-paper px-4 text-base text-ink outline-none placeholder:text-ink-soft focus-visible:border-ink focus-visible:shadow-[0_0_0_4px_var(--color-sun)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:bg-coral-soft/50"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <InputPrimitive type={type} data-slot="input" className={cn(fieldBase, "h-12", className)} {...props} />
}

export { Input, fieldBase }
