import type { SVGProps } from "react"
import { cn } from "@/lib/utils"

/*
 * Собственный набор иконок: толстая скруглённая линия с лёгкой «рукописной»
 * неровностью — в одном стиле с иллюстрациями и Грышей.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 22, className, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
      {...rest}
    >
      {children}
    </svg>
  )
}

export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.2 6.4 17.6 17.5M17.8 6.2 6.3 17.7" />
  </Base>
)
export const IconMenu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7.2c5.4-.6 10.6-.5 16 0M4 12.1c4.3-.4 8.7-.4 13 0M4 17c5.4-.5 10.6-.4 16 .1" />
  </Base>
)
export const IconChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.3 9.4c2 2.1 3.8 3.8 5.7 5.3 2-1.6 3.8-3.3 5.7-5.4" />
  </Base>
)
export const IconChevronUp = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.3 14.6c2-2.1 3.8-3.8 5.7-5.3 2 1.6 3.8 3.3 5.7 5.4" />
  </Base>
)
export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12.8c1.6 1.4 3 2.9 4.3 4.6 3.1-4.4 6.2-7.9 9.7-10.8" />
  </Base>
)
export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 12.2c4.9-.3 9.8-.3 14.6-.1M13.6 6.6c1.9 1.9 3.7 3.6 5.6 5.5-1.9 1.8-3.7 3.6-5.5 5.4" />
  </Base>
)
export const IconPhone = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.6 3.8 9.2 4c.6 1.5 1.1 3 1.4 4.6L8.8 10c1.2 2.4 2.9 4.1 5.3 5.3l1.4-1.8c1.6.3 3.1.8 4.6 1.4l.1 2.7c-.1 1-.9 1.8-1.9 1.8C10.6 19.2 4.6 13.3 4.4 5.7c0-1 .8-1.8 2.2-1.9Z" />
  </Base>
)
export const IconClock = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.6c4.8-.1 8.5 3.6 8.4 8.5.1 4.7-3.7 8.4-8.5 8.3-4.6.1-8.4-3.7-8.3-8.4C3.5 7.3 7.3 3.5 12 3.6Z" />
    <path d="M12 7.6v4.7l3 1.9" />
  </Base>
)
export const IconPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21c-3.6-3.8-6.6-7.3-6.6-10.8C5.4 6.4 8.3 3.5 12 3.5s6.7 2.9 6.6 6.7C18.6 13.7 15.5 17.2 12 21Z" />
    <circle cx="12" cy="10.2" r="2.4" />
  </Base>
)
export const IconStar = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Base {...p}>
    <path
      d="m12 3.6 2.5 5.3 5.7.6-4.3 3.9 1.3 5.7L12 16.2l-5.2 2.9 1.3-5.7-4.3-3.9 5.7-.6L12 3.6Z"
      fill={filled ? "currentColor" : "none"}
    />
  </Base>
)
export const IconHeart = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 19.6c-4.2-2.8-8-5.9-8-10 0-2.5 1.9-4.4 4.3-4.4 1.6 0 2.9.9 3.7 2.2.8-1.3 2.1-2.2 3.7-2.2 2.4 0 4.3 1.9 4.3 4.4 0 4.1-3.8 7.2-8 10Z" />
  </Base>
)
export const IconTooth = (p: IconProps) => (
  <Base {...p}>
    <path d="M7.4 3.8c1.7-.2 3 .6 4.6.6s2.9-.8 4.6-.6c2.5.3 3.9 2.4 3.6 5-.3 2.3-1.3 3.6-1.6 5.8-.4 3-.9 5.9-2.4 5.9-1.7 0-1.5-4.4-4.2-4.4s-2.5 4.4-4.2 4.4c-1.5 0-2-2.9-2.4-5.9-.3-2.2-1.3-3.5-1.6-5.8-.3-2.6 1.1-4.7 3.6-5Z" />
  </Base>
)
export const IconCalendar = (p: IconProps) => (
  <Base {...p}>
    <path d="M5.4 6.1c4.4-.4 8.8-.4 13.2 0 .7 4.4.7 8.8 0 13.2-4.4.4-8.8.4-13.2 0-.6-4.4-.6-8.8 0-13.2Z" />
    <path d="M5.2 10.4h13.6M9 3.8v3.6M15 3.8v3.6" />
  </Base>
)
export const IconDownload = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v11M7.4 10.8c1.6 1.5 3 2.9 4.6 4.5 1.6-1.6 3-3 4.6-4.5M5 19.6c4.7.3 9.3.3 14 0" />
  </Base>
)
export const IconPrinter = (p: IconProps) => (
  <Base {...p}>
    <path d="M7.2 8.6V4.2h9.6v4.4M7.2 16.8H4.6V9.2c4.9-.5 9.9-.5 14.8 0v7.6h-2.6" />
    <path d="M7.2 13.6h9.6v6.2H7.2z" />
  </Base>
)
export const IconShield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.4c2.4 1.5 4.9 2.2 7.4 2.3.2 6.8-2.4 11.6-7.4 14.9-5-3.3-7.6-8.1-7.4-14.9 2.5-.1 5-.8 7.4-2.3Z" />
    <path d="m8.8 12.2 2.2 2.1 4.2-4.4" />
  </Base>
)
export const IconPlus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5.2v13.6M5.2 12.1c4.5-.2 9-.2 13.6 0" />
  </Base>
)
export const IconAlert = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4.2c3.6 4.9 6.3 9.6 8.2 14.3-5.5.8-10.9.8-16.4 0 1.9-4.7 4.6-9.4 8.2-14.3Z" />
    <path d="M12 10v3.6M12 16.4v.2" />
  </Base>
)
export const IconSparkle = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5c.7 4.6 1.8 6 8.5 8.5-6.7 2.5-7.8 3.9-8.5 8.5-.7-4.6-1.8-6-8.5-8.5 6.7-2.5 7.8-3.9 8.5-8.5Z" />
  </Base>
)
export const IconMessage = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.4 6c5-.7 10.1-.7 15.2 0 .6 3.3.6 6.4 0 9.6-3.4.5-6.8.6-10.1.4L5.6 19.2l.3-3.6c-.6-.1-1-.1-1.5-.2-.6-3.2-.6-6.3 0-9.4Z" />
  </Base>
)
export const IconRefresh = (p: IconProps) => (
  <Base {...p}>
    <path d="M19.2 12.4a7.2 7.2 0 1 1-2.3-5.5M17.6 3.6l-.4 3.9-3.8-.5" />
  </Base>
)
export const IconPlay = (p: IconProps) => (
  <Base {...p}>
    <path d="M7.6 5c4 2 7.7 4.4 11 7-3.3 2.7-7 5-11 7-.5-4.7-.5-9.4 0-14Z" />
  </Base>
)
export const IconBook = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 6.6C9.8 5.2 7.2 4.6 4.2 4.9v13.2c3-.3 5.6.3 7.8 1.7 2.2-1.4 4.8-2 7.8-1.7V4.9c-3-.3-5.6.3-7.8 1.7Zm0 0v13.2" />
  </Base>
)
