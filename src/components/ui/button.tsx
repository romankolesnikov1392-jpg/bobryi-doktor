import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/*
 * Кнопки-игрушки: «лицо» и «губа» живут на ::before/::after (см. .btn-lip в index.css),
 * при нажатии кнопка проваливается на 3px — анимируется только transform.
 */
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-display font-extrabold tracking-[-0.01em] whitespace-nowrap select-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-2 aria-invalid:ring-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "btn-lip text-ink [--face:var(--color-coral)] [--glow:rgb(234_122_97/0.55)] [--lip:var(--color-coral-deep)] hov:[--face:#ffab97]",
        mint: "btn-lip text-ink [--face:var(--color-mint)] [--glow:rgb(61_190_150/0.45)] [--lip:var(--color-mint-deep)] hov:[--face:#a3ead3]",
        sun: "btn-lip text-ink [--face:var(--color-sun)] [--glow:rgb(239_181_59/0.5)] [--lip:var(--color-sun-deep)] hov:[--face:#ffe08f]",
        lav: "btn-lip text-ink [--face:var(--color-lav)] [--glow:rgb(157_132_220/0.45)] [--lip:var(--color-lav-deep)] hov:[--face:#d5c6f4]",
        paper:
          "btn-lip text-ink [--face-ring:inset_0_0_0_2px_rgb(46_42_38/0.85)] [--face:var(--color-paper)] [--glow:rgb(170_92_46/0.25)] [--lip:#e8d9c6] hov:[--face:#fff]",
        ghost: "text-ink transition-[background-color,scale] duration-150 ease-out active:scale-[0.97] hov:bg-ink/6",
        link: "h-auto! px-0! font-bold text-mint-ink underline decoration-2 underline-offset-4 hov:decoration-coral",
        /* совместимость с шаблонами shadcn */
        outline:
          "btn-lip text-ink [--face-ring:inset_0_0_0_2px_rgb(46_42_38/0.85)] [--face:var(--color-paper)] [--lip:#e8d9c6]",
        secondary: "btn-lip text-ink [--face:var(--color-mint)] [--lip:var(--color-mint-deep)]",
        destructive: "text-destructive hov:bg-destructive/10",
      },
      size: {
        default: "h-12 px-6 text-base",
        sm: "h-10 px-4 text-[15px]",
        lg: "h-14 px-7 text-[17px]",
        xs: "h-8 px-3 text-sm",
        icon: "size-11",
        "icon-sm": "size-10",
        "icon-xs": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonVariant = VariantProps<typeof buttonVariants>

function Button({ className, variant = "default", size = "default", ...props }: ButtonPrimitive.Props & ButtonVariant) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants, type ButtonVariant }
