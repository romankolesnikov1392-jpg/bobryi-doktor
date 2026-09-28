import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"
import { IconClose } from "@/components/icons"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/* Тёплая полупрозрачная подложка; появляется вместе с окном как одна поверхность */
function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-[rgb(62_40_24/0.42)] transition-opacity duration-250 ease-out data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  )
}

/*
 * Модалка: по центру (transform-origin: center — модалки исключение из правила «от триггера»),
 * вход — лёгкий пружинящий перелёт, выход — быстрее и без перелёта.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-[30px_34px_28px_32px] bg-cream p-5 text-ink shadow-plush-lg outline-none sm:p-8",
          "transition-[translate,scale,opacity] duration-[320ms,320ms,200ms] ease-[var(--ease-spring),var(--ease-spring),var(--ease-out)]",
          "data-starting-style:translate-y-[calc(-50%+12px)] data-starting-style:scale-[0.94] data-starting-style:opacity-0",
          "data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-out",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full bg-paper text-ink shadow-plush-sm transition-transform duration-150 ease-out active:scale-[0.96] sm:top-4 sm:right-4 hov:rotate-90"
            aria-label="Закрыть"
          >
            <IconClose size={20} />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-2 pr-12", className)} {...props} />
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-display text-[26px] leading-[1.1] font-black tracking-[-0.015em] sm:text-3xl", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-base text-ink-soft", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
