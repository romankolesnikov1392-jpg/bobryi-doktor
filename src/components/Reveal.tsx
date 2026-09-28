import type { CSSProperties, ElementType, ReactNode } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

export type RevealVariant = "rise" | "pop" | "tilt-l" | "tilt-r" | "swing" | "slide-l" | "slide-r" | "drop"

/**
 * Появление при скролле — с разным характером на разных секциях
 * (разворот, масштаб, «качель»), а не один fade+slide на всё.
 * CSS-переход с пружинящей кривой, срабатывает один раз.
 */
export function Reveal({
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: {
  as?: ElementType
  variant?: RevealVariant
  delay?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
  [key: string]: unknown
}) {
  const { ref, inView } = useInView<HTMLElement>()
  return (
    <Tag
      ref={ref}
      data-variant={variant}
      data-inview={inView ? "true" : "false"}
      className={cn("reveal", className)}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}
